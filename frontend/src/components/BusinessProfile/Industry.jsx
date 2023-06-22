import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/user.actions";
import { BsCpu } from "react-icons/bs";

export default function Industry() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    edit: false,
    editIndustry: false,
    industry: user?.industry,
  });

  const updateIndustry = () => {
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
          {!state.editIndustry && state.edit ? (
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
          ) : state.edit ? (
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
              <option value="tech">Technology/Software</option>
              <option value="ecom">E-commerce</option>
              <option value="healthtech">Healthtech</option>
              <option value="fintech">Fintech</option>
              <option value="saas">SaaS (Software as a Service)</option>
              <option value="ai">Artificial Intelligence (AI)</option>
              <option value="cleanenergy">Clean Energy/Sustainability</option>
              <option value="biotech">Biotech</option>
              <option value="edtech">Education Technology (EdTech)</option>
              <option value="foodbev">Food and Beverage</option>
            </Form.Select>

            <Button onClick={() => updateIndustry()}>Save</Button>
          </>
        ) : (
          <p className="text-left">
            {" "}
            <BsCpu style={{ display: "inline", marginRight: "5px" }} />
            {user?.Business?.industry
              ? user?.Business?.industry
              : "No industry set yet"}
          </p>
        )}
      </div>
      <hr></hr>
    </Row>
  );
}
