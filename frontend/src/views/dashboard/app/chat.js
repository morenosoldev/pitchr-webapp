import React, { useEffect, useState } from "react";
import { Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import ChatUser from "../../../components/Chat/ChatUser";
import Messenger from "../../../components/Chat/Messenger";
import { fetchChats, setCurrentChat } from "../../../store/actions/chat.action";
import useSocket from "../../../util/socketConnect";

const Chat = () => {
  const [show, setShow] = useState("");
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  const ChatSidebarClose = () => {
    document.getElementsByClassName("scroller")[0].classList.remove("show");
  };

  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useSocket(user, dispatch);
  const chats = useSelector((state) => state.chat.chats);

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="start">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <Row>
                    <Col lg="3" className="chat-data-left scroller">
                      <div className="chat-search pt-3 ps-3">
                        <div className="d-flex align-items-center">
                          <div className="chat-profile me-3">
                            <img
                              src={user?.profile_pic}
                              alt="chat-user"
                              className="rounded-circle avatar-60 "
                              onClick={() => setShow("true")}
                            />
                          </div>
                          <div className="chat-caption">
                            <h5 className="mb-0">
                              {user?.business_name
                                ? user.business_name
                                : user.name}
                            </h5>
                            <p className="m-0">
                              {user?.investor_type ? "Investor" : "Business"}
                            </p>
                          </div>
                          <Button
                            type="submit"
                            onClick={ChatSidebarClose}
                            variant=" close-btn-res p-3"
                          >
                            <i className="ri-close-fill"></i>
                          </Button>
                        </div>
                        <div
                          id="user-detail-popup"
                          className={`scroller ${
                            show === "true" ? "show" : ""
                          }`}
                        >
                          <div className="user-profile">
                            <Button type="submit" variant=" close-popup p-3">
                              <i
                                className="ri-close-fill"
                                onClick={() => setShow("false")}
                              ></i>
                            </Button>
                            <div className="user text-center mb-4">
                              <Link className="avatar m-0" to="">
                                <img
                                  src={user?.profile_pic}
                                  alt="avatar"
                                  className="rounded-circle avatar-100"
                                />
                              </Link>
                              <div className="user-name mt-4">
                                <h4 className="text-center">{user?.name}</h4>
                              </div>
                              <div className="user-desc">
                                <p className="text-center">Investor</p>
                              </div>
                            </div>
                            <hr />
                            <div className="user-detail text-left mt-4 ps-4 pe-4">
                              <h5 className="mt-4 mb-4">About</h5>
                              <p>{user?.description}</p>
                              <h5 className="mt-3 mb-3">Status</h5>
                              <ul className="user-status p-0">
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-success pe-1"></i>
                                  <span>Online</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-warning pe-1"></i>
                                  <span>Away</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-danger pe-1"></i>
                                  <span>Do Not Disturb</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-light pe-1"></i>
                                  <span>Offline</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="chat-searchbar mt-4">
                          <Form.Group className="form-group chat-search-data m-0">
                            <input
                              type="text"
                              className="form-control round"
                              id="chat-search"
                              placeholder="Search"
                            />
                            <i className="ri-search-line"></i>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="chat-sidebar-channel scroller mt-4 ps-3">
                        <h5>Private Channels</h5>
                        <Nav
                          as="ul"
                          variant="pills"
                          className="iq-chat-ui nav flex-column"
                        >
                          {chats.length > 0 ? (
                            chats.map((chat) => {
                              return (
                                <ChatUser
                                  click={() => openChat(chat)}
                                  chat={chat}
                                  key={chat.id}
                                />
                              );
                            })
                          ) : (
                            <p id="no-chat">No friends added</p>
                          )}
                        </Nav>
                      </div>
                    </Col>
                    <Col lg={9} className=" chat-data p-0 chat-data-right">
                      <Tab.Content>
                        <Messenger />
                      </Tab.Content>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};
export default Chat;
