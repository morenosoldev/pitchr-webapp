import React from "react";
import { Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userActions } from "../../store/actions";
import { useDispatch } from "react-redux";
import { storage } from "../../firebase";

export default function TopBanner() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  const uploadImage = async (image) => {
    const imageRef = storage.ref(`images/${image.name}`);
    await imageRef.put(image).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        // file upload failed
        console.log(error);
      },
      () => {
        // file upload completed
        storage
          .ref(`images/${image.name}`)
          .getDownloadURL()
          .then(
            async (url) => {
              console.log(url);
              dispatch(userActions.updateProfilePicture(url, user?.user_id));
            },
            (error) => {
              // failed to get download URL
              console.log(error);
            }
          );
      }
    );
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
                  <i class="upload-icon fas fa-camera" role="button"></i>
                </label>

                <input
                  style={{ display: "none" }}
                  id="file-input-cover"
                  type="file"
                  onChange={async (e) => await uploadImage(e.target.files[0])}
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
