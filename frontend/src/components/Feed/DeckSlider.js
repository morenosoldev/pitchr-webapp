import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./styles.css";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import {
  BsChevronLeft,
  BsThreeDotsVertical,
  BsTrash,
  BsFillAspectRatioFill,
  BsChevronRight,
  BsFullscreen,
  BsImageFill,
} from "react-icons/bs";
import { Spinner } from "react-bootstrap";
import API from "../../util/AxiosConfig";
import { Dropdown } from "react-bootstrap";
import { Keyboard, Pagination, Navigation } from "swiper";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../firebase";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default function DeckSlider({ userID }) {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [hasBeenSwiped, setHasBeenSwiped] = useState(false);
  const [swiper, setSwiper] = React.useState();
  const prevRef = React.useRef();
  const nextRef = React.useRef();
  const [images, setImages] = useState([]);
  const [deck, setDeck] = useState(false);
  const { id } = useParams();
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
    if (!hasBeenSwiped && Number(userID) !== Number(user?.user_id)) {
      //OPRET VIEW
      API.post(`/deckview/${user?.user_id}`);
    }
    setHasBeenSwiped(true);
    setIndex(index);
  };

  const upload = async () => {
    setLoading(true);
    let currentFile = selectedFiles[0];
    setCurrentFile(currentFile);
    const fileUrl = await uploadFile(currentFile);
    console.log(fileUrl);
    await API.post(`/deck/${user?.user_id}`, { file: fileUrl });
    setLoading(false);
    setDeck(true);
    setPitchDeck(fileUrl);
  };

  const reset = () => {
    setCurrentFile(false);
    fdescribe();
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
      console.log(deck);
      if (deck.data) {
        console.log(deck.data);
        setDeck(deck.data);
      }
      setLoading(false);
    };
    getDeck();
  }, [swiper]);

  return (
    <div style={{ overflow: "hidden" }} className="h-100">
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
            <div className="tw-w-full tw-h-full tw-hidden md:tw-flex">
              <div className="tw-flex tw-flex-col tw-flex-1 tw-justify-center tw-h-full tw-relative tw-m-0">
                <div className="journey-experience-node">
                  <div className="journey-experience-node"></div>
                </div>
                <div className="journey-experience-node">
                  <div className="tw-relative tw-h-full tw-mb-4 tw-flex tw-justify-start tw-space-x-1">
                    <div className="tw-flex tw-w-full tw-h-full">
                      <div className="tw-flex tw-w-full tw-h-full">
                        <FullScreen
                          style={{ margin: "0 auto" }}
                          handle={handle}
                        >
                          <Swiper
                            observeParents={true}
                            slidesPerView={1}
                            onSlideChange={(swiper) => {
                              changePage(swiper.activeIndex);
                            }}
                            onSwiper={setSwiper}
                            observer={true}
                            className={`mySwiper swiper swiper-initialized swiper-horizontal swiper-pointer-events tw-flex tw-flex-col tw-self-center theme-component-bg tw-rounded-xl tw-transition-opacity ${
                              handle.active ? "fullscreen-view" : ""
                            }`}
                            breakpoints={{
                              // when window width is >= 640px
                              640: {
                                width: 729,
                                slidesPerView: 1,
                              },
                              // when window width is >= 768px
                              1900: {
                                width: 1068,
                                slidesPerView: 1,
                              },
                            }}
                          >
                            {deck?.files.map((image, index) => (
                              <SwiperSlide
                                className={`swiper-slide ${
                                  handle.active ? "fullscreen-slide" : ""
                                }`}
                                key={index}
                              >
                                <img src={image.Url} />
                              </SwiperSlide>
                            ))}

                            <div className="tw-bg-white tw-border-t tw-border-gray-100 tw-transition-opacity">
                              <div className="tw-flex tw-space-x-4 tw-items-center tw-justify-between tw-px-4 tw-py-2">
                                <div className="tw-flex tw-flex-none tw-space-x-2 tw-justify-between tw-items-center">
                                  <div className="tw-flex tw-flex-none tw-space-x-2 tw-justify-between tw-items-center">
                                    <div className="tw-font-semibold tw-text-sm">
                                      <button
                                        ref={prevRef}
                                        style={{
                                          border: "medium none",
                                          cursor: "pointer",
                                        }}
                                        className="tw-p-2 tw-rounded tw-text-black hover:tw-bg-gray-100 "
                                      >
                                        <BsChevronLeft />
                                      </button>
                                    </div>
                                    <div className="tw-font-semibold tw-text-sm">
                                      <span className="tw-inline-block min-w-[3rem] tw-text-center tw-text-black">
                                        {index} / {swiper?.slidesGrid.length}
                                      </span>
                                    </div>
                                    <div className="tw-font-semibold tw-text-sm">
                                      <button
                                        ref={nextRef}
                                        style={{
                                          border: "medium none",
                                          cursor: "pointer",
                                        }}
                                        className="tw-p-2 tw-rounded tw-text-black hover:tw-bg-gray-100 "
                                      >
                                        <BsChevronRight />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="tw-flex tw-space-x-4 tw-items-center tw-justify-between">
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
                    <div>
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
