import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillPlaySquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../../../assets/scss/custom/components/deck/deck-showcase.scss";
import "../../../assets/scss/custom/components/deck/deck.scss";
import API from "../../../util/AxiosConfig";
import Content from "../Deck/Content";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPlayCircle } from "react-icons/bs";

export default function DeckShowcase({ stopVideo }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
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
              <div className="subItems-container">
                {data.map((item) => (
                  <div className="deck-section-show mt-3 mb-3">
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
                    Create pitch
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
