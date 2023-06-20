import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  BsChevronLeft,
  BsChevronRight,
  BsFullscreen,
  BsImageFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import { uploadFile } from "../../firebase";
import API from "../../util/AxiosConfig";
import "./styles.css";

export default function DeckSlider({ userID }) {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [hasBeenSwiped, setHasBeenSwiped] = useState(false);
  const [swiper, setSwiper] = React.useState();
  const prevRef = React.useRef();
  const nextRef = React.useRef();
  const [deck, setDeck] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [pitchDeck, setPitchDeck] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const user = useSelector((state) => state.authentication.user);
  const handle = useFullScreenHandle();

  const onDrop = (files) => {
    if (files.length > 0) {
      console.log(files);
      setSelectedFiles(files);
    }
  };

  const changePage = (index) => {
    const newIndex = Math.max(0, Math.min(index, deck.files.length - 1));
    if (newIndex !== index) {
      setHasBeenSwiped(true);
    }
    setIndex(newIndex);

    if (!hasBeenSwiped && Number(userID) !== Number(user?.user_id)) {
      // OPRET VIEW
      //API.post(`/deckview/${user?.user_id}`);
    }
  };
  const upload = async () => {
    setLoading(true);
    let currentFile = selectedFiles[0];
    setCurrentFile(currentFile);
    const fileUrl = await uploadFile(currentFile);
    const deck = await API.post(`/deck/${user?.user_id}`, { file: fileUrl });
    console.log("deck", deck);
    setLoading(false);
    setDeck(deck.data);
    setPitchDeck(fileUrl);
  };

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }

    const getDeck = async () => {
      console.log(userID);
      const deck = await API.get(`/deck/${userID}`);
      console.log("deckll", deck);
      if (deck.data) {
        console.log("deck", deck.data);
        setDeck(deck.data);
      }
      setLoading(false);
    };
    getDeck();
  }, [swiper]);

  return (
    <div className="h-100 w-100">
      {loading ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="grow" />
        </div>
      ) : (
        <>
          {deck ? (
            <div class="w-100 h-100 hidden d-md-flex">
              <div class="d-flex flex-column flex-1 justify-content-center w-100 h-100 relative">
                <div class="journey-experience-node">
                  <div class="journey-experience-node"></div>
                </div>
                <div class="journey-experience-node w-100 h-100">
                  <div class="relative h-100 mb-4 d-flex justify-start space-x-1">
                    <div class="d-flex w-100 h-100">
                      <div class="d-flex w-100 h-100">
                        <FullScreen className="w-100 h-100" handle={handle}>
                          <Swiper
                            initialSlide={index}
                            observeParents={true}
                            slidesPerView={1}
                            onSlideChange={(swiper) => {
                              changePage(swiper.activeIndex);
                            }}
                            onSwiper={setSwiper}
                            observer={true}
                            className={`mySwiper swiper swiper-initialized d-flex flex-column swiper-horizontal swiper-pointer-events theme-component-bg  ${
                              handle.active ? "fullscreen-view" : ""
                            }`}
                          >
                            {deck?.files.map((image, index) => (
                              <SwiperSlide
                                className={`swiper-slide ${
                                  handle.active ? "fullscreen-slide" : ""
                                }`}
                                key={index}
                              >
                                <img src={image} />
                              </SwiperSlide>
                            ))}

                            <div class="bg-white swiper-nav border-top border-gray-100 transition-opacity">
                              <div class="d-flex justify-content-between align-items-center px-4 py-2">
                                <div class="d-flex w-100 me-3 justify-content-between align-items-center">
                                  <div class="d-flex w-100 justify-content-between align-items-center">
                                    <div class="font-semibold text-sm">
                                      <button
                                        ref={prevRef}
                                        style={{
                                          border: "none",
                                          cursor: "pointer",
                                        }}
                                        class="rounded text-black hover:bg-gray-100"
                                      >
                                        <BsChevronLeft />
                                      </button>
                                    </div>
                                    <div class="font-semibold text-sm">
                                      <span class="d-inline-block min-w-3rem text-center text-black">
                                        {index} / {swiper?.slidesGrid.length}
                                      </span>
                                    </div>
                                    <div class="font-semibold text-sm">
                                      <button
                                        ref={nextRef}
                                        style={{
                                          border: "none",
                                          cursor: "pointer",
                                        }}
                                        class="rounded text-black hover:bg-gray-100"
                                      >
                                        <BsChevronRight />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <BsFullscreen
                                    style={{ cursor: "pointer" }}
                                    onClick={handle.enter}
                                  />
                                </div>
                              </div>
                            </div>
                          </Swiper>
                        </FullScreen>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-parent">
              <div className="content-container">
                <div className="mx-auto">
                  <div className="content-icon">
                    <div className="text-center">
                      <img
                        src="https://cdn.devdojo.com/images/november2020/welcome.png"
                        style={{ width: "200px", margin: "0 auto" }}
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <h2>You have not uploaded your first deck yet!.</h2>
                      <p>
                        When you are ready you can just drag and drop the file
                        down below!
                      </p>
                    </div>

                    <div className="mt-3">
                      {currentFile && (
                        <div className="progress mb-3">
                          <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progress + "%" }}
                          >
                            {progress}%
                          </div>
                        </div>
                      )}
                      <Dropzone onDrop={onDrop} multiple={false}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input {...getInputProps()} />
                              {selectedFiles && selectedFiles[0].name ? (
                                <div className="selected-file">
                                  {selectedFiles && selectedFiles[0].name}
                                </div>
                              ) : (
                                <div>
                                  <BsImageFill
                                    size={"20"}
                                    style={{ margin: "0 auto" }}
                                  />
                                  <h3>
                                    Drop your file here, or <a>browse</a>
                                  </h3>
                                  <span>
                                    Supports: PDF, PowerPoint, Google
                                    Presentations
                                  </span>
                                </div>
                              )}
                            </div>
                            <aside className="selected-file-wrapper">
                              <button
                                className="btn btn-success"
                                disabled={!selectedFiles}
                                onClick={upload}
                              >
                                Upload
                              </button>
                            </aside>
                          </section>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
