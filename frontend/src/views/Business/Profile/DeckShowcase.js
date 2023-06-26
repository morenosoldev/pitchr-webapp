import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { BsPlayCircle, BsPlayCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../../../assets/scss/custom/components/deck/deck-showcase.scss";
import "../../../assets/scss/custom/components/deck/deck.scss";
import API from "../../../util/AxiosConfig";
import Content from "../Deck/Content";

export default function DeckShowcase({ stopVideo }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [underDevelopment, setUnderDevelopment] = useState(false);
  const user = useSelector((state) => state.authentication.user);
  const [selectedColumn, setSelectedColumn] = useState(
    data[0]?.subItems[0]?.content
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastSaved = (await API.get(`/pitch/${id}`)).data;
        if (lastSaved?.length > 0) {
          setData(lastSaved);
          setSelectedColumn(lastSaved[0].subItems[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDevelopmentPitch = async () => {
      try {
        const lastSaved = (await API.get(`/developmentPitch/${id}`)).data;
        console.log("lastSaved: ", lastSaved);
        if (lastSaved?.length > 0) {
          setUnderDevelopment(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user.id == id) {
      fetchDevelopmentPitch();
    }

    fetchData();

    return () => {
      // Clean up any ongoing asynchronous tasks or subscriptions here
      // For example, you can cancel any active requests or clear intervals
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component is mounted

  const selectColumn = (obj) => {
    setSelectedColumn(obj);
  };

  return (
    <Container className="h-100" fluid>
      {data.some((obj) => obj.subItems.length > 0) ? (
        <Row>
          <Col
            className="container-wrapper-subItems d-flex flex-column"
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={3}
          >
            <Row style={{ overflowY: "scroll" }}>
              {user.id == id ? (
                <Link to="/business/app/upload">
                  <Button>Edit pitch</Button>
                </Link>
              ) : null}
              <div className="subItems-container">
                {data.map((item, i) => (
                  <div key={i} className="deck-section-show mt-3 mb-3">
                    <h4 className="deck-title-show">{item.title}</h4>
                    {item.subItems.map((deck) => (
                      <div
                        key={deck.id}
                        onClick={() => selectColumn(deck)}
                        className={`deck-container-show mb-3`}
                      >
                        <div className="deck-image-show">
                          {selectedColumn?.id == deck.id ? (
                            <BsPlayCircleFill size={30} />
                          ) : (
                            <BsPlayCircle size={30} />
                          )}
                        </div>
                        <div className="deck-content-show">
                          <span className="deck-title">{deck.title}</span>
                          <p>{deck?.content?.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Row>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} xxl={9}>
            <Content
              stopVideo={stopVideo}
              content={data}
              selectedColumn={selectedColumn}
            />
          </Col>
        </Row>
      ) : (
        <div className="content-parent">
          <div className="content-container">
            <div className="mx-auto">
              {user.type == "Investor" ? (
                <div className="content-icon">
                  <h3 className="text-center">
                    This startup does not have their pitch ready yet...
                  </h3>
                  <p className="text-center">
                    Go to the feed and find some other startups
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="content-icon"
                >
                  {underDevelopment ? (
                    <div className="text-center">
                      <h2 className="text-center mb-3">
                        You are still developing your pitch!
                      </h2>
                      <p className="text-center">
                        Continue where you left off, click the button down
                        below.
                      </p>
                      <Link
                        to="/business/app/upload"
                        className="mt-3"
                        style={{ margin: "0 auto" }}
                      >
                        <Button>Edit pitch</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h2 className="text-center">
                        You have not created your first pitch yet!
                      </h2>
                      <p className="text-center">
                        Get started, click the button down below.
                      </p>
                      <Link
                        to="/business/app/upload"
                        className="mt-3"
                        style={{ margin: "0 auto" }}
                      >
                        <Button>Create pitch</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
