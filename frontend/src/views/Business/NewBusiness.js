import { Container, Row, Col, Card } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import MessagesCard from "./Cards/MessagesCard";
import { useState } from "react";
import PitchViews from "./Cards/PitchViews";
import ProfileViewsCard from "./Cards/ProfileViewsCard";
import SavedPitches from "./Cards/SavedPitches";
import MapChart from "./Charts/MapChart";
import Views from "./Charts/Views";
import Setup from "./Setup/Setup";

export default function NewBusiness() {
  const [content, setContent] = useState("");
  const [setupComplete, setSetupComplete] = useState(true);

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
    </Container>
  );
}
