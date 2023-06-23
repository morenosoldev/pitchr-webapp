import React from "react";
import { Card } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BsBriefcase } from "react-icons/bs";

const InvestorCarousel = ({ items }) => {
  return (
    <>
      <OwlCarousel
        dots={false}
        nav
        items={6}
        loop
        responsive={{
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          992: {
            items: 3,
          },
        }}
        margin={30}
      >
        {items.map((item) => (
          <div className="item" key={item.id} style={{ padding: "15px" }}>
            <Card className="p-3 p-md-5 border-0 bg-white rounded-4">
              <Card.Body className="card-body p-0">
                <div className="d-flex mb-3 align-items-center">
                  <div>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className="img-fluid rounded-circle"
                      alt="Image"
                    />
                  </div>
                  <div className="ms-3">
                    <Card.Title className="font-w-6 text-dark mb-0">
                      {item.name}
                    </Card.Title>
                    <Card.Subtitle className="text-muted fst-italic">
                      - {item.position}
                    </Card.Subtitle>
                  </div>
                </div>

                <div className="d-flex mt-3 align-items-center justify-content-between">
                  {item.industries.map((industry, index) => (
                    <li key={index}>
                      <BsBriefcase className="me-1" /> {industry.name}
                    </li>
                  ))}
                  <Card.Text className="font-w-5 lead mb-3">
                    {item.description}
                  </Card.Text>
                  <i className="bi bi-quote fs-1 text-dark"></i>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </OwlCarousel>
    </>
  );
};

export default InvestorCarousel;
