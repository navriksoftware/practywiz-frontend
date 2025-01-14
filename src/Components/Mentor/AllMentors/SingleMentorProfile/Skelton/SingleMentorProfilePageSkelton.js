import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SingleMentorProfileSkelton.css";
const SingleMentorProfilePageSkelton = () => {
  return (
    <div className="mainContainer">
      <div className="container1">
        <Skeleton width={"100%"} height={"100%"} baseColor="#c6c6c6" />
        <div className="profileContainer">
          <div className="containerOFProfile">
            <div className="base">
              <Skeleton circle={true} width={"170px"} height={"170px"} />
            </div>
            <span className="btn_profile">
              <span>
                <Skeleton width={200} height={50} />
              </span>
              <span>
                <Skeleton width={200} height={50} />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="detailContainer">
          <div className="nameContainer">
            <span>
              <Skeleton width={280} height={35} />
            </span>
            <span style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Skeleton width={35} height={35} />
              <Skeleton width={35} height={35} />
            </span>
          </div>
          <br />
          <div className="aboutContainer" style={{ marginBottom: "4.5rem" }}>
            <Skeleton width={215} height={35} />
            <Skeleton width={215} height={35} />
            <Skeleton width={"90%"} height={30} />
            <Skeleton width={"90%"} />
          </div>
          <div className="nameContainer" style={{ display: "block" }}>
            <div>
              <Skeleton width={300} height={40} />
            </div>
            <br />
            <div>
              <Skeleton width={350} height={35} />
              <Skeleton width={"90%"} />
              <Skeleton width={"90%"} />
              <Skeleton width={"90%"} />
            </div>
            <br />
            <div>
              <Skeleton width={350} height={35} />
              <Skeleton width={200} />
            </div>
          </div>
        </div>
        <div className="expirienceContainer">
          <div className="skills">
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Skeleton width={200} height={35} />
              <span width="40%"> </span>
              <Skeleton width={200} height={35} />
              <Skeleton width={80} height={35} />
              <Skeleton width={50} height={35} />
              <Skeleton width={100} height={35} />
              <Skeleton width={110} height={35} />
              <Skeleton width={150} height={35} />
            </div>
            <br />
            <br />
            <br />
            <div style={{ margin: "0 auto", paddingLeft: "5rem" }}>
              <Skeleton width={300} height={35} />
              <br />
              <Skeleton width={"80%"} height={300} />
            </div>
          </div>
          <div className="calender"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleMentorProfilePageSkelton;
