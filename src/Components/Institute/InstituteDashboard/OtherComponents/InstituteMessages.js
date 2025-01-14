import React from "react";
import "../DashboardCSS/institutemessage.css";
const InstituteMessages = () => {
  return (
    <div className="col-lg-10 ps-0">
      <div className="mentor_dash_msge">
        <div id="frame">
          <div id="sidepanel">
            <div id="contacts">
              <ul className="ps-0">
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status online"></span>

                    <img
                      src="http://emilcarlsson.se/assets/louislitt.png"
                      alt=""
                    />

                    <div className="meta">
                      <p className="name">Louis Litt</p>
                    </div>
                  </div>
                </li>

                <li className="contact active">
                  <div className="wrap">
                    <img
                      src="http://emilcarlsson.se/assets/harveyspecter.png"
                      alt=""
                    />

                    <div className="meta">
                      <p className="name">Harvey Specter</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status away"></span>
                    <img
                      src="http://emilcarlsson.se/assets/rachelzane.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Rachel Zane</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status online"></span>
                    <img
                      src="http://emilcarlsson.se/assets/donnapaulsen.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Donna Paulsen</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src="http://emilcarlsson.se/assets/jessicapearson.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Jessica Pearson</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/haroldgunderson.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Harold Gunderson</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/danielhardman.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Daniel Hardman</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src="http://emilcarlsson.se/assets/katrinabennett.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Katrina Bennett</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/charlesforstman.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Charles Forstman</p>
                    </div>
                  </div>
                </li>

                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/jonathansidwell.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Jonathan Sidwell</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="content">
            <div className="contact-profile d-flex align-items-center p-2">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                className="me-2"
                alt=""
              />

              <p className="mb-0">Harvey Specter</p>
            </div>

            <div className="messages">
              <ul>
                <li className="sent">
                  <img
                    src="http://emilcarlsson.se/assets/mikeross.png"
                    alt=""
                  />
                  <p>
                    How the hell am I supposed to get a jury to believe you when
                    I am not even sure that I do?!
                  </p>
                </li>

                <li className="replies">
                  <img
                    src="http://emilcarlsson.se/assets/harveyspecter.png"
                    alt=""
                  />
                  <p>
                    When you're backed against the wall, break the god damn
                    thing down.
                  </p>
                </li>

                <li className="replies">
                  <img
                    src="http://emilcarlsson.se/assets/harveyspecter.png"
                    alt=""
                  />
                  <p>Excuses don't win championships.</p>
                </li>

                <li className="sent">
                  <img
                    src="http://emilcarlsson.se/assets/mikeross.png"
                    alt=""
                  />
                  <p>Oh yeah, did Michael Jordan tell you that?</p>
                </li>

                <li className="replies">
                  <img
                    src="http://emilcarlsson.se/assets/harveyspecter.png"
                    alt=""
                  />
                  <p>No, I told him that.</p>
                </li>

                <li className="replies">
                  <img
                    src="http://emilcarlsson.se/assets/harveyspecter.png"
                    alt=""
                  />
                  <p>
                    What are your choices when someone puts a gun to your head?
                  </p>
                </li>

                <li className="sent">
                  <img
                    src="http://emilcarlsson.se/assets/mikeross.png"
                    alt=""
                  />
                  <p>
                    What are you talking about? You do what they say or they
                    shoot you.
                  </p>
                </li>

                <li className="replies">
                  <img
                    src="http://emilcarlsson.se/assets/harveyspecter.png"
                    alt=""
                  />
                  <p>
                    Wrong. You take the gun, or you pull out a bigger one. Or,
                    you call their bluff. Or, you do any one of a hundred and
                    forty six other things.
                  </p>
                </li>
              </ul>
            </div>

            <div className="message-input">
              <div className="wrap">
                <input type="text" placeholder="Write your message..." />

                <button className="submit">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteMessages;
