import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Flag from "../Flag/Flag";
import { userActions } from "../../store/actions";

export default function Location({ edit, profile }) {
  const user = useSelector((state) => state.authentication.user);
  const [state, setState] = useState({
    editCountry: false,
    country: user?.location,
  });
  const dispatch = useDispatch();
  const { editCountry, country } = state;

  const updateLocation = () => {
    dispatch(userActions.updateLocation(country, user?.user_id));
    setState((prevState) => ({
      ...prevState,
      editCountry: false,
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
          Location{" "}
          {!state.editCountry && edit ? (
            <AiOutlineEdit
              role="button"
              className="ms-2"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  editCountry: true,
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
                  editCountry: false,
                }))
              }
            />
          ) : null}
        </h5>

        {editCountry ? (
          <>
            <ReactFlagsSelect
              searchable
              className="mb-2"
              selected={country}
              onSelect={(code) => setState({ ...state, country: code })}
            />
            <Button onClick={() => updateLocation()}>Save</Button>
          </>
        ) : (
          <p className="text-left profile-description-text">
            <Flag
              flagNationCode={
                profile
                  ? profile.location
                  : user.location
                  ? user.location
                  : "DK"
              }
              showText={true}
            />
          </p>
        )}
      </div>
      <hr></hr>
    </Row>
  );
}
