// import React from "react";
// import Skeleton from "react-loading-skeleton";
// import "swiper/css";
// import "swiper/css/navigation";
// import "./Home.css";

// function SkeletonOfSection2() {
//   return (
//     <>
//       <div style={{ width: "400px", height: "500px", margin: "0px 20px" }}>
//         <div className="item">
//           <div className="iheroijr_inner bg-white text-center overflow-hidden position-relative">
//             <div className="diegrher overflow-hidden">
//               <br />
//               <Skeleton circle={true} width={240} height={300} />
//             </div>
//             <div className="doiuher_content">
//               <h4 className="mb-0">
//                 <Skeleton width={150} height={35} />
//               </h4>
//               <p className="profession">
//                 <Skeleton width={250} height={25} />
//               </p>
//               <p className="rating mb-0">
//                 <i className="fa-solid fa-star"></i>
//                 <i className="fa-solid fa-star"></i>
//                 <i className="fa-solid fa-star"></i>
//                 <i className="fa-solid fa-star"></i>
//                 <i className="fa-regular fa-star"></i>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SkeletonOfSection2;
import React from "react";

const MentorCardSkeleton = ({ singleCard }) => {
  const cardStyle = {
    width: "250px",
    margin: "15px",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    animation: "pulse 1.5s infinite ease-in-out",
  };

  const imageStyle = {
    width: "100%",
    height: "250px",
    backgroundColor: "#f0f0f0",
    position: "relative",
  };

  const ratingStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "4px 8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const starStyle = {
    width: "16px",
    height: "16px",
    backgroundColor: "#e0e0e0",
    borderRadius: "2px",
  };

  const contentStyle = {
    padding: "16px",
  };

  const nameStyle = {
    height: "24px",
    width: "70%",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginBottom: "8px",
  };

  const titleStyle = {
    height: "20px",
    width: "60%",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginBottom: "12px",
  };

  const tagContainerStyle = {
    display: "flex",
    gap: "8px",
  };

  const tagStyle = {
    height: "24px",
    backgroundColor: "#e6f3ff",
    borderRadius: "16px",
    width: "100px",
  };

  const headerStyle = {
    marginBottom: "24px",
  };

  const titleSkeletonStyle = {
    height: "40px",
    width: "300px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginBottom: "16px",
  };

  const subtitleSkeletonStyle = {
    height: "20px",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
  };

  const containerStyle = {
    padding: "3rem 7rem",
  };

  const cardsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: singleCard ? "center" : "flex-start",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  };

  const buttonSkeletonStyle = {
    width: "140px",
    height: "40px",
    backgroundColor: "#00d2ff",
    borderRadius: "8px",
  };

  const Card = () => (
    <div style={cardStyle}>
      <div style={imageStyle}>
        <div style={ratingStyle}>
          <div style={starStyle}></div>
          <div style={{ ...starStyle, width: "24px" }}></div>
        </div>
      </div>
      <div style={contentStyle}>
        <div style={nameStyle}></div>
        <div style={titleStyle}></div>
        <div style={tagContainerStyle}>
          <div style={tagStyle}></div>
          {!singleCard && <div style={tagStyle}></div>}
        </div>
      </div>
    </div>
  );

  if (singleCard) {
    return <Card />;
  }

  return (
    <div style={containerStyle}>
      {/* <div style={headerStyle}>
        <div style={titleSkeletonStyle}></div>
        <div style={subtitleSkeletonStyle}></div>
        <div style={buttonContainerStyle}>
          <div style={buttonSkeletonStyle}></div>
        </div>
      </div> */}
      <div style={titleSkeletonStyle}></div>

      <div style={cardsContainerStyle}>
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} />
        ))}
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default MentorCardSkeleton;
