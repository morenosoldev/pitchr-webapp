import React from "react";
import { Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../firebase";
import { userActions } from "../../store/actions";

export default function TopBanner() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  const uploadImageFB = async (image) => {
    const downloadUrl = await uploadImage(image);
    dispatch(userActions.updateProfilePicture(downloadUrl, user?.user_id));
  };

  return (
    <Col sm={12}>
      <Card>
        <Card.Body className=" profile-page p-0">
          <div
            className="profile-header"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{ marginTop: "2rem" }}
              className="user-detail text-center mb-3"
            >
              <div className="profile-img">
                <img
                  src={user?.profile_pic}
                  alt="profile-img1"
                  className="avatar-130 rounded-circle img-fluid"
                />

                <label className="add-picture" for="file-input-cover">
                  <i className="upload-icon fas fa-camera" role="button"></i>
                </label>

                <input
                  style={{ display: "none" }}
                  id="file-input-cover"
                  type="file"
                  onChange={async (e) => await uploadImageFB(e.target.files[0])}
                />
              </div>

              <div className="profile-detail">
                <h3>{user?.name}</h3>
              </div>
            </div>
            <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative"></div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
