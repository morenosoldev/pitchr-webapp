import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";

export default function Location() {
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState({
    edit: false,
    editCountry: false,
    country: user?.location,
  });
  const dispatch = useDispatch();
  const { editCountry, country } = state;

  const updateLocation = () => {
    dispatch(updateLocation(country, user?.user_id));
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
          {!state.editCountry && state.edit ? (
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
          ) : state.edit ? (
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
              onSelect={(code) => setCountry(code)}
            />
            <Button onClick={() => updateLocation()}>Save</Button>
          </>
        ) : (
          <p className="text-left">
            <Flag
              flagNationCode={
                user?.Business?.location ? user.Business.location : "DK"
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
