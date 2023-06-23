import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsFillPersonCheckFill, BsPlusCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import img1 from "../../../assets/images/user/1.jpg";
import Card from "../../../components/Card";
import { storage } from "../../../firebase";
import { teamActions } from "../../../store/actions/team.actions";
import Equity from "../../Business/Charts/Equity";
import Member from "../../Business/Team/Member";

const Groups = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const members = useSelector((state) => state.team.members);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("John Doe");
  const [profilePic, setProfilePic] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [jobTitle, setJobTitle] = useState("Cofounder");
  const [percentage, setPercentage] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  const uploadProfilePic = async (file) => {
    const fileRef = storage.ref(`images/${file.name}`);
    await fileRef.put(file).catch((error) => {
      throw error;
    });
    const url = await fileRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };

  useEffect(() => {
    dispatch(teamActions.getMembers(id));
  }, []);

  const addMemberToTeam = () => {
    // Perform validation checks
    if (!name || !jobTitle || !jobDescription || !percentage) {
      // Check if any of the required fields are empty
      // You can display an error message or perform any other necessary actions

      return;
    }

    dispatch(
      teamActions.addMember(
        {
          name: name,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          equity: percentage,
          profilePic: profilePic,
          linkedIn: linkedIn,
        },
        user?.user_id
      )
    );
    setName("John Doe");
    setProfilePic(
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    );
    setJobDescription("");
    handleClose();
  };

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm>
              <p>
                Here can you add your employees, so people can see who are
                joining your cool startup!
              </p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Job title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Enter job title"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Job description</Form.Label>
                  <Form.Control
                    type="textarea"
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Short description of the job."
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Equity</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    max={100}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="Equity"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Linkedin (Optional)</Form.Label>
                  <Form.Control
                    type="textarea"
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder="Add a Linkedin if you want to"
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>
                    (Optional) Add a picture of the employee!
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={async (e) =>
                      setProfilePic(await uploadProfilePic(e.target.files[0]))
                    }
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col sm>
              <Card className="mb-0">
                <div className="top-bg-image" style={{ visibility: "hidden" }}>
                  <img
                    src={img1}
                    className="img-fluid w-100"
                    alt="group-bg"
                    style={{ height: 85, visibility: "hidden" }}
                  />
                </div>
                <Card.Body className=" text-center">
                  <div className="group-icon">
                    <img
                      src={profilePic}
                      alt="profile-img"
                      className="rounded-circle img-fluid avatar-120"
                    />
                  </div>
                  <div className="group-info pt-3 pb-3">
                    <h4>
                      <Link to="/dashboards/app/group-detail">{name}</Link>
                    </h4>
                    <p>{jobTitle}</p>
                  </div>
                  <div className="group-details d-inline-block pb-3">
                    <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                      <li className="pe-3 ps-3">
                        <p className="mb-0">Job description</p>
                        <h6>{jobDescription}</h6>
                      </li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => addMemberToTeam()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="d-grid gap-3 d-grid-template-1fr-19"
        style={{ overflowY: "scroll", height: "100%" }}
      >
        {members.length > 0 ? (
          <Card className="mb-0">
            <h4
              className="mb-3"
              style={{ color: "black", textAlign: "center" }}
            >
              Equity
            </h4>
            <Card.Body className=" text-center">
              <div>
                <div
                  style={{
                    width: "100%",
                    height: 265,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  <Equity data={members} />
                </div>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <Card className="mb-0">
            <h4
              className="mb-3"
              style={{ color: "#CBCFD3", textAlign: "center" }}
            >
              No employees added yet
            </h4>
            <Card.Body className=" text-center">
              <div>
                <div
                  style={{
                    width: "100%",
                    height: 265,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  <BsFillPersonCheckFill size="40" />
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
        {members?.map((member) => (
          <Member
            key={member.id}
            urlID={id}
            name={member.name}
            jobTitle={member.jobTitle}
            profilePic={member.profilePic}
            jobDescription={member.jobDescription}
            linkedIn={member.linkedIn}
            id={member.id}
          />
        ))}

        {user?.user_id == id ? (
          <Card>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsPlusCircle size="40" role="button" onClick={handleShow} />
              </div>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    </>
  );
};

export default Groups;
