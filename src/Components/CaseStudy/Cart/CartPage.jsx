import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  saveForLater,
  moveToCart,
  removeFromSaved,
  clearCart,
} from "../../../Redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../../Images/logo.png";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../Redux/loadingRedux.js";
import { ApiURL } from "../../../Utils/ApiURL.js";
const CartPage = ({ user, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = ApiURL();
  const cart = useSelector((state) => state.cart.items || []);
  const savedItems = useSelector((state) => state.cart.savedItems || []);
  const purchasedItems = useSelector((state) => state.purchased.purchasedItems);

  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch total amount on component mount or cart change
  useEffect(() => {
    if (cart.length > 0) {
      fetchTotalAmount();
    } else {
      setTotalAmount(0);
    }
  }, [cart]);

  const fetchTotalAmount = async () => {
    try {
      const response = await axios.post(
        `${url}api/v1/case-studies/cart/get-total-amount`,
        {
          cart,
        }
      );
      if (response.data.success) {
        setTotalAmount(response.data.success);
      } else {
        // Handle error
        console.error(response.data.error);
      }
    } catch (err) {
      console.error("Error fetching total amount:", err);
    }
  };

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleSaveForLater = (index) => {
    dispatch(saveForLater(index));
  };

  const handleMoveToCart = (index) => {
    dispatch(moveToCart(index));
  };

  const handleRemoveFromSaved = (index) => {
    dispatch(removeFromSaved(index));
  };
  const clearCartHandler = () => {
    dispatch(clearCart());
  };
  const CaseStudyCheckoutHandler = async (cart) => {
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
          `${url}api/v1/case-studies/cart/create-order`,
          {
            userEmail: user?.user_email,
            userId: user?.user_id,
            cart: cart,
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
              `${url}api/v1/case-studies/cart/pay-case-study`,
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                userId: user?.user_id,
                userEmail: user?.user_email,
                username: username,
              }
            );
            if (res.data.success) {
              return (
                toast.success(res.data.success, {
                  position: "top-center",
                }),
                clearCartHandler(),
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
  return (
    <div className="cart-page">
      <div className="back-arrow" onClick={() => navigate("/case-studies")}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <h2 className="cart-title">Cart</h2>
      <p onClick={clearCartHandler}>clear cart</p>
      {cart.length > 0 ? (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-header">
                  <h3 className="item-header-title">{item.caseTopic}</h3>
                  <div className="item-actions">
                    <button
                      className="save-for-later-button"
                      onClick={() => handleSaveForLater(index)}
                    >
                      Save for Later
                    </button>
                    <i
                      className="fa-solid fa-trash remove-button"
                      onClick={() => handleRemoveFromCart(index)}
                    ></i>
                  </div>
                </div>
                <p className="cart-item-price">Price: ₹{item.price}</p>
              </li>
            ))}
          </ul>
          <div className="total-container">
            <h2 className="total-amount">Total Amount: ₹{totalAmount / 100}</h2>
            {user ? (
              <button
                className="checkout-button"
                onClick={() => CaseStudyCheckoutHandler(cart)}
              >
                Checkout
              </button>
            ) : (
              <button className="checkout-button">
                <Link to="/login">Login</Link>
              </button>
            )}
          </div>
        </>
      ) : (
        <h1 className="empty-cart-message">Your cart is empty</h1>
      )}

      {savedItems.length > 0 && (
        <div className="saved-for-later-section">
          <h2 className="saved-for-later-title cart-title">Saved for Later</h2>
          <ul className="cart-list">
            {savedItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-header">
                  <h3 className="item-header-title">{item.caseTopic}</h3>
                  <div className="item-actions">
                    <button
                      className="move-to-cart-button"
                      onClick={() => handleMoveToCart(index)}
                    >
                      Move to Cart
                    </button>
                    <i
                      className="fa-solid fa-trash remove-button"
                      onClick={() => handleRemoveFromSaved(index)}
                    ></i>
                  </div>
                </div>
                <p className="cart-item-price">Price: ₹{item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartPage;
