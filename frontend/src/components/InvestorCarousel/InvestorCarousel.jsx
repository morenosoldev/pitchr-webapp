import React from "react";
import { Button, Card } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BsBriefcase } from "react-icons/bs";
import ChatService from "../../store/services/chat.service";
import { history } from "../../util/history";

const InvestorCarousel = ({ items }) => {
  const addChat = async (userID) => {
    try {
      const chats = await ChatService.createChat(userID);
      history.push("/investor/app/chat");
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

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
            <div className="d-flex mb-3 align-items-center">
              <div>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid rounded-circle"
                  alt="Image"
                />
              </div>
              <div className="ms-3">
                <Card.Title className="font-w-6 text-dark mb-0">
                  {item.name}
                </Card.Title>
                <Card.Subtitle className="text-muted fst-italic">
                  {item.position}
                </Card.Subtitle>
              </div>
              <div>
                <ul className="list-style-none">
                  {item.industries.map((industry, index) => (
                    <li key={index}>
                      <BsBriefcase className="me-1" /> {industry.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="d-flex mt-3 align-items-center justify-content-between">
              <Card.Text className="font-w-5 lead mb-3">
                {item.description}
              </Card.Text>
            </div>
            <Button>
              Contact me <BsBriefcase className="ms-1" />
            </Button>
          </div>
        ))}
      </OwlCarousel>
    </>
  );
};

export default InvestorCarousel;
