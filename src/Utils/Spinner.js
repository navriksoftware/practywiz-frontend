import React from "react";

const Spinner = () => {
  return (
    <div className="loadingBackdrop">
      <div>
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
