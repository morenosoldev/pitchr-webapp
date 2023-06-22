import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function InvestorAsk() {
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState({
    edit: false,
    editCapital: false,
    capital: user?.capital,
    editPercentage: false,
    percentage: user?.percentage,
    editInvestmentType: false,
    investmentType: user?.investmentType,
    editInvestmentAmount: false,
    investmentAmount: user?.investmentAmount,
    editInvestmentTime: false,
    investmentTime: user?.investmentTime,
    editInvestmentReturn: false,
  });
  const dispatch = useDispatch();
  const { editCapital, capital } = state;

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
        {!editCapital && state.edit ? (
          <AiOutlineEdit
            onClick={() => setEditCapital(true)}
            role="button"
            className="ms-2"
          />
        ) : state.edit ? (
          <AiOutlineClose
            role="button"
            className="ms-2"
            onClick={() => setEditCapital(false)}
          />
        ) : null}
      </span>
      <div>
        {editCapital ? (
          <>
            <Form.Select
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              aria-label="Capital"
            >
              <option>Wanted capital</option>
              <option
                value="                                    500.000 - 1M
"
              >
                500.000 - 1M
              </option>
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
                onChange={(e) => setPercentage(e.target.value)}
              />
            </Form.Group>

            <Button onClick={() => updateGoal()}>Save</Button>
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
            {user?.Business?.goal} for {user?.Business?.percentage}%
          </p>
        )}
      </div>
    </Row>
  );
}
