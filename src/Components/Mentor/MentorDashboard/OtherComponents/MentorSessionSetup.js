import React from "react";

const MentorSessionSetup = ({user,token}) => {
  return (
    <div className="col-lg-10 ps-0">
      <div className="difuhtre_content">
        <div className="ghdfgdfgfg">
          <div className="container my-4">
            <p className="h1">Choose your favorable Class Timing </p>
            <p>
              Our classes are flexible and designed to benefit our students and
              mentees looking for the best personalized training.{" "}
            </p>
            <div className="card my-4 shadow">
              <div className="card-body">
                <form action="" method="post">
                  <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-md-10 dynamic-field" id="dynamic-field-1">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="staresd">
                            <div className="imgup">
                              <label for="field" className="hidden-md">
                                <b>Month</b>
                              </label>
                              {/* <!--<input type="file" className="form-control">--> */}
                              <select className="form-control" name="" id="">
                                <option>January</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label for="field" className="hidden-md">
                              <b>Day</b>
                            </label>
                            <select className="form-control" name="" id="">
                              <option>01</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              <b>Time</b>
                            </label>
                            <input type="time" className="form-control" name="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 mt-30 append-buttons">
                      <div className="clearfix">
                        <button
                          type="button"
                          id="add-button"
                          className="btn btn-secondary float-left text-uppercase shadow-sm"
                        >
                          <i className="fa fa-plus fa-fw"></i>
                        </button>
                        <button
                          type="button"
                          id="remove-button"
                          className="btn btn-secondary float-left text-uppercase ml-1"
                          disabled="disabled"
                        >
                          <i className="fa fa-minus fa-fw"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* <!--<footer>-->
                            <!--    Designed by &nbsp; <a className="class-link" href="https://www.instagram.com/pradeeptomar21/" target="blank">Pradeep Singh Tomar</a>-->
                            <!--  </footer>--> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSessionSetup;
