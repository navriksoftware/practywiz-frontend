import React, { useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 250) {
      setVisible(true);
    } else if (scrolled <= 250) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <div className="scrollToTop">
      <i
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
        className="fa fa-arrow-circle-up"
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default ScrollButton;
