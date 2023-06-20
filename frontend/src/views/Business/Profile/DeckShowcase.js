import React, { useEffect, useState } from "react";
import "../../../assets/scss/custom/components/deck/deck.scss";
import { Col, Row, Container, Button } from "react-bootstrap";
import NewGrid from "../Deck/NewGrid";
import Content from "../Deck/Content";
import { pitchActions } from "../../../store/actions/pitch.actions";
import { useSelector } from "react-redux";
import API from "../../../util/AxiosConfig";
import "../../../assets/scss/custom/components/deck/deck-showcase.scss";
import { Link, useParams } from "react-router-dom";
import { AiOutlineVideoCamera } from "react-icons/ai";

export default function DeckShowcase() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.authentication.user);
  const [selectedColumn, setSelectedColumn] = useState(
    data[0]?.subItems[0]?.content
  );
  useEffect(async () => {
    const lastSaved = (await API.get(`/pitch/${id}`)).data;
    if (lastSaved?.length > 0) {
      console.log("data", lastSaved);
      setData(lastSaved);
    }
  }, []);
  const selectColumn = (obj) => {
    setSelectedColumn(obj);
  };

  return (
    <Container className="h-100" fluid>
      {data.some((obj) => obj.subItems.length > 0) ? (
        <Row className="h-100">
          <Col className="container-wrapper-subItems h-100" sm={3}>
            <Row style={{ height: "100%", overflowY: "scroll" }}>
              <div className="subItems-container">
                {data.map((item) => (
                  <div className="deck-section-show mt-3 mb-3">
                    <h4 className="deck-title-show">{item.title}</h4>
                    {item.subItems.map((deck) => (
                      <div
                        onClick={() => selectColumn(deck)}
                        className={`deck-container-show mb-3`}
                      >
                        <div className="deck-image-show">
                          <AiOutlineVideoCamera
                            size={"25"}
                            color={
                              selectedColumn?.id == deck.id ? "blue" : "black"
                            }
                          />
                        </div>
                        <div className="deck-content-show">
                          <h4>{deck.title}</h4>
                          <span>{deck?.content?.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Row>
          </Col>

          <Col sm>
            <Content content={data} selectedColumn={selectedColumn} />
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
