import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";

export default function InvestorAsk({ edit }) {
  const user = useSelector((state) => state.authentication.user);
  const [state, setState] = useState({
    editCapital: false,
    capital: user?.capital,
    editPercentage: false,
    percentage: user?.percentage,
  });
  const dispatch = useDispatch();
  const { editCapital, capital, percentage } = state;

  const updateCapital = () => {
    dispatch(userActions.updateCapital(capital, user?.user_id));
    setState((prevState) => ({
      ...prevState,
      editCapital: false,
    }));
  };

  return (
    <Row className="text-left mt-2 mb-2">
      <span style={{ fontWeight: "bold", textAlign: "left" }}>
        Capital{" "}
        {!editCapital && edit ? (
          <AiOutlineEdit
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                editCapital: true,
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
                editCapital: false,
              }))
            }
          />
        ) : null}
      </span>
      <div>
        {editCapital ? (
          <>
            <Form.Select
              value={capital}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  capital: e.target.value,
                }))
              }
              aria-label="Capital"
            >
              <option>Wanted capital</option>
              <option value="500.000 - 1M">500.000 - 1M</option>
              <option value="1M - 2M">1M - 2M</option>
              <option value="2M - 5M">2M - 5M</option>
            </Form.Select>

            <Form.Group className=" mt-3" controlId="exampleForm.ControlInput1">
              <span
                className="mb-2"
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  display: "flex",
                }}
              >
                Percentage
              </span>
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Percentage"
                value={percentage}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    percentage: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <Button onClick={updateCapital}>Save</Button>
          </>
        ) : (
          <p className="text-left">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                marginRight: 3,
              }}
            >
              $
            </span>
            {user.goal} for {user.percentage}%
          </p>
        )}
      </div>
    </Row>
  );
}
