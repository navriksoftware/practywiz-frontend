import React from "react";
import Skeleton from "react-loading-skeleton";

function SessionCardSkeleton() {
  return (
    <>
      <div className="col-lg-3 mb-3">
        <div className="ghfghgfhg iuhuh__enruiere mb-0">
          <div className="jghdfrg">
            <div className="row">
              <div className="col-lg-12">
                <div className="doiejrer_left">
                  <div className="kmg">
                    <Skeleton
                      style={{
                        width: "200px",
                        height: "175px",
                        // width: "auto !important",
                        margin: "0 auto",
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        overflow: "visible !important",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="doiejrer_right mt-3">
                  <div className="dfhjbghfjgfgh22">
                    <h4>
                      <Skeleton width={200} height={30} />
                    </h4>

                    <h5 style={{ marginTop: "5px" }}>
                      <Skeleton width={200} height={20} />
                    </h5>

                    <hr />

                    <div className="row mt-3 justify-content-center">
                      <div className="col-lg-6 mb-2">
                        <div className="ierjuhrt_left">
                          <h5 className="mb-0">
                            <Skeleton width={80} height={30} />
                          </h5>

                          <p className="my-0">
                            <Skeleton width={80} height={20} />
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <div className="ierjuhrt_left">
                          <h5 className="mb-0">
                            <Skeleton width={80} height={30} />
                          </h5>

                          <p className="my-0">
                            <Skeleton width={80} height={20} />
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <div className="ierjuhrt_left"></div>
                      </div>
                    </div>

                    <hr />

                    <div
                      className="kbfhgfgfg d-flex justify-content-center mt-3"
                      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      <Skeleton width={200} height={30} />
                      <Skeleton width={200} height={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SessionCardSkeleton;
