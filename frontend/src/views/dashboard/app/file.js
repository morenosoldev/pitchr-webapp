import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
  ToggleButton,
} from "react-bootstrap";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCoin, BsGraphUp, BsShare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import { storage } from "../../../firebase";
import { fileActions } from "../../../store/actions/file.actions";
import API from "../../../util/AxiosConfig";
import BusinessPlan from "../../Business/Files/BusinessPlan";
import CapTable from "../../Business/Files/CapTable";
import Financials from "../../Business/Files/Financials";
import Reports from "../../Business/Files/Reports";

const File = () => {
  const [search, setSearch] = useState("");
  const [radioValue, setRadioValue] = useState("1");
  const [hasAccess, setHasAccess] = useState(false);
  const [hasAlreadyRequested, setHasAlreadyRequested] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showFileRequest, setShowFileRequest] = useState(false);
  const handleRequestClose = () => setShowFileRequest(false);

  const { id } = useParams();
  const user = useSelector((user) => user.authentication.user);

  useEffect(async () => {
    dispatch(fileActions.fetchFiles(id));
    const res = await API.post("/hasFileAccess", {
      id: user.user_id,
      user_id: id,
    });
    setHasAccess(res.data.access == 1 ? true : false);
    setHasAlreadyRequested(res.data.access == 0 ? true : false);
  }, []);

  const uploadFileFB = async (file) => {
    const fileRef = storage.ref(`images/${file.name}`);
    await fileRef.put(file).catch((error) => {
      throw error;
    });
    const url = await fileRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };

  const radios = [
    { name: "Financial", value: "1" },
    { name: "Cap Table", value: "2" },
    { name: "Reports", value: "3" },
    { name: "Business plan", value: "4" },
  ];

  const uploadFile = async (e) => {
    const file = e.target.files[0];

    const newFile = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      type: radios[radioValue - 1].name,
      fileUrl: await uploadFileFB(file),
    };

    dispatch(fileActions.uploadFile(newFile, user.user_id));
    handleClose();
  };

  const sendRequest = async () => {
    const res = await API.post("/requestFileAccess", {
      id: user?.user_id,
      user_id: id,
    });
    setHasAlreadyRequested(true);
    handleRequestClose();
  };

  return (
    <>
      <Row>
        <Col sm="12">
          {user?.user_id == id || hasAccess ? (
            <div className="table-responsive">
              <Row>
                <Col sm>
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="second"
                  >
                    <div className="user-tabing">
                      <Nav
                        as="ul"
                        variant="tabs"
                        className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0 mb-3"
                      >
                        <Nav.Item as="li" className=" col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#financials-files"
                            eventKey="second"
                            role="button"
                            className="text-center p-3"
                          >
                            <BsCoin
                              style={{ display: "inline", marginRight: 5 }}
                            />
                            Financials
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#cap-table"
                            eventKey="third"
                            role="button"
                            className="text-center p-3"
                          >
                            <BsShare
                              style={{ display: "inline", marginRight: 5 }}
                            />
                            Cap table
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#reports-files"
                            eventKey="fourth"
                            role="button"
                            className="text-center p-3"
                          >
                            <BsGraphUp
                              style={{ display: "inline", marginRight: 5 }}
                            />
                            Reports
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#business-plan-files"
                            eventKey="fifth"
                            role="button"
                            className="text-center p-3"
                          >
                            <AiOutlineCalendar
                              style={{ display: "inline", marginRight: 5 }}
                            />
                            Business plan
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>

                      {user.user_id == id || user.id == id ? (
                        <Row
                          className="justify-content-between d-flex"
                          style={{ padding: "15px" }}
                        >
                          <Col sm="12" md="6">
                            <div
                              id="user_list_datatable_info"
                              className="dataTables_filter"
                            >
                              <form className="me-3 position-relative">
                                <div className="form-group mb-0">
                                  <input
                                    type="search"
                                    className="form-control"
                                    id="exampleInputSearch"
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                  />
                                </div>
                              </form>
                            </div>
                          </Col>
                          <Col sm="12" md="6">
                            <div className="user-list-files d-flex justify-content-end">
                              <Link
                                onClick={handleShow}
                                to="#"
                                className="chat-icon-phone btn bg-soft-primary"
                              >
                                Upload
                              </Link>
                            </div>
                          </Col>

                          <Modal show={show}>
                            <Modal.Header closeButton>
                              <Modal.Title>Upload your file</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <h4>What document are you uploading?</h4>
                              <ButtonGroup className="mb-2">
                                {radios.map((radio, idx) => (
                                  <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => {
                                      setRadioValue(e.currentTarget.value);
                                      handleShow();
                                    }}
                                  >
                                    {radio.name}
                                  </ToggleButton>
                                ))}
                              </ButtonGroup>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginBottom: 15,
                                }}
                              >
                                <i
                                  style={{
                                    fontSize: "4rem",
                                    padding: 40,
                                    borderRadius: "50%",
                                    backgroundColor: "#F9F9F9",
                                  }}
                                  class="circle-upload fas fa-upload"
                                ></i>
                                <p style={{ marginTop: 25 }}>
                                  Choose which files you want to upload
                                </p>
                                <p>
                                  Your files are private until you publish them.
                                </p>
                                <Form.Group
                                  controlId="formFile"
                                  className="mb-3"
                                >
                                  <Form.Label>Vælg filer</Form.Label>
                                  <Form.Control
                                    type="file"
                                    onChange={(e) => uploadFile(e)}
                                  />
                                </Form.Group>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleClose}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Row>
                      ) : null}
                    </div>

                    <Tab.Content>
                      <Tab.Pane eventKey="second">
                        <Financials
                          searchValue={search}
                          userID={user.user_id}
                          urlID={id}
                        />
                      </Tab.Pane>

                      <Tab.Pane eventKey="third">
                        <CapTable
                          searchValue={search}
                          userID={user.user_id}
                          urlID={id}
                        />
                      </Tab.Pane>

                      <Tab.Pane eventKey="fourth">
                        <Reports
                          searchValue={search}
                          userID={user.user_id}
                          urlID={id}
                        />
                      </Tab.Pane>

                      <Tab.Pane eventKey="fifth">
                        <BusinessPlan
                          searchValue={search}
                          userID={user.user_id}
                          urlID={id}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Col>
              </Row>
            </div>
          ) : (
            <Card.Body>
              <Modal show={showFileRequest} onHide={handleRequestClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Request permission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p> You are now requesting access to view files.</p>
                  <span>
                    You will receive a e-mail, when your request has been
                    accepted.
                  </span>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleRequestClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={sendRequest}>
                    Send request
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="table-responsive">
                <div className="file-access">
                  <p>You don't have access</p>

                  {hasAlreadyRequested ? (
                    <Button disabled>Request sent</Button>
                  ) : (
                    <Button onClick={setShowFileRequest}>Request access</Button>
                  )}
                </div>
                <Row className="blur">
                  <Col sm>
                    <Tab.Container defaultActiveKey="second">
                      <Nav
                        as="ul"
                        variant="tabs"
                        className="d-flex align-items-center justify-content-center p-0 m-0"
                        style={{ borderBottom: 0 }}
                      >
                        <Nav.Item as="li" className=" col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#financials-files"
                            eventKey="second"
                            role="button"
                            className="text-center p-3"
                          >
                            Financials
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#cap-table"
                            eventKey="third"
                            role="button"
                            className="text-center p-3"
                          >
                            Cap table
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#reports-files"
                            eventKey="fourth"
                            role="button"
                            className="text-center p-3"
                          >
                            Reports
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                          <Nav.Link
                            href="#business-plan-files"
                            eventKey="fifth"
                            role="button"
                            className="text-center p-3"
                          >
                            Business plan
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>

                      {user.user_id == id || user.id == id ? (
                        <Row className="justify-content-between d-flex">
                          <Col sm="12" md="6">
                            <div
                              id="user_list_datatable_info"
                              className="dataTables_filter"
                            >
                              <form className="me-3 position-relative">
                                <div className="form-group mb-0">
                                  <input
                                    type="search"
                                    className="form-control"
                                    id="exampleInputSearch"
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                  />
                                </div>
                              </form>
                            </div>
                          </Col>
                          <Col sm="12" md="6">
                            <div className="user-list-files d-flex justify-content-end">
                              <Link
                                onClick={handleShow}
                                to="#"
                                className="chat-icon-phone btn bg-soft-primary"
                              >
                                Upload
                              </Link>
                            </div>
                          </Col>

                          <Modal show={show}>
                            <Modal.Header closeButton>
                              <Modal.Title>Upload your file</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <h4>What document are you uploading?</h4>
                              <ButtonGroup className="mb-2">
                                {radios.map((radio, idx) => (
                                  <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => {
                                      setRadioValue(e.currentTarget.value);
                                      handleShow();
                                    }}
                                  >
                                    {radio.name}
                                  </ToggleButton>
                                ))}
                              </ButtonGroup>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginBottom: 15,
                                }}
                              >
                                <i
                                  style={{
                                    fontSize: "4rem",
                                    padding: 40,
                                    borderRadius: "50%",
                                    backgroundColor: "#F9F9F9",
                                  }}
                                  class="circle-upload fas fa-upload"
                                ></i>
                                <p style={{ marginTop: 25 }}>
                                  Choose which files you want to upload
                                </p>
                                <p>
                                  Your files are private until you publish them.
                                </p>
                                <Form.Group
                                  controlId="formFile"
                                  className="mb-3"
                                >
                                  <Form.Label>Vælg filer</Form.Label>
                                  <Form.Control
                                    type="file"
                                    onChange={(e) => uploadFile(e)}
                                  />
                                </Form.Group>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleClose}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Row>
                      ) : null}

                      <Tab.Content>
                        <Tab.Pane eventKey="second">
                          <Financials
                            searchValue={search}
                            userID={user.user_id}
                            urlID={id}
                          />
                        </Tab.Pane>

                        <Tab.Pane eventKey="third">
                          <CapTable
                            searchValue={search}
                            userID={user.user_id}
                            urlID={id}
                          />
                        </Tab.Pane>

                        <Tab.Pane eventKey="fourth">
                          <Reports
                            searchValue={search}
                            userID={user.user_id}
                            urlID={id}
                          />
                        </Tab.Pane>

                        <Tab.Pane eventKey="fifth">
                          <BusinessPlan
                            searchValue={search}
                            userID={user.user_id}
                            urlID={id}
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          )}
        </Col>
      </Row>
    </>
  );
};
export default File;
