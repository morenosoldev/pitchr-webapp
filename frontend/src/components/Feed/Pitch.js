import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { openPopupWidget } from "react-calendly";
import { useDispatch, useSelector } from "react-redux";
import { viewActions } from "../../store/actions/views.actions";
import ChatService from "../../store/services/chat.service";
import { pitchService } from "../../store/services/pitch.service";
import { history } from "../../util/history";
import Card from "../Card";
import PitchDeck from "../PitchDeck/PitchDeck";

export default function Pitch({
  company,
  pitchDeck,
  logo,
  loom,
  calendly,
  undertitle,
  description,
  thumbnail,
  videoSrc,
  userID,
  businessID,
  pitchID,
}) {
  const [playing, setPlaying] = useState(false);
  const [showPitchDeck, setShowPitchDeck] = useState(true);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [viewCounted, setViewCounted] = useState(false);

  console.log(pitchDeck);

  const AddNewFriend = () => {
    console.log(businessID);
    ChatService.createChat(businessID)
      .then((chats) => {
        //socket.emit('add-friend', chats)
        history.push("/investor/app/chat");
      })
      .catch((err) => console.log(err));
  };

  let hoverTime = 10000;
  let t;

  function start() {
    //setTimeout(showTooltip(), 5000);
    t = setTimeout(() => {
      console.log("Skift væk fra videoen");
      setPlaying(false);
    }, hoverTime);
  }

  function stop() {
    clearTimeout(t);
  }

  const CustomButton = ({ url, prefill, pageSettings, utm }) => {
    const onClick = () => openPopupWidget({ url, prefill, pageSettings, utm });

    return (
      <Dropdown.Item onClick={() => onClick()} className="p-3" to="#">
        <div className="d-flex align-items-top">
          <i className="fas fa-mug-hot"></i>{" "}
          <div className="data ms-2">
            <h6>Get a cup of coffee</h6>
            <p className="mb-0">Setup meeting</p>
          </div>
        </div>
      </Dropdown.Item>
    );
  };

  function func() {
    var video = document.getElementById("pitch");
    if (video.currentTime > video.duration - 30) {
      dispatch(viewActions.addPitchViews(businessID, user.user_id));
      setViewCounted(true);
    }
  }

  return (
    <Card className="pitch-card card-block card-stretch">
      <Card.Body>
        <div className="user-post">
          <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
            <div
              className="pickgradient row-span-2 row-span-md-1"
              style={{ position: "relative" }}
            >
              {showPitchDeck ? (
                <>
                  <PitchDeck pdf={pitchDeck} companyName={company} />
                </>
              ) : (
                <div>
                  {playing ? (
                    <>
                      {loom?.length > 0 ? (
                        <>
                          <div
                            style={{
                              position: "relative",
                              paddingBottom: "56.25%",
                              height: 0,
                            }}
                          >
                            <iframe
                              src={`https://www.loom.com/embed/${
                                loom?.split("/")[4]
                              }`}
                              frameborder="0"
                              webkitallowfullscreen
                              mozallowfullscreen
                              allowfullscreen
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              }}
                            ></iframe>
                          </div>
                        </>
                      ) : (
                        <div onMouseOver={stop} onMouseOut={start} id="video">
                          <video
                            id="pitch"
                            onTimeUpdate={viewCounted ? null : func}
                            poster={thumbnail}
                            style={{ width: "100%", height: "100%" }}
                            controls
                            autoPlay
                          >
                            <source src={videoSrc} type="video/mp4" />
                          </video>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="img-gradient">
                        <img
                          src={
                            thumbnail.length > 0
                              ? thumbnail
                              : "https://solutions.rent/wp-content/uploads/2019/07/spotkanie-biznesowe.jpg"
                          }
                          alt="post1"
                          style={{ width: "100%" }}
                          className="img-fluid"
                        />
                      </div>
                      <button className="play-button">
                        <i
                          onClick={() => setPlaying(!playing)}
                          className="fas fa-play-circle"
                          style={{ color: "white", fontSize: "3.5rem" }}
                        ></i>
                      </button>
                      <div
                        className="card-post-toolbar"
                        style={{ position: "absolute", top: 0, right: 0 }}
                      >
                        {user.user_id === businessID ? null : (
                          <Dropdown>
                            <Dropdown.Toggle
                              className="more-btn border-white"
                              style={{
                                borderRadius: "50%",
                                backgroundColor: "white",
                              }}
                            >
                              <i className="ri-more-fill"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu m-0 p-0">
                              <Dropdown.Item
                                className=" p-3"
                                href={`/investor/app/company/${businessID}/about-us`}
                              >
                                <div className="d-flex align-items-top">
                                  <i className="far fa-building"></i>
                                  <div className="data ms-2">
                                    <h6>See more</h6>
                                    <p className="mb-0">
                                      Visit the company profile page
                                    </p>
                                  </div>
                                </div>
                              </Dropdown.Item>

                              <Dropdown.Item
                                onClick={() => setShowPitchDeck(true)}
                                className=" p-3"
                                to="#"
                              >
                                <div className="d-flex align-items-top">
                                  <div className="h4">
                                    <i className="fas fa-chart-area"></i>
                                  </div>
                                  <div className="data ms-2">
                                    <h6>Show pitchdeck</h6>
                                    <p className="mb-0">
                                      Click to see the pitch deck
                                    </p>
                                  </div>
                                </div>
                              </Dropdown.Item>

                              <Dropdown.Item
                                onClick={() =>
                                  pitchService.savePitch(pitchID, user.user_id)
                                }
                                className=" p-3"
                                to="#"
                              >
                                <div className="d-flex align-items-top">
                                  <div className="h4">
                                    <i className="ri-save-line"></i>
                                  </div>
                                  <div className="data ms-2">
                                    <h6>Save Pitch</h6>
                                    <p className="mb-0">
                                      Add this to your saved pitches
                                    </p>
                                  </div>
                                </div>
                              </Dropdown.Item>

                              <Dropdown.Item
                                onClick={() => AddNewFriend()}
                                className="p-3"
                                to="#"
                              >
                                <div className="d-flex align-items-top">
                                  <i className="far fa-comment-dots"></i>{" "}
                                  <div className="data ms-2">
                                    <h6>Get in contact</h6>
                                    <p className="mb-0">
                                      Send a message to this startup!
                                    </p>
                                  </div>
                                </div>
                              </Dropdown.Item>
                              {calendly?.length > 0 ? (
                                <CustomButton url={calendly} />
                              ) : null}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </div>
                      <div
                        className="user-post-data"
                        style={{
                          position: "absolute",
                          bottom: 10,
                          left: 40,
                          right: 40,
                        }}
                      >
                        <div className="d-flex">
                          <div className="me-3">
                            <img
                              className="img-fluid"
                              src={logo}
                              style={{ maxWidth: 70, borderRadius: 10 }}
                              alt=""
                            />
                          </div>
                          <div className="pitchInfo">
                            <div className="w-100">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <h3
                                    style={{ color: "white" }}
                                    className="mb-0 d-inline-block"
                                  >
                                    {company}
                                  </h3>
                                  <p
                                    style={{ color: "white" }}
                                    className="mb-0"
                                  >
                                    {undertitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p style={{ color: "white" }}>{description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
