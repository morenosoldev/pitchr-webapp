import React from "react";
import { Modal, Row, Col, Form, Spinner } from "react-bootstrap";
import { storage } from "../../../firebase";

export default function ModalOne({ nextStep, publishPitchDeck, progress }) {
  const uploadFile = async (file) => {
    const fileRef = storage.ref(`files/${file.name}`);
    await fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const progressNumber = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // file upload failed
      },
      () => {
        // file upload completed
        storage
          .ref(`files/${file.name}`)
          .getDownloadURL()
          .then(
            (url) => {
              // got download URL
              publishPitchDeck(url);
              nextStep();
            },
            (error) => {
              // failed to get download URL
            }
          );
      }
    );
  };

  const next = async (e) => {
    await uploadFile(e.target.files[0]);
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
            <Modal.Title>Upload Pitch Deck</Modal.Title>
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
                    Drag and drop your presentation!
                  </p>
                  <span>
                    Only PDF files is allowed, to see how to turn your
                    PowerPoint into PDF <a href="#">Click here</a>
                  </span>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose file</Form.Label>
                    <Form.Control type="file" onChange={(e) => next(e)} />
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
