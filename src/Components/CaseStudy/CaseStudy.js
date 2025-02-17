import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./CaseStudyDisplay.css";
// import video from "./CaseVideo.mp4";
import "./CaseStudyDisplay.css";
import CaseNavBar from "./CaseNavBar/CaseNavBar";
import { ApiURL } from "../../Utils/ApiURL";
import axios from "axios";
import logo from "../../Images/logo.png";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../Redux/loadingRedux";
import { toast } from "react-toastify";
import { setPurchasedItems } from "../../Redux/purchasedSlice";

const CaseStudy = ({ user, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const purchasedItems = useSelector((state) => state.purchased.purchasedItems);
  console.log(purchasedItems);
  const video = "";
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
  const [allCaseStudiesData, setAllCaseStudiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
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
    fetchMentors();
  }, [url]);
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
  return (
    <>
      <CaseNavBar />
      <div className="case-study-display-container">
        {/* <div className="case-fillter">Add fillter</div> */}
        {allCaseStudiesData.map((caseStudy) => {
          const isPurchased = purchasedItems.includes(caseStudy.id);
          return (
            <div key={caseStudy.id} className="case-study-card bright-border">
              <Link
                target="_blank"
                to={`/case-studies/view-case-study/${caseStudy.caseTopic
                  .replace(" ", "-")
                  .toLowerCase()}/${caseStudy.id} `}
              >
                <h2 className="head-clr">{caseStudy.caseTopic}</h2>
              </Link>
              <hr />
              <div className="case-study-content">
                <div className="case-study-text">
                  <p>
                    <strong>Lesson:</strong> {caseStudy.lesson}
                  </p>
                  <p>
                    <strong>Future Skills:</strong> {caseStudy.futureSkills}
                  </p>
                  <p>
                    <strong>Challenge:</strong> {caseStudy.challenge}
                  </p>
                  <p>
                    <strong>Author Designation:</strong>{" "}
                    {caseStudy.authorDesignation}
                  </p>
                  <p>
                    <strong>Price: </strong> ₹ {caseStudy.price}
                  </p>
                  <p>
                    <strong>Rating: </strong> {renderStars(caseStudy.rating)}
                  </p>
                  <div className="case-btn-container">
                    <Link
                      target="_blank"
                      to={`/case-studies/view-case-study/${caseStudy.caseTopic
                        .replace(" ", "-")
                        .toLowerCase()}/${caseStudy.id} `}
                    >
                      <button className="buy-now">View case study</button>
                    </Link>
                    {/* <div className="case-btn-container">
                    {isItemInCart(caseStudy) ? (
                      <button
                        className="go-to-cart"
                        onClick={() => navigate("/cart")}
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(caseStudy)}
                      >
                        Add to Cart
                      </button>
                    )}
                    <button
                      disabled={isPurchased}
                      className="buy-now"
                      onClick={() => handleBuyNow(caseStudy)}
                    >
                      {isPurchased ? "You have already purchased" : "Buy Now"}
                    </button>
                  </div> */}
                  </div>
                </div>
                <div className="case-study-video">
                  {/* <video controls controlsList="nodownload" src={video}>
                    Your browser does not support the video tag.
                  </video> */}
                  <img src={caseStudy.imageLink} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CaseStudy;

// <div className="case-study-display-container">
//   <h1 className="head-clr">AI Case Studies</h1>
//   {CaseStudies.map((caseStudy) => (
//     <>
//       <div key={caseStudy.id} className="case-study-card bright-border">
//         <h2 className="head-clr">{caseStudy.caseTopic}</h2>
//         <hr />
//         <div className="case-study-content">
//           <div className="case-study-text">
//             <p>
//               <strong>Lesson:</strong> {caseStudy.lession}
//             </p>

//             <p>
//               <strong>Future Skills:</strong> {caseStudy.fututreSkils}
//             </p>

//             <p>
//               <strong>Roles:</strong>
//               <ul>
//                 {caseStudy.roles.length > 0 &&
//                   Object.entries(caseStudy.roles[0]).map(([key, value]) => (
//                     <li key={key}>{value}</li>
//                   ))}
//               </ul>
//             </p>

//             <p>
//               <strong>Main Character Role:</strong>{" "}
//               {caseStudy.roleOfMainCharacter}
//             </p>

//             <p>
//               <strong>Challenge:</strong> {caseStudy.challenge}
//             </p>
//             <div className="case-btn-container">
//               <Link
//                 target="_blank"
//                 to={`/case-studies/view-case-study/${caseStudy.caseTopic
//                   .replace(" ", "-")
//                   .toLowerCase()}/${caseStudy.id} `}
//               >
//                 <button className="see-case-btn">See Case</button>
//               </Link>
//               <button className="add-to-cart">Add to cart</button>
//               <button className="buy-now">Buy Now</button>
//             </div>
//           </div>
//           <div className="case-study-video">
//             <video controls controlsList="nodownload">
//               {/* <source src={caseStudy.videoLink} type="video/mp4" /> */}
//               <source src={video} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       </div>{" "}
//       <hr />
//     </>
//   ))}
// </div>
