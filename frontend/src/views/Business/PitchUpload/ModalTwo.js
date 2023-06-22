import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner, Col, Row } from "react-bootstrap";
import { storage } from "../../../firebase";
import { setup, isSupported } from "@loomhq/loom-sdk";
import { oembed } from "@loomhq/loom-embed";

export default function ModalOne({
  prevStep,
  nextStep,
  changeVideoFile,
  publishVideo,
  changeLoomHTML,
  publishLoomVideo,
  progress,
  setProgress,
  video,
  step,
}) {
  const PUBLIC_APP_ID = "1169f8a9-cbfc-420b-9538-290fdd190d98";
  const BUTTON_ID = "loom-sdk-button";

  const uploadLoomVideo = (html) => {
    changeLoomHTML(html);
    nextStep();
  };

  const [videoHTML, setVideoHTML] = useState("");
  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();
      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }
      const button = document.getElementById(BUTTON_ID);
      if (!button) {
        return;
      }
      const { configureButton } = await setup({ publicAppId: PUBLIC_APP_ID });
      const sdkButton = configureButton({ element: button });
      sdkButton.on("insert-click", async (video) => {
        const { html } = await oembed(video.sharedUrl, { width: 400 });
        console.log(video.sharedUrl);
        publishLoomVideo(video.sharedUrl);
        setVideoHTML(html);
        uploadLoomVideo(html);
      });
    }
    setupLoom();
  }, []);

  const uploadVideo = async (video) => {
    const videoRef = storage.ref(`videos/${video.name}`);
    await videoRef.put(video).on(
      "state_changed",
      (snapshot) => {
        const progressNumber = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressNumber);
      },
      (error) => {
        // file upload failed
        console.log(error);
      },
      () => {
        // file upload completed
        storage
          .ref(`videos/${video.name}`)
          .getDownloadURL()
          .then(
            (url) => {
              // got download URL
              publishVideo(url);
              nextStep();
            },
            (error) => {
              // failed to get download URL
              console.log(error);
            }
          );
      }
    );
  };

  const next = async (e) => {
    await changeVideoFile(e);
    await uploadVideo(e.target.files[0]);
  };

  return (
    <>
      {progress > 0 && progress < 100 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Spinner animation="grow" />
        </div>
      ) : (
        <>
          <Modal.Header closeButton>
            <i
              onClick={prevStep}
              style={{ fontSize: "1.5rem", cursor: "pointer", marginRight: 15 }}
              className="fas fa-chevron-circle-left"
            ></i>
            <Modal.Title>Upload pitch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <i
                    style={{
                      fontSize: "4rem",
                      padding: 40,
                      borderRadius: "50%",
                      backgroundColor: "#F9F9F9",
                    }}
                    className="circle-upload fas fa-upload"
                  ></i>
                  <p style={{ marginTop: 25 }}>
                    Drag and drop your pre recorded pitch!
                  </p>
                  <p>Your videos are private until you release them.</p>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose files</Form.Label>
                    <Form.Control type="file" onChange={(e) => next(e)} />
                  </Form.Group>
                </div>
              </Col>

              <Col sm>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <i
                    style={{
                      fontSize: "4rem",
                      padding: 40,
                      borderRadius: "50%",
                      backgroundColor: "#F9F9F9",
                    }}
                    className="circle-upload fas fa-camera"
                  ></i>
                  <p style={{ marginTop: 25 }}>Record your video with loom.</p>
                  <p>
                    Just press record, and you are ready to record your pitch.
                  </p>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Button id={BUTTON_ID}>Record</Button>
                  </Form.Group>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </>
      )}
    </>
  );
}
