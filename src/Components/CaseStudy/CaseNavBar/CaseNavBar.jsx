import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CaseNavBar.css";

const CaseNavBar = () => {
  const cart = useSelector((state) => state.cart.items);

  return (
    <nav className="case-navbar md-header">
      <h4>
        <Link to="/case-studies">Case Studies</Link>
      </h4>
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
        </Link>
        <span>{cart.length}</span>
      </div>
    </nav>
  );
};

export default CaseNavBar;
