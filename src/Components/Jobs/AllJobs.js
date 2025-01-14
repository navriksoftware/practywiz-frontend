import React, { useState } from "react";
import "./AllJobs.css";
import JobCard from "./JobCard";
const AllJobs = () => {
  const [selectedOption, setSelectedOption] = useState("0"); // Default value is "Sort By"

  const handleSortChange = (e) => {
    setSelectedOption(e.target.value);
    // You can add sorting logic here based on the selected option
  };

  const handleClearAll = () => {
    setSelectedOption("0"); // Reset to default option
    // You can add logic here to clear any other filters or selections
  };

  const renderSelectedOptionText = () => {
    switch (selectedOption) {
      case "1":
        return "Latest Jobs";
      case "2":
        return "Older Jobs";
      case "3":
        return "30+ Days";
      default:
        return "Sort By";
    }
  };
  return (
    <>
      <div className="aslkhghj">
        <div className="container-fluid px-5">
          <div className="jgfgfg">
            <h2>Find Job</h2>
            <p>THE DOOR OF SUCCESS IS A CLICK AWAY FROM YOU</p>
          </div>
        </div>
      </div>

      {/* Responsive filter start */}
      <div
        className="khgjfgfhg2252 iuheirhggg_ihberr ugenhuhrtniu d-none"
        id="duygerncrttt"
      >
        <div className="knjghjfggfgfghgh">
          <div className="huirebff_close">
            <i className="fa-solid fa-circle-xmark" id="close-filter"></i>
          </div>

          <div className="label2">Search by Keywords</div>

          <div className="inputWithIcon">
            <input type="text" placeholder="Job title, keywords, or company" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="knjghjfggfgfghgh">
          <div className="label2">Location</div>
          <div className="inputWithIcon">
            <input type="text" placeholder="City or postcode" />
            <i className="fa-solid fa-location-arrow"></i>
          </div>
        </div>

        <div className="knjghjfggfgfghgh">
          <div className="label2">Category</div>
          <div className="inputWithIcon">
            <input type="text" placeholder="Choose a category" />
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
        </div>

        <div className="njghbfgfhhg">
          <h4>Job Type</h4>

          <div className="oidjaioerr">
            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onClick="">
                  <input type="checkbox" />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>Freelance</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onclick="">
                  <input type="checkbox" />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>Fulltime</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onclick="">
                  <input type="checkbox" />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>PartTime</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onclick="">
                  <input type="checkbox" />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>Temporary</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onclick="">
                  <input type="checkbox" />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>Temporary</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onclick="">
                  <input type="checkbox" />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>Temporary</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Posted */}

        <div className="mkdfhgjgh">
          <h4>Date Posted</h4>

          <div className="klfgf">
            <form action="#">
              <p>
                <input type="radio" id="test1" name="radio-group" default />
                <label htmlFor="test1">All</label>
              </p>

              <p>
                <input type="radio" id="test2" name="radio-group" />
                <label htmlFor="test2">Last Posted</label>
              </p>

              <p>
                <input type="radio" id="test3" name="radio-group" />
                <label htmlFor="test3">Last 24 Hour</label>
              </p>

              <p>
                <input type="radio" id="test4" name="radio-group" />
                <label htmlFor="test4">Last 7 Hour</label>
              </p>

              <p>
                <input type="radio" id="test5" name="radio-group" />
                <label htmlFor="test5">Last 14 Hour</label>
              </p>

              <p>
                <input type="radio" id="test6" name="radio-group" />
                <label htmlFor="test6">Last 30 Hour</label>
              </p>

              <p>
                <input type="radio" id="test7" name="radio-group" />
                <label htmlFor="test7">Last 30 Hour</label>
              </p>

              <p>
                <input type="radio" id="test8" name="radio-group" />
                <label htmlFor="test8">Last 30 Hour</label>
              </p>
            </form>
          </div>
        </div>
        {/*Experience */}

        <div className="kjghfhgj">
          <h4>Experience Level</h4>

          <div className="klfgf">
            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onClick="">
                  <input type="checkbox" default />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>Freshers</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onClick="">
                  <input type="checkbox" default />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>1 Year</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onClick="">
                  <input type="checkbox" default />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>2 Year</p>
              </div>
            </div>

            <div className="gghfthghdf">
              <div className="hfghgf225">
                <label className="toggleSwitch nolabel" onClick="">
                  <input type="checkbox" default />
                  <span>
                    <span></span>
                    <span></span>
                  </span>
                </label>
              </div>

              <div className="khgjfgf">
                <p>Freelance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lkrhhdfgfdfgfhf">
        <div className="container-fluid px-5">
          <div className="dkjbghdfgfd">
            <div className="row">
              <div className="col-lg-3">
                <div className="khgjfgfhg2252 sticky-top">
                  <div className="knjghjfggfgfghgh">
                    <div className="label2">Search by Keywords</div>
                    <div className="inputWithIcon">
                      <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                      />
                      <i className="fa-solid fa-magnifying-glass" />
                    </div>
                  </div>
                  <div className="knjghjfggfgfghgh">
                    <div className="label2">Location</div>
                    <div className="inputWithIcon">
                      <input type="text" placeholder="City or postcode" />
                      <i className="fa-solid fa-location-arrow" />
                    </div>
                  </div>
                  <div className="knjghjfggfgfghgh">
                    <div className="label2">Category</div>
                    <div className="inputWithIcon">
                      <input type="text" placeholder="Choose a category" />
                      <i className="fa-solid fa-bag-shopping" />
                    </div>
                  </div>
                  <div className="njghbfgfhhg">
                    <h4>Job Type</h4>
                    <div className="oidjaioerr">
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a></a>
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Freelance</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Fulltime</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>PartTime</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Temporary</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<div className="mkdfhgjgh">*/}
                  {/*    <h4>Date Posted</h4>*/}
                  {/*    <div className="klfgf">*/}
                  {/*        <form action="#">*/}
                  {/*            <p>*/}
                  {/*              <input type="radio" id="test1" name="radio-group"  >*/}
                  {/*              <label for="test1">All</label>*/}
                  {/*            </p>*/}
                  {/*            <p>*/}
                  {/*              <input type="radio" id="test2" name="radio-group">*/}
                  {/*              <label for="test2">Last Posted</label>*/}
                  {/*            </p>*/}
                  {/*            <p>*/}
                  {/*              <input type="radio" id="test3" name="radio-group">*/}
                  {/*              <label for="test3">Last 24 Hour</label>*/}
                  {/*            </p>*/}
                  {/*            <p>*/}
                  {/*                <input type="radio" id="test4" name="radio-group">*/}
                  {/*                <label for="test4">Last 7 Hour</label>*/}
                  {/*            </p>*/}
                  {/*            <p>*/}
                  {/*                <input type="radio" id="test5" name="radio-group">*/}
                  {/*                <label for="test5">Last 14 Hour</label>*/}
                  {/*            </p>*/}
                  {/*            <p>*/}
                  {/*                <input type="radio" id="test6" name="radio-group">*/}
                  {/*                <label for="test6">Last 30 Hour</label>*/}
                  {/*            </p>*/}
                  {/*            <p>*/}
                  {/*                <input type="radio" id="test6" name="radio-group">*/}
                  {/*                <label for="test6">Last 30 Hour</label>*/}
                  {/*            </p>*/}
                  {/*            <p>*/}
                  {/*                <input type="radio" id="test6" name="radio-group">*/}
                  {/*                <label for="test6">Last 30 Hour</label>*/}
                  {/*            </p>*/}
                  {/*        </form>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                  <div className="kjghfhgj">
                    <h4>Date Posted</h4>
                    <div className="klfgf">
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>All</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Last Posted</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Last 24 Hour</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Last 7 Hour</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kjghfhgj">
                    <h4>Experience Level</h4>
                    <div className="klfgf">
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Freshers</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>1 Year</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>2 Year</p>
                        </div>
                      </div>
                      <div className="gghfthghdf">
                        <div className="hfghgf225">
                          <label className="toggleSwitch nolabel" onclick="">
                            <input type="checkbox" />
                            <span>
                              <span />
                              <span />
                            </span>
                            <a />
                          </label>
                        </div>
                        <div className="khgjfgf">
                          <p>Freelance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="ihdsrfgbg pt-3">
                  <div className="csdfygtyy d-flex justify-content-between mb-4">
                    <h5 className="mb-0">SHOWING 7 JOBS</h5>

                    <div className="cfbghed d-none" id="uidgerr_text">
                      <i className="fa-solid fa-filter"></i> Filter by
                    </div>

                    <div className="dieirherr_btn">
                      <div
                        className="custom-select sfgrwwe_btn btn btn-main me-2"
                        style={{ width: "14rem" }}
                      >
                        <select
                          value={selectedOption}
                          onChange={handleSortChange}
                        >
                          <option value="0">Sort By</option>
                          <option value="1">Latest Jobs</option>
                          <option value="2">Older Jobs</option>
                          <option value="3">30+ Days</option>
                        </select>
                        <div className="select-selected">
                          {renderSelectedOptionText()}
                        </div>
                      </div>

                      <button className="btn btn-main" onClick={handleClearAll}>
                        Clear All
                        <span>
                          <i className="fa-solid ms-2 fa-circle-xmark"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                  <JobCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*last */}
    </>
  );
};

export default AllJobs;
