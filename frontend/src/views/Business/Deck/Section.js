import { isSupported, setup } from "@loomhq/loom-sdk";
import "moment-duration-format";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown } from "react-bootstrap";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineVideoCamera,
  AiOutlineWarning,
} from "react-icons/ai";
import {
  BsCamera,
  BsPencilFill,
  BsThreeDotsVertical,
  BsTrash,
  BsUpload,
} from "react-icons/bs";
import Loom from "../../../assets/images/loom.png";
import { uploadVideo } from "../../../firebase";

export default function Section({
  uploadData,
  items,
  removeContent,
  data,
  changeTitle,
  removeRow,
  savePitch,
  selected,
  move,
  select,
}) {
  const [edit, setEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(false);
  const handleEdit = () => setEdit(true);
  const handleEditClose = () => setEdit(false);
  const PUBLIC_APP_ID = "1169f8a9-cbfc-420b-9538-290fdd190d98";
  const [buttonID, setButtonID] = useState("loom-" + data.id);

  const addVideo = async (video) => {
    const uploadedVideo = await uploadVideo(video, setProgress);
    setSubmitted(true);
    uploadData(uploadedVideo.url, uploadedVideo.duration, "video", data.id);
    return uploadedVideo.duration;
  };

  const saveVideo = async () => {
    savePitch();
    setEdit(false);
  };

  const removeColumn = async () => {
    setSubmitted(false);
    removeRow(data.id);
  };

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();
      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }

      const button = document.getElementById(buttonID);

      if (!button) {
        return;
      }

      const { configureButton } = await setup({ publicAppId: PUBLIC_APP_ID });
      const sdkButton = configureButton({ element: button });
      sdkButton.on("insert-click", async (video) => {
        setSubmitted(true);

        uploadData(video.sharedUrl, video.duration, "loom", data.id);
        //const { html } = await oembed(video.sharedUrl, { width: 400 });
        //setVideoHTML(html);
      });
    }
    if (edit) {
      setupLoom();
    }
  }, [handleEdit]);

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
      <BsThreeDotsVertical size={"16"} />
    </a>
  ));

  return (
    <div
      onClick={() => select(data)}
      className={`box cursor-y deck-section ${
        selected?.id == data.id ? "activeDeck" : ""
      }`}
    >
      <div className="deck-section-container">
        <div className="deck-left">
          <div className="deck-status">
            {data.content ? (
              <>
                {data.content.type == "video" ? (
                  <AiOutlineVideoCamera color="black" size={"26"} />
                ) : (
                  <img width={"30px"} src={Loom} />
                )}
              </>
            ) : (
              <AiOutlineWarning color="black" size={"26"} />
            )}
          </div>
          {edit ? (
            <div className="deck-title-container">
              <input
                type="text"
                className="deck-input"
                value={data.title}
                onChange={(e) => changeTitle(e.target.value, data.id)}
              />
            </div>
          ) : (
            <>
              <div className="deck-title tw-text-gray-900 tw-truncate">
                {data.title}
              </div>

              <div className="deck-content">
                {data.content ? (
                  <span className="deck-duration">
                    {data?.content?.duration}
                  </span>
                ) : (
                  <span className="deck-content-text">No content added</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="deck-icons">
          {edit ? null : (
            <a href="#" onClick={handleEdit}>
              <BsPencilFill size={"16"} />
            </a>
          )}

          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu size="sm" title="">
              <Dropdown.Item
                onClick={() => removeColumn()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BsTrash />
                Delete video
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {edit ? (
            <a href="#" onClick={handleEditClose}>
              <AiOutlineClose size={"16"} />
            </a>
          ) : (
            <strong className="cursor" {...move}>
              <AiOutlineMenu size={"16"} />
            </strong>
          )}
        </div>
      </div>

      {edit ? (
        <div className="mt-3">
          {submitted ? null : null}
          <div className="deck-actions mt-3">
            {submitted ? (
              <div className="upload-status">
                {data?.content?.type == "video" ? (
                  <p>{progress}% Uploaded</p>
                ) : null}

                <a href="" onClick={() => removeContent(data.id)}>
                  Delete
                </a>
              </div>
            ) : (
              <Col sm={10}>
                <div className="deck-action-btns">
                  <div>
                    {/*default html file upload button*/}
                    <input
                      type="file"
                      onChange={(e) => addVideo(e.target.files[0])}
                      id="actual-btn"
                      accept="video/mp4,video/x-m4v,video/*"
                      hidden
                    />
                    {/*our custom file upload button*/}
                    <label className="deck-upload-btn" htmlFor="actual-btn">
                      <BsUpload size={"20"} />
                      <span className="btn-text">Upload</span>
                    </label>
                  </div>

                  <button id={buttonID} className="deck-upload-btn">
                    <BsCamera size={"20"} />
                    <span className="btn-text">Record</span>
                  </button>
                </div>
              </Col>
            )}
            <div>
              <Button
                disabled={
                  data?.content?.type == "video" ? progress < 100 : false
                }
                onClick={saveVideo}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
