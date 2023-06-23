import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { MdBusiness } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions";

export default function Industry({ edit }) {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [state, setState] = useState({
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
          <p className="text-left profile-description-text">
            {" "}
            <MdBusiness
              size={30}
              style={{ display: "inline", marginRight: "5px" }}
            />
            {user.industry ? user.industry : "No industry set yet"}
          </p>
        )}
      </div>
      <hr></hr>
    </Row>
  );
}
