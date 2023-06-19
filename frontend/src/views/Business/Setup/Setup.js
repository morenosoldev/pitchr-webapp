import React, { useEffect, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import {
  AiOutlineCheckCircle,
  AiOutlineFileDone,
  AiOutlineTeam,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/scss/custom/components/setup/setup.scss";
import { Link, useLocation } from "react-router-dom";
import { teamActions } from "../../../store/actions/team.actions";
import { fileActions } from "../../../store/actions/file.actions";
import filesReducer from "../../../store/reducers/files.reducer";
import FilesService from "../../../store/services/files.service";
import TeamService from "../../../store/services/team.service";

export default function Setup() {
  const [progress, setProgress] = useState(0);
  const user = useSelector((state) => state.authentication.user);
  const [description, setDescription] = useState(false);
  const [pitch, setPitch] = useState(false);
  const [files, setFiles] = useState([]);
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const newFiles = await FilesService.fetchFiles(user?.user_id);
      const newMembers = await TeamService.getMembers(user?.user_id);

      setProgress(0);

      if (user?.description?.length > 0) {
        setProgress((progress) => progress + 25);
        setDescription(true);
      }

      if (newFiles?.length > 2) {
        setFiles(newFiles);
        setProgress((progress) => progress + 25);
      }

      if (newMembers?.length > 0) {
        setMembers(newMembers);
        setProgress((progress) => progress + 25);
      }
    }
    fetchData();
  }, []);

  return (
    <Card style={{ height: "97%" }}>
      <Card.Body>
        <div>
          <h4 className="setup-title mb-3">
            Complete your profile ({progress / 25}/4)
          </h4>
          <ProgressBar now={progress} />
          <div className="mt-3">
            <div className="setup-card-container">
              <Card.Body>
                <div className="setup-card">
                  <div className="setup-icon">
                    {description ? (
                      <AiOutlineCheckCircle size={"26"} />
                    ) : (
                      <BsPencil size={"26"} />
                    )}
                  </div>

                  <div className="setup-text">
                    <Link
                      to={`/business/app/company/${user?.user_id}/deck`}
                      style={
                        description
                          ? { pointerEvents: "none", color: "darkgray" }
                          : null
                      }
                      className="setup-card-title"
                    >
                      Fill out profile description
                    </Link>
                    <span className="setup-card-span">
                      Will make your startup more recognizable, and trustable.
                      This is a must!
                    </span>
                  </div>
                </div>
              </Card.Body>
            </div>

            <div className="setup-card-container">
              <Card.Body>
                <div className="setup-card">
                  <div className="setup-icon">
                    {members.length > 0 ? (
                      <AiOutlineCheckCircle size={"26"} />
                    ) : (
                      <AiOutlineTeam size={"26"} />
                    )}
                  </div>

                  <div className="setup-text">
                    <Link
                      to={`/business/app/company/${user?.user_id}/team`}
                      style={
                        members.length > 0
                          ? { pointerEvents: "none", color: "darkgray" }
                          : null
                      }
                      className="setup-card-title"
                    >
                      Add team members
                    </Link>
                    <span className="setup-card-span">
                      Add all the employees in your company, so that potentiel
                      investors can see your dream team!
                    </span>
                  </div>
                </div>
              </Card.Body>
            </div>

            <div className="setup-card-container">
              <Card.Body>
                <div className="setup-card">
                  <div className="setup-icon">
                    {pitch ? (
                      <AiOutlineCheckCircle size={"26"} />
                    ) : (
                      <AiOutlineVideoCamera size={"26"} />
                    )}
                  </div>

                  <div className="setup-text">
                    <Link
                      to="/business/app/upload"
                      style={
                        pitch
                          ? { pointerEvents: "none", color: "darkgray" }
                          : null
                      }
                      className="setup-card-title"
                    >
                      Upload deck and video pitch
                    </Link>
                    <span className="setup-card-span">
                      This is the golden juice! Make a great deck and video
                      pitch and the money will roll in!
                    </span>
                  </div>
                </div>
              </Card.Body>
            </div>

            <div className="setup-card-container">
              <Card.Body>
                <div className="setup-card">
                  <div className="setup-icon">
                    {files.length > 0 ? (
                      <AiOutlineCheckCircle size={"26"} />
                    ) : (
                      <AiOutlineFileDone size={"26"} />
                    )}
                  </div>

                  <div className="setup-text">
                    <Link
                      to={`/business/app/company/${user?.user_id}/files`}
                      style={
                        files.length > 0
                          ? { pointerEvents: "none", color: "darkgray" }
                          : null
                      }
                      className="setup-card-title"
                    >
                      Upload due diligence pack
                    </Link>
                    <span className="setup-card-span">
                      Upload all relevant financial documents, contracts, and
                      more easily.
                    </span>
                  </div>
                </div>
              </Card.Body>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
