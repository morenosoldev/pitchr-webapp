import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Form,
  Link,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { uploadVideo } from "../../../firebase";
import API from "../../../util/AxiosConfig";
import MainModal from "./MainModal";

export default function Upload() {
  const user = useSelector((state) => state.authentication.user);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [video, setVideo] = useState(null);
  const [hasPitch, setHasPitch] = useState(false);

  //MAIN MODAL
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //ALERT MODAL
  const handleAlertClose = () => setShowAlert(false);
  const handleAlertShow = () => setShowAlert(true);

  useEffect(async () => {
    const res = await API.get(`/hasPitch/${user.user_id}`);
    setHasPitch(res.data);
  }, []);

  const addVideoPitch = async () => {
    const video = await uploadVideo(video);
  };

  const startUpload = () => {
    handleAlertClose();
    handleShow();
  };

  return (
    <Container fluid>
      <Row>
        <Modal size="xl" show={show} onHide={handleClose}>
          <MainModal />
        </Modal>

        <Modal show={showAlert} onHide={handleAlertClose}>
          <Modal.Header closeButton>
            <Modal.Title>You already have a pitch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            If you proceed to create a new pitch, your previous pitch will be
            deleted.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAlertClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={startUpload}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>

        <Col sm>
          <Card>
            <Card.Body className="upload-pitch">
              <Card.Title>Upload deck</Card.Title>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  className="upload-pitch-icon"
                  style={{ borderRadius: "50%" }}
                >
                  <i
                    className="far fa-chart-bar"
                    style={{ fontSize: "3rem", padding: 20, color: "black" }}
                  ></i>
                </div>

                <p className="mb-3">
                  Let's get you set up! Upload your pitch deck now by clicking
                  the button below. Go t our <a>blog post</a>. To see guidelines
                  for pitch decks, written by our investor partners.
                </p>
                <Button onClick={hasPitch ? handleAlertShow : handleShow}>
                  Upload
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm>
          <Card>
            <Card.Body className="upload-pitch">
              <Card.Title>Upload video title</Card.Title>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  className="upload-pitch-icon"
                  style={{ borderRadius: "50%" }}
                >
                  <i
                    className="fas fa-video"
                    style={{ fontSize: "3rem", padding: 20, color: "black" }}
                  ></i>
                </div>

                <p className="mb-3">
                  Let's get you set up! Upload your video pitch now by clicking
                  th button below. See our <a>blog post</a> to see the specific
                  guidelines for video pitches, written by our investor
                  partners.
                </p>
                <Button onClick={hasPitch ? handleAlertShow : handleShow}>
                  Upload
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
