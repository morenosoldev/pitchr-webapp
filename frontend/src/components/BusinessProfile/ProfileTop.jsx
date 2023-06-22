import React from "react";
import { Row } from "react-bootstrap";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { uploadFile } from "../../firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";

export default function ProfileTop({ edit }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  const updatePicture = async (file) => {
    const image = await uploadFile(file);
    dispatch(userActions.updateProfilePicture(image, user?.user_id));
  };

  return (
    <Row>
      <div
        className="mb-2"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ position: "relative" }}>
          <img className="rounded-circle avatar-50" src={user?.profile_pic} />

          {edit ? (
            <label htmlFor="file-upload" className="custom-file-upload">
              <div className="add-picture-ab">
                <AiOutlineCamera color="white" />
              </div>
            </label>
          ) : null}

          <input
            id="file-upload"
            hidden
            type="file"
            onChange={(e) => updatePicture(e.target.files[0])}
          />

          <p style={{ fontWeight: "bold" }}>{user?.name}</p>
        </div>
      </div>
      <hr></hr>
    </Row>
  );
}
