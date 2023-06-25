import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fileActions } from "../../../store/actions/file.actions";

export default function FileItem({
  fileName,
  fileType,
  fileSize,
  createdAt,
  downloadLink,
  id,
  userID,
  urlID,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const deleteFile = () => {
    dispatch(fileActions.deleteFile(id));
    handleClose();
  };

  return (
    <tr>
      <td>
        <div className=" text-center">
          <input type="checkbox" className="form-check-input" />
        </div>
      </td>

      <td>{fileName}</td>

      <td>{fileType}</td>
      <td>{fileSize} mb</td>

      <td>
        <div
          className="flex align-items-center list-user-action"
          style={{ display: "flex" }}
        >
          <OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <i className="ri-download-line"></i>
            </a>
          </OverlayTrigger>

          {userID == urlID ? (
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <Link to="#" onClick={handleShow}>
                <i className="ri-delete-bin-line"></i>
              </Link>
            </OverlayTrigger>
          ) : null}
        </div>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this file? You cannot recover the file
          after this action.{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            style={{
              backgroundColor: "red",
              color: "white",
              borderColor: "transparent",
            }}
            onClick={deleteFile}
          >
            Delete file
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}
