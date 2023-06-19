import React from "react";
import { Col, Container, Row, Tab } from "react-bootstrap";
import AboutMe from "../../components/InvestmentProfile/AboutMe";
import CapitalAndCompetences from "../../components/InvestmentProfile/CapitalAndCompetences";
import InvestmentDetails from "../../components/InvestmentProfile/InvestmentDetails";
import ProfileNav from "../../components/InvestmentProfile/ProfileNav";
import TopBanner from "../../components/InvestmentProfile/TopBanner";

const InvestorProfile = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="second">
            <TopBanner />
            <ProfileNav />
            <Col sm={12}>
              <Tab.Content>
                <AboutMe />
                <InvestmentDetails />
                <CapitalAndCompetences />
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </>
  );
};

export default InvestorProfile;
