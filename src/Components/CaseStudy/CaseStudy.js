import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";
import axios from "axios";
import "./CaseStudyDisplay.css";
import CaseNavBar from "./CaseNavBar/CaseNavBar";
import { ApiURL } from "../../Utils/ApiURL";
import logo from "../../Images/logo.png";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../Redux/loadingRedux";
import { toast } from "react-toastify";
import { setPurchasedItems } from "../../Redux/purchasedSlice";
import CaseStudyCard from "./CaseStudyCard";

const CaseStudy = ({ user, token, initialSearch = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const purchasedItems = useSelector((state) => state.purchased.purchasedItems);
  const video = "";

  // State for case studies data and filters
  const [allCaseStudiesData, setAllCaseStudiesData] = useState([]);
  const [filteredCaseStudiesData, setFilteredCaseStudiesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(false);

  const url = ApiURL();

  const isItemInCart = (caseStudy) => {
    return cart.some((item) => item.id === caseStudy.id);
  };

  const handleAddToCart = (caseStudy) => {
    if (purchasedItems.includes(caseStudy.id)) {
      // Show a message or prevent adding to cart
      alert("You have already purchased this item.");
      return;
    }
    dispatch(addToCart({ ...caseStudy }));
  };

  const handleBuyNow = async (caseStudy) => {
    const username = user.user_firstname + " " + user.user_lastname;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Are you online?");
    };
    script.onload = async () => {
      try {
        dispatch(showLoadingHandler());
        const result = await axios.post(
          `${url}api/v1/case-studies/cart/single-create-order`,
          {
            userEmail: user?.user_email,
            userId: user?.user_id,
            caseStudy: caseStudy,
          }
        );
        if (result.data.error) {
          return (
            toast.error(result.data.error, {
              position: "top-center",
            }),
            dispatch(hideLoadingHandler())
          );
        }
        const { amount, id: order_id, currency } = result?.data.success;
        const {
          data: { key: razorpayKey },
        } = await axios.get(`${url}api/get-razorpay-key`);
        const options = {
          key: razorpayKey,
          amount: amount?.toString(),
          currency: currency,
          name: "Navrik Software Solutions",
          description: "Paying for the Case study",
          image: logo,
          order_id: order_id,
          handler: async function (response) {
            const res = await axios.post(
              `${url}api/v1/case-studies/cart/pay-single-case-study`,
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                userId: user?.user_id,
                userEmail: user?.user_email,
                username: username,
                caseStudyId: caseStudy.id,
              }
            );
            if (res.data.success) {
              return (
                toast.success(res.data.success, {
                  position: "top-center",
                }),
                dispatch(hideLoadingHandler())
              );
            }
            if (res.data.error) {
              return (
                toast.error(res.data.error, {
                  position: "top-center",
                }),
                dispatch(hideLoadingHandler())
              );
            }
          },
          prefill: {
            name: user?.user_firstname + " " + user?.user_lastname,
            email: user?.user_email,
            contact: "",
          },
          theme: {
            color: "#80c0f0",
          },
        };
        dispatch(hideLoadingHandler());
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        dispatch(hideLoadingHandler());
      }
    };
    document.body.appendChild(script);
    dispatch(hideLoadingHandler());
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // If rating has at least 0.5, use a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Calculate remaining empty stars

    return (
      <>
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fa fa-star full-star" />
        ))}

        {/* Render half star if needed */}
        {hasHalfStar && <i className="fa fa-star-half-alt half-star" />}

        {/* Render empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="fa fa-star empty-star" />
        ))}
      </>
    );
  };

  // Fetch case studies data
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);

        const response = await Promise.race([
          axios.get(`${url}api/v1/case-studies/all-list`),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllCaseStudiesData(response.data.success);
        } else if (response.data.error) {
          setAllCaseStudiesData([]);
        }
      } catch (error) {
        setAllCaseStudiesData([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false); // Ensure loading is stopped regardless of outcome
      }
    };
    fetchCaseStudies();
  }, [url]);

  // Fetch purchased items
  const fetchPurchasedItems = async (userId, dispatch) => {
    try {
      const response = await axios.get(
        `${url}api/v1/case-studies/cart/purchased-items/${userId}`
      );
      if (response.data.success) {
        dispatch(setPurchasedItems(response.data.success));
      }
    } catch (error) {
      console.error("Error fetching purchased items:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPurchasedItems(user?.user_id, dispatch);
    }
  }, [user, dispatch]);

  // Parse date function for sorting
  const parseDate = (dateString) => {
    if (!dateString) return new Date(0); // Handle missing dates

    const [day, month, year] = dateString.split("-");
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    // Handle potential parsing errors
    try {
      return new Date(parseInt(year), monthMap[month], parseInt(day));
    } catch (error) {
      console.error("Date parsing error:", error);
      return new Date(0);
    }
  }; // Apply initialSearch if provided
  useEffect(() => {
    // Always set search term to initialSearch (even if empty)
    // This ensures clearing searches works properly
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  // Apply filters and sorting whenever filter values change
  useEffect(() => {
    const filterAndSortData = () => {
      // First filter by search term
      let filtered = allCaseStudiesData.filter((caseStudy) => {
        const matchesSearch = searchTerm
          ? caseStudy.caseTopic
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (caseStudy.subjectCategory &&
              caseStudy.subjectCategory
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (caseStudy.extract &&
              caseStudy.extract
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
          : true;

        return matchesSearch;
      });

      // Then sort by date
      filtered = [...filtered].sort((a, b) => {
        const dateA = parseDate(a.publicationDate);
        const dateB = parseDate(b.publicationDate);

        return sortOrder === "newest"
          ? dateB - dateA // Newest first
          : dateA - dateB; // Oldest first
      });

      setFilteredCaseStudiesData(filtered);
    };

    filterAndSortData();
  }, [searchTerm, sortOrder, allCaseStudiesData]);
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder("newest");

    // Notify the parent component that search has been cleared
    // This helps maintain consistent state between components
    if (window.history.pushState) {
      // Update the URL without the search parameter
      const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;

      window.history.pushState({ path: newurl }, "", newurl);
    }
  };

  // Render the selected sort option text
  const renderSelectedOptionText = () => {
    switch (sortOrder) {
      case "newest":
        return "Newest First";
      case "oldest":
        return "Oldest First";
      default:
        return "Sort By";
    }
  };

  return (
    <>
      {/* <CaseNavBar /> */}{" "}
      <div className="case-study-display-container">
        {/* {searchTerm && (
          <div className="search-tag-container">
            <div className="search-tag">
              <span>Search: {searchTerm}</span>
              <button
                onClick={clearFilters}
                className="search-tag-remove"
                aria-label="Clear search"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <span className="search-results-count">
              Found {filteredCaseStudiesData.length}{" "}
              {filteredCaseStudiesData.length === 1 ? "result" : "results"}
            </span>
          </div>
        )} */}
        <div className="case-sort-container">
          <div className="case-sort">
            <div className="case-dropdown">
              <button className="case-dropbtn">
                {renderSelectedOptionText()}
                <i className="fa fa-chevron-down"></i>
              </button>
              <div className="case-dropdown-content">
                <button
                  className={sortOrder === "newest" ? "active" : ""}
                  onClick={() => setSortOrder("newest")}
                >
                  Newest First
                </button>
                <button
                  className={sortOrder === "oldest" ? "active" : ""}
                  onClick={() => setSortOrder("oldest")}
                >
                  Oldest First
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="app-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading case studies...</p>
            </div>
          ) : filteredCaseStudiesData.length > 0 ? (
            <div className="case-study-grid">
              {filteredCaseStudiesData.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.id} data={caseStudy} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No case studies found </h3>
              {/* <p>No case studies found matching your criteria.</p> */}
              {/* <button onClick={clearFilters} className="reset-filters-btn">
                Reset Filters
              </button> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudy;
