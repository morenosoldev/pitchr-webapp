import React, { useState } from "react";
import {
  Modal,
  Col,
  Form,
  Button,
  FloatingLabel,
  Container,
  Row,
} from "react-bootstrap";
import "../../../assets/scss/custom/components/upload/_upload.scss";
import { storage } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { pitchActions } from "../../../store/actions/pitch.actions";

export default function ModalTwo({
  title,
  description,
  prevStep,
  nextStep,
  changeTitle,
  loom,
  loomHTML,
  changeDescription,
  video,
  changeThumbnail,
}) {
  const [customThumbnail, setCustomThumbnail] = useState("");
  const dispatch = useDispatch();

  const upload = () => {
    document.getElementById("selectImage").click();
  };

  const uploadPitch = () => {
    dispatch(pitchActions.createPitch(video));
    nextStep();
  };

  const uploadImage = async (image) => {
    const imageRef = storage.ref(`images/${image.name}`);
    await imageRef.put(image).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // file upload failed
      },
      () => {
        // file upload completed
        storage
          .ref(`images/${image.name}`)
          .getDownloadURL()
          .then(
            (url) => {
              // got download URL
              setCustomThumbnail(url);
              changeThumbnail(url);
            },
            (error) => {
              // failed to get download URL
            }
          );
      }
    );
  };

  const changeCanvas = () => {};

  return (
    <>
      <Modal.Header closeButton>
        <i
          onClick={prevStep}
          style={{ fontSize: "1.5rem", cursor: "pointer", marginRight: 15 }}
          className="fas fa-chevron-circle-left"
        ></i>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col sm={7}>
              <h3 style={{ fontWeight: "bold", marginBottom: 10 }}>Info</h3>

              <FloatingLabel
                controlId="floatingInput"
                label="Title (mandatory)"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={title}
                  placeholder="New innovative tech company..."
                  onChange={(e) => changeTitle(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingTextarea2"
                label="Elevator pitch"
              >
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => changeDescription(e.target.value)}
                  maxLength={180}
                  placeholder="Our company is a new evolving eco friendly solution to...."
                  style={{ height: "100px" }}
                />
              </FloatingLabel>

              <h4 style={{ marginTop: 15 }}>Thumbnail</h4>
              <p>
                Upload a pitcture that shows what your pitch is about. A good
                thumbnail will make you stand out, and catch investors
                attention.
              </p>
              <div style={{ display: "flex" }}>
                {customThumbnail.length > 0 ? (
                  <div className={`thumbnail "active`}>
                    <img src={customThumbnail} width="125px" />
                  </div>
                ) : (
                  <button className="thumbnailBtn" onClick={() => upload()}>
                    <input
                      id="selectImage"
                      hidden
                      type="file"
                      onChange={async (e) =>
                        await uploadImage(e.target.files[0])
                      }
                    />
                    <i className="far fa-images"></i>
                    <p style={{ textAlign: "center", fontSize: 9, margin: 0 }}>
                      Upload <br></br>
                      thumbnail
                    </p>
                  </button>
                )}
              </div>
            </Col>
            <Col sm={5}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  {loomHTML ? (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: loomHTML }}></div>
                    </>
                  ) : (
                    <>
                      <video
                        onLoadedMetadata={() => changeCanvas()}
                        poster={customThumbnail ? customThumbnail : null}
                        style={{ width: "100%" }}
                        controls
                      >
                        <source src={video?.videoUrl} type="video/mp4" />
                      </video>
                    </>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#F9F9F9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>Videolink</span>

                        <a href={video.videoUrl}>https://pitchr.dk/pitch/1</a>
                      </div>

                      <div style={{ padding: 10 }}>
                        <i
                          className="copy-btn fas fa-copy"
                          onClick={() => {
                            navigator.clipboard.writeText(video?.videoUrl);
                          }}
                        ></i>
                      </div>
                    </div>
                    {loom.length > 0 ? null : (
                      <div style={{ padding: 10 }}>
                        <span>Filename</span>
                        <p style={{ color: "black", fontSize: "0.9rem" }}>
                          {video?.videoFile.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div></div>
              </div>
            </Col>
            <Col sm={12}>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Button onClick={() => prevStep()}>Back</Button>
                </div>

                <div>
                  <Button onClick={() => uploadPitch()}>Upload</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </>
  );
}
