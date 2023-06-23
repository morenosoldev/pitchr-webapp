import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import MessagesCard from "./Cards/MessagesCard";
import PitchViews from "./Cards/PitchViews";
import ProfileViewsCard from "./Cards/ProfileViewsCard";
import SavedPitches from "./Cards/SavedPitches";
import MapChart from "./Charts/MapChart";
import Views from "./Charts/Views";
import Setup from "./Setup/Setup";
import Investors from "../../components/InvestorCarousel/Investors";

export default function NewBusiness() {
  const [content, setContent] = useState("");
  const [setupComplete] = useState(true);
  const slideData = [
    {
      index: 0,
      headline: "New Fashion Apparel",
      button: "Shop now",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
    },
    {
      index: 1,
      headline: "In The Wilderness",
      button: "Book travel",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
    },
    {
      index: 2,
      headline: "For Your Current Mood",
      button: "Listen",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg",
    },
    {
      index: 3,
      headline: "Focus On The Writing",
      button: "Get Focused",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg",
    },
  ];
  return (
    <Container fluid>
      <Row
        className="row-eq-height"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <Col sm>
          <Card style={{ height: "97%" }}>
            <Card.Body>
              <Views />
            </Card.Body>
          </Card>
        </Col>

        <Col sm>
          {setupComplete ? (
            <>
              <Setup />
            </>
          ) : (
            <Card>
              <Card.Body>
                <h2
                  style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  className="font-weight-bold"
                >
                  Map distribution
                </h2>
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row>
        <Col sm>
          <SavedPitches />
        </Col>

        <Col sm>
          <PitchViews />
        </Col>

        <Col sm>
          <MessagesCard />
        </Col>

        <Col sm>
          <ProfileViewsCard />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Investors />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
