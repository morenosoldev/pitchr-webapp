import React from "react";
import {
  Tab,
  Form,
  InputGroup,
  Badge,
  FormControl,
  Button,
} from "react-bootstrap";
import API from "../../util/AxiosConfig";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Competences({ writeCompetences, setWriteCompetences }) {
  const user = useSelector((state) => state.authentication.user);
  const [competences, setCompetences] = useState([]);
  const [competence, setCompetence] = useState("");

  const addCompetence = () => {
    if (competence.length > 0) {
      setCompetences((oldArray) => [...oldArray, { name: competence }]);
    }
  };

  const removeCompetences = (key) => {
    setCompetences(competences.filter((item, index) => index !== key));
  };

  const submitCompetences = async (e) => {
    e.preventDefault();
    await API.put(`/updateInvestorCompetences/${user.user_id}`, {
      competences: competences,
    })
      .then((res) => {
        setWriteCompetences(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Tab.Content>
      <Tab.Pane eventKey="p1">
        <div className="card-body p-0">
          {writeCompetences ? (
            <div>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>What competences are you looking for?</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      onChange={(e) => setCompetence(e.target.value)}
                    />
                    <Button
                      onClick={() => addCompetence()}
                      variant="outline-secondary"
                      id="button-addon2"
                    >
                      +
                    </Button>
                  </InputGroup>

                  {competences ? (
                    <ul className="suggestions-lists m-0 p-0">
                      {competences?.map((market, key) => (
                        <>
                          <Badge
                            style={{
                              padding: "8px",
                            }}
                            pill
                            bg="primary"
                          >
                            {market.name}
                            <i
                              role="button"
                              className="ms-2 fas fa-trash-alt"
                              onClick={() => removeCompetences(key)}
                            ></i>
                          </Badge>{" "}
                        </>
                      ))}
                    </ul>
                  ) : null}
                </Form.Group>
                <Button onClick={(e) => submitCompetences(e)}>Submit</Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => setWriteCompetences(false)}
                >
                  Cancel
                </Button>
              </Form>
            </div>
          ) : (
            <>
              {competences.length > 0 ? (
                <div className="markets">
                  {competences?.map((market, key) => (
                    <>
                      <Badge style={{ padding: "8px" }} pill bg="primary">
                        {market.name}
                      </Badge>{" "}
                    </>
                  ))}
                </div>
              ) : (
                <ul className="suggestions-lists m-0 p-0">
                  <li className="d-flex mb-4 align-items-center">
                    <div className="user-img img-fluid">
                      <i
                        className="ri-add-fill"
                        onClick={() => setWriteCompetences(true)}
                        role="button"
                      ></i>
                    </div>
                    <div className="ms-3">
                      <h6>Add competences</h6>
                    </div>
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      </Tab.Pane>
    </Tab.Content>
  );
}
