import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { Badge } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

export default function Competences({ edit, profile }) {
  const user = useSelector((state) => state.authentication.user);
  const [state, setState] = useState({
    editCompetences: false,
    competences: profile ? profile.competences : user?.competences || [],
    competence: "",
  });
  const dispatch = useDispatch();
  const { editCompetences, competences, competence } = state;

  const addCompetence = () => {
    setState((prevState) => ({
      ...prevState,
      competences: [...prevState.competences, { name: prevState.competence }],
      competence: "",
    }));
  };

  const removeCompetence = (index) => {
    setState((prevState) => ({
      ...prevState,
      competences: prevState.competences.filter((_, i) => i !== index),
    }));
  };

  const updateCompetences = () => {
    dispatch(userActions.updateCompetences(competences, user?.user_id));
    setState((prevState) => ({
      ...prevState,
      editCompetences: false,
    }));
  };

  return (
    <Row>
      <span style={{ fontWeight: "bold", textAlign: "left" }}>
        Competences{" "}
        {!editCompetences && edit ? (
          <AiOutlineEdit
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                editCompetences: true,
              }))
            }
            role="button"
            className="ms-2"
          />
        ) : edit ? (
          <AiOutlineClose
            role="button"
            className="ms-2"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                editCompetences: false,
              }))
            }
          />
        ) : null}
      </span>
      {editCompetences ? (
        <>
          <ul className="text-left suggestions-lists m-0 p-0">
            <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Add competence"
                value={competence}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    competence: e.target.value,
                  }))
                }
              />
              <Button onClick={addCompetence}>Add</Button>
            </Form.Group>
            {competences.map((competence, index) => (
              <Badge key={index}>
                <p style={{ display: "inline" }}>{competence.name}</p>
                <BsTrash
                  role="button"
                  className="ms-2"
                  onClick={() => removeCompetence(index)}
                />
              </Badge>
            ))}
          </ul>

          <Button className="mt-3" onClick={updateCompetences}>
            Save
          </Button>
        </>
      ) : (
        <>
          {profile ? (
            <ul className="text-left suggestions-lists m-0 p-0">
              {profile.competences.map((competence, index) => (
                <Badge key={index}>
                  <p>{competence.name}</p>
                </Badge>
              ))}
            </ul>
          ) : user?.competences ? (
            <ul className="text-left suggestions-lists m-0 p-0">
              {user.competences.map((competence, index) => (
                <Badge key={index}>
                  <p>{competence.name}</p>
                </Badge>
              ))}
            </ul>
          ) : (
            <p>No competences added</p>
          )}
        </>
      )}
    </Row>
  );
}
