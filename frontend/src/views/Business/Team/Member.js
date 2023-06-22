import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../../assets/images/page-img/profile-bg1.jpg";
import { teamActions } from "../../../store/actions/team.actions";

export default function Member({
  urlID,
  linkedIn,
  name,
  jobTitle,
  jobDescription,
  profilePic,
  id,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const user = useSelector((state) => state.authentication.user);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const deleteMember = (id) => {
    dispatch(teamActions.deleteMember(id));
    handleClose();
  };

  return (
    <Card className="mb-0">
      <div className="top-bg-image" style={{ visibility: "hidden" }}>
        <img src={img1} className="img-fluid w-100" alt="group-bg" />
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
          <h4>{name}</h4>
          <p>{jobTitle}</p>
        </div>
        <div
          className="group-details d-inline-block pb-3"
          style={{ minHeight: 110 }}
        >
          <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
            <li className="pe-3 ps-3">
              <p className="mb-0">Job description</p>
              <h6>{jobDescription}</h6>
            </li>
          </ul>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete team member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You are now deleting a team member, are you sure you want to
              delete this member?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              style={{
                marginTop: 10,
                backgroundColor: "red",
                borderColor: "red",
              }}
              onClick={() => deleteMember(id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="member-btn">
          {linkedIn.length > 0 ? (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary d-block w-100"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Visit LinkedIn <i className="fab fa-linkedin-in"></i>
            </a>
          ) : null}

          {urlID == user?.user_id ? (
            <button
              type="submit"
              style={{
                marginTop: 10,
                backgroundColor: "red",
                borderColor: "red",
              }}
              onClick={handleShow}
              className="btn btn-primary d-block w-100"
            >
              {" "}
              Delete member
            </button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
}
