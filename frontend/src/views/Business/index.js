import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions";
import { teamActions } from "../../store/actions/team.actions";
import FilesService from "../../store/services/files.service";
import ViewsService from "../../store/services/views.service";
import API from "../../util/AxiosConfig";
import { history } from "../../util/history";
import MainModal from "./PitchUpload/MainModal";

const BusinessIndex = () => {
  const dispatch = useDispatch();
  const [profileViewChart, setProfileViewChart] = useState({
    labels: [
      "Monday",
      "Tuesday",
      "Wednsday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Profile Views",
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgb(255, 255, 255)",
        tension: 0.3,
      },
    ],
  });
  const [pitchViewChart, setPitchViewChart] = useState({
    labels: [
      "Monday",
      "Tuesday",
      "Wednsday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Saved pitches",
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgb(255, 255, 255)",
        tension: 0.3,
      },
    ],
  });
  const user = useSelector((state) => state.authentication.user);
  const [show, setShow] = useState(false);
  const [calendly, setCalendly] = useState("");
  const members = useSelector((state) => state.team.members);
  const [hasPitch, setHasPitch] = useState(false);
  const [files, setFiles] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadClose = () => setShowUpload(false);
  const handleUploadShow = () => setShowUpload(true);
  const [progress, setProgress] = useState(0);

  const submitCalendly = async () => {
    handleClose();
    dispatch(await userActions.updateCalendly(calendly, user.user_id));
  };

  useEffect(async () => {
    dispatch(await teamActions.getMembers(user?.user_id));
    const files = await FilesService.fetchFiles(user?.user_id);
    setFiles(files);

    const res = await API.get(`/hasPitch/${user.user_id}`);
    setHasPitch(res.data);

    const fetchProfileViews = async () => {
      const data = await ViewsService.getProfileViews(user.user_id);
      setProfileViewChart({
        labels: data?.map(
          (view) =>
            view.updatedAt.split(" ")[1] + " " + view.updatedAt.split(" ")[2]
        ),
        datasets: [
          {
            label: "Profile Views",
            data: data?.map((view) => view.count),
            fill: false,
            borderColor: "rgb(245, 151, 27)",
            tension: 0.3,
          },
        ],
      });
    };
    const fetchPitchViews = async () => {
      const data = await ViewsService.getPitchViews(user.user_id);
      setPitchViewChart({
        labels: data?.map(
          (view) =>
            view.updatedAt.split(" ")[1] + " " + view.updatedAt.split(" ")[2]
        ),
        datasets: [
          {
            label: "Pitch views",
            data: data?.map((view) => Math.round(view.count)),
            fill: false,
            borderColor: "rgb(245, 151, 27)",
            tension: 0.3,
          },
        ],
      });
    };

    setProgress(0);

    if (user?.description?.length > 0) {
      setProgress((progress) => progress + 25);
    }

    if (files?.length > 2) {
      setProgress((progress) => progress + 25);
    }

    if (members?.length > 0) {
      setProgress((progress) => progress + 25);
    }

    if (res.data) {
      setProgress((progress) => progress + 25);
    }

    fetchProfileViews();
    fetchPitchViews();
  }, []);

  const savedPitchesOptions = {
    scales: {
      x: {
        grid: {
          color: "black",
        },
      },
      y: {
        grid: {
          color: "black",
        },
      },
    },
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: "black",
        },
      },
      y: {
        grid: {
          color: "black",
        },
      },
    },
  };

  return (
    <Container fluid style={{ padding: 25 }}>
      {user.calendly ? null : (
        <Alert variant={"danger"}>
          Hey you haven't added your calendly account yet.{" "}
          <Alert.Link href="#" onClick={handleShow}>
            Click here
          </Alert.Link>{" "}
          to add it.
        </Alert>
      )}

      <Modal size="xl" show={showUpload} onHide={handleUploadClose}>
        <MainModal />
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Calendly integration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Insert your link from Calendly down below.</h4>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Calendly url</Form.Label>
              <Form.Control
                onChange={(e) => setCalendly(e.target.value)}
                type="input"
                placeholder="Enter calendly url"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => submitCalendly()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Card>
        <Card.Body>
          <Row>
            <Col sm>
              <h3>Complete your fundraising profile</h3>
              <ProgressBar
                style={{ marginTop: 15 }}
                now={progress}
                label={`${progress}%`}
              />
            </Col>

            <Col style={{ display: "flex" }} sm>
              <Row xs={1} md={2}>
                <Col>
                  <Form.Check
                    inline
                    onClick={() =>
                      history.push(
                        `/business/app/company/${user?.user_id}/about-us`
                      )
                    }
                    label="Fill out profile description"
                    name="group1"
                    checked={user?.description?.length > 0 ? true : false}
                    disabled={user?.description?.length > 0 ? true : false}
                    style={{ paddingLeft: "8rem" }}
                  />
                </Col>

                <Col>
                  <Form.Check
                    inline
                    label="Upload deck and video pitch"
                    name="group1"
                    checked={hasPitch ? hasPitch : false}
                    disabled={hasPitch ? hasPitch : false}
                    onClick={() => handleUploadShow()}
                  />
                </Col>

                <Col>
                  <Form.Check
                    inline
                    label="Add team members"
                    name="group1"
                    checked={members?.length > 0 ? true : false}
                    disabled={members?.length > 0 ? true : false}
                    onClick={() =>
                      history.push(
                        `/business/app/company/${user?.user_id}/team`
                      )
                    }
                    style={{ paddingLeft: "8rem" }}
                  />
                </Col>

                <Col>
                  <Form.Check
                    inline
                    label="Upload due diligence pack"
                    name="group1"
                    checked={files?.length > 2 ? true : false}
                    disabled={files?.length > 2 ? true : false}
                    onClick={() =>
                      history.push(
                        `/business/app/company/${user?.user_id}/files`
                      )
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h2> Welcome back, {user?.name}</h2>
          <h3 style={{ marginBottom: 20 }}>
            Here is your daily investor activity overview
          </h3>
          <Row>
            <Col sm>
              <Line data={profileViewChart} options={options} />
            </Col>

            <Col sm>
              <Line data={pitchViewChart} options={savedPitchesOptions} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BusinessIndex;
