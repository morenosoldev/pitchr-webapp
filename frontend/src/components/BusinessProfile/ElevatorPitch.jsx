import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";

export default function ElevatorPitch({ edit }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    editElevatorPitch: false,
    description: user?.description,
  });

  const updateDescription = () => {
    dispatch(userActions.updateDescription(state.description, user?.user_id));
    setState((prevState) => ({
      ...prevState,
      editElevatorPitch: false,
    }));
  };

  return (
    <Row>
      <div className="text-left mb-3 mt-3">
        <h5 className="d-flex align-items-center text-left">
          Elevator pitch{" "}
          {!state.editElevatorPitch && edit ? (
            <AiOutlineEdit
              role="button"
              className="ms-2"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  editElevatorPitch: true,
                }))
              }
            />
          ) : edit ? (
            <AiOutlineClose
              role="button"
              className="ms-2"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  editElevatorPitch: false,
                }))
              }
            />
          ) : null}{" "}
        </h5>
        {state.editElevatorPitch ? (
          <>
            <Form.Control
              as="textarea"
              className="mb-2"
              rows={3}
              value={state.description}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
            />
            <Button onClick={() => updateDescription()}>Save</Button>
          </>
        ) : (
          <div>
            {user?.description ? (
              <p
                style={{
                  textAlign: "left",
                  fontSize: "0.6rem",
                }}
              >
                {user?.description}
              </p>
            ) : (
              <p className="text-left">No elevator pitch</p>
            )}
          </div>
        )}
      </div>
      <hr></hr>
    </Row>
  );
}
