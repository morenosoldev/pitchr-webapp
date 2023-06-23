import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import img1 from "../../../assets/images/user/1.jpg";
import { storage } from "../../../firebase";
import { teamActions } from "../../../store/actions/team.actions";
import Equity from "../../Business/Charts/Equity";
import Member from "../../Business/Team/Member";
import Select, { components } from "react-select";
import "./Groups.scss";

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

const Groups = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const members = useSelector((state) => state.team.members);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchName, setSearchName] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

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

  let options = [];

  if (members && members.length > 0) {
    const jobTitles = members.map((member) => member.jobTitle);
    const uniqueJobTitles = [...new Set(jobTitles)];
    options = uniqueJobTitles
      .filter((jobTitle) => jobTitle !== null)
      .map((jobTitle) => ({ value: jobTitle, label: jobTitle }));
  }

  // Filter employees based on searchName and selectedJobTitle
  const filteredEmployees = members.filter((employee) => {
    const nameMatch = employee.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const jobTitleMatch = selectedJobTitle
      ? employee.jobTitle === selectedJobTitle
      : true;
    return nameMatch && jobTitleMatch;
  });

  // Handler for search input change
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  // Handler for dropdown selection change
  const handleJobTitleChange = (obj) => {
    setSelectedJobTitle(obj.value);
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

      <div className="row p-5">
        <div>
          <h3 className="mb-4 fw-bold">
            Team members <span className="members-size">{members.length}</span>
          </h3>
        </div>

        <Row className="mt-3 search-bar-members d-flex">
          <Col sm={6}>
            <Row>
              <Col sm={8}>
                <div className="d-flex align-items-center position-relative me-3">
                  <Form.Control
                    size="md"
                    className="search-input"
                    type="text"
                    value={searchName}
                    onChange={handleSearchNameChange}
                    placeholder="Search for a employee"
                  />

                  <div className="search-icon">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </Col>

              <Col sm={4}>
                <div className="members-position-dropdown">
                  <Select
                    placeholder={"Position"}
                    value={selectedJobTitle}
                    onChange={handleJobTitleChange}
                    styles={{
                      placeholder: (base) => ({
                        ...base,
                        fontSize: "1em",
                        fontWeight: 400,
                      }),
                    }}
                    options={options}
                  />
                </div>
              </Col>
            </Row>
          </Col>

          <Col sm={6} className="d-flex justify-content-end">
            {user?.user_id == id ? (
              <Button variant="primary" onClick={handleShow}>
                Add a new team member
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>

      <div
        className="d-grid p-5 gap-3 d-grid-template-1fr-19"
        style={{ overflowY: "scroll" }}
      >
        {members.length > 0 ? (
          <Card className="m-0">
            <Card.Body>
              <Card.Title>Equity</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                How ownership is distributed
              </Card.Subtitle>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: "100%", height: 265 }}
              >
                <Equity data={members} />
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
        {filteredEmployees?.map((member) => (
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
      </div>
    </>
  );
};

export default Groups;
