import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import PitchDeck from "../../components/PitchDeck/PitchDeck";
import { pitchService } from "../../store/services/pitch.service";

const InvestorFeed = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.authentication.user);
  const [pitches, setPitches] = useState([]);
  const [currentID, setCurrentID] = useState(0);
  const [savedPitches, setSavedPitches] = useState(null);

  useEffect(async () => {
    const pitches = await pitchService.fetchPitches(user?.user_id);

    if (pitches.length > 0) {
      setPitches(pitches);
      setCurrentID(pitches[0].id);
      setLoading(false);
      document.getElementById("feed-pitch").focus();
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key == "ArrowUp") {
      goUp();
    }

    if (event.key == "ArrowDown") {
      goDown();
    }
  };

  const css = `
body{
  overflow-y:hidden
}
`;

  const refs = pitches.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const handleDown = () => {
    if (refs[currentID + 1]) {
      setCurrentID(currentID + 1);
    }

    setCurrentID((state) => {
      refs[currentID > 0 ? state : pitches[0].id].current.scrollIntoView({
        block: "start",
      });

      return state;
    });
    document.getElementById("feed-pitch").focus();
  };

  function onChange(isVisible, id) {
    if (isVisible) {
      setCurrentID(id);
      document.getElementById("feed-pitch").focus();
    }
  }

  const handleUp = () => {
    if (refs[currentID - 1]) {
      setCurrentID(currentID - 1);
    }
    setCurrentID((state) => {
      refs[currentID > 0 ? state : pitches[0].id].current.scrollIntoView({
        block: "start",
      });

      return state;
    });
    document.getElementById("feed-pitch").focus();
  };

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);

  const goUp = () => {
    setUp(true);
    handleUp();
    setTimeout(function () {
      setUp(false);
    }, 1000);
  };

  const goDown = () => {
    setDown(true);
    handleDown();
    setTimeout(function () {
      setDown(false);
    }, 1000);
  };

  const isPitchSaved = (id) => {
    return savedPitches?.length > 0
      ? savedPitches?.filter((pitch) => pitch.id == id).length > 0
      : false;
  };

  const addSavedPitch = (id) =>
    setSavedPitches((state) => [...state, { id: id }]);

  return (
    <>
      {loading ? (
        <>
          <Container fluid style={{ maxHeight: "100vh" }}>
            <Row>
              <Col lg={12} className="row m-0 p-0">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <Spinner animation="grow" />
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <>
          {pitches.length > 0 ? (
            <Container
              className="h-100"
              onKeyPress={handleKeyDown}
              id="feed-pitch"
              style={{ outline: "none" }}
              tabInvestorFeed="0"
              onKeyDown={handleKeyDown}
              fluid
            >
              <style>{css}</style>
              <Row style={{ height: "100%" }}>
                <Col
                  lg={12}
                  className="pitch-container row m-0 p-0"
                  style={{
                    overflowY: "scroll",
                    scrollbarWidth: "thin",
                    height: "100%",
                  }}
                >
                  {pitches?.map((pitch) => {
                    return (
                      <VisibilitySensor
                        key={pitch.id}
                        onChange={(isVisible) => onChange(isVisible, pitch.id)}
                      >
                        {({ isVisible }) => (
                          <div
                            style={{ height: "100%" }}
                            key={pitch.id}
                            ref={refs[pitch.id]}
                          >
                            <PitchDeck
                              savedPitch={isPitchSaved(pitch.id)}
                              addSavedPitch={addSavedPitch}
                              location={pitch.Business.location}
                              charts={pitch?.Business?.Metrics}
                              isVisble={isVisible}
                              pitchID={pitch.id}
                              deck={pitch?.Business?.PitchDeck.file}
                              calendly={pitch.calendly}
                              userID={pitch.id}
                              business={pitch.Business}
                              company={pitch.name}
                              logo={pitch.profile_pic}
                              description={pitch.description}
                              members={pitch.Business.employees}
                            />
                          </div>
                        )}
                      </VisibilitySensor>
                    );
                  })}
                </Col>
              </Row>
            </Container>
          ) : (
            <Container fluid style={{ maxHeight: "100vh" }}>
              <Row>
                <Col lg={12} className="row m-0 p-0">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50vh",
                    }}
                  >
                    <Spinner animation="grow" />
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default InvestorFeed;
