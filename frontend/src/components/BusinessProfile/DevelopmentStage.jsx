import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import {
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlineAreaChart,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";

export default function DevelopmentStage({ edit, profile }) {
  const user = useSelector((state) => state.authentication.user);
  const [state, setState] = useState({
    editStage: false,
    stage: user?.stage,
  });
  const dispatch = useDispatch();
  const { editStage, stage } = state;

  const setEditStage = (value) => {
    setState((prevState) => ({
      ...prevState,
      editStage: value,
    }));
  };

  const updateDevelopmentStage = () => {
    dispatch(userActions.updateDevelopmentStage(stage, user?.user_id));
    setState((prevState) => ({
      ...prevState,
      editStage: false,
    }));
  };

  return (
    <Row>
      <div className="text-left mb-3 mt-3">
        <h5
          style={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
          }}
        >
          Development stage{" "}
          {!editStage && edit ? (
            <AiOutlineEdit
              role="button"
              className="ms-2"
              onClick={() => setEditStage(true)}
            />
          ) : edit ? (
            <AiOutlineClose
              role="button"
              className="ms-2"
              onClick={() => setEditStage(false)}
            />
          ) : null}
        </h5>

        {editStage ? (
          <>
            <Form.Select
              className="mb-2"
              aria-label="Development stage"
              value={stage}
              onChange={(e) => {
                setState((prevState) => ({
                  ...prevState,
                  stage: e.target.value,
                }));
              }}
            >
              <option>Stage</option>
              <option value="Seed">Seed</option>
              <option value="Startup">Startup</option>
              <option value="Scale up">Scale up</option>
            </Form.Select>
            <Button onClick={() => updateDevelopmentStage()}>Save</Button>
          </>
        ) : (
          <p className="mt-2 d-flex profile-description-text align-items-center text-left">
            {" "}
            <AiOutlineAreaChart size={30} style={{ display: "inline" }} />{" "}
            {profile
              ? profile.development_stage
              : user.development_stage
              ? user.development_stage
              : "No development stage set yet"}{" "}
          </p>
        )}
      </div>
      <hr></hr>
    </Row>
  );
}
