import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { BsCpu } from "react-icons/bs";

export default function Industry({ edit }) {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    editIndustry: false,
    industry: user?.industry,
  });

  const updateIndustry = () => {
    console.log("updateIndustry", state.industry);
    dispatch(userActions.updateIndustry(state.industry, user?.user_id));
    setState((prevState) => ({
      ...prevState,
      editIndustry: false,
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
          Industry{" "}
          {!state.editIndustry && edit ? (
            <AiOutlineEdit
              role="button"
              className="ms-2"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  editIndustry: true,
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
                  editIndustry: false,
                }))
              }
            />
          ) : null}
        </h5>
        {state.editIndustry ? (
          <>
            <Form.Select
              className="mb-2"
              aria-label="Industry"
              value={state.industry}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  industry: e.target.value,
                }))
              }
            >
              <option value="Technology/Software">Technology/Software</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Healthtech">Healthtech</option>
              <option value="Fintech">Fintech</option>
              <option value="SaaS (Software as a Service)">
                SaaS (Software as a Service)
              </option>
              <option value="Artificial Intelligence (AI)">
                Artificial Intelligence (AI)
              </option>
              <option value="Clean Energy/Sustainability">
                Clean Energy/Sustainability
              </option>
              <option value="Biotech">Biotech</option>
              <option value="Education Technology (EdTech)">
                Education Technology (EdTech)
              </option>
              <option value="Food and Beverage">Food and Beverage</option>
            </Form.Select>

            <Button onClick={() => updateIndustry()}>Save</Button>
          </>
        ) : (
          <p className="text-left">
            {" "}
            <BsCpu style={{ display: "inline", marginRight: "5px" }} />
            {user.industry ? user.industry : "No industry set yet"}
          </p>
        )}
      </div>
      <hr></hr>
    </Row>
  );
}
