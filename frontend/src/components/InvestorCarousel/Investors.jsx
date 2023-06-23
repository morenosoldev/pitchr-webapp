import React from "react";
import { Col, Row } from "react-bootstrap";
import InvestorCarousel from "./InvestorCarousel";

function Investors() {
  const items = [
    {
      id: 1,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Oliver Jensen",
      position: "Investor",
      tags: ["Investor", "Venture Capitalist"],
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      description: "I am interested in newly founded companies.",
    },
    {
      id: 2,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Jonas Rain",
      position: "Founder",
      tags: ["Startup", "Investor"],
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      description:
        "Looking for the next unicorn, if you are building AI products hit me up.",
    },
    {
      id: 3,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Kendra Luna",
      position: "Startup Founder",
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      tags: ["Startup", "Investor"],
      description: "I am interested in newly founded companies.",
    },
    {
      id: 4,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Rachel John",
      tags: ["Startup", "Investor"],
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      position: "Venture Capitalist",
      description: "I am interested in newly founded companies.",
    },
    {
      id: 5,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Rachel John",
      tags: ["Startup", "Investor"],
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      position: "Venture Capitalist",
      description: "I am interested in newly founded companies.",
    },
    {
      id: 6,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Rachel John",
      tags: ["Startup", "Investor"],
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      position: "Venture Capitalist",
      description: "I am interested in newly founded companies.",
    },
    {
      id: 7,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Rachel John",
      tags: ["Startup", "Investor"],
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      position: "Venture Capitalist",
      description: "I am interested in newly founded companies.",
    },
    {
      id: 8,
      image:
        "https://www.vhv.rs/dpng/d/23-234360_uncomfortable-white-guy-hd-png-download.png",
      name: "Rachel John",
      tags: ["Startup", "Investor"],
      industries: [
        { name: "Technology", icon: "FaIndustry" },
        { name: "Healthcare", icon: "FaIndustry" },
        { name: "Finance", icon: "FaIndustry" },
      ],
      position: "Venture Capitalist",
      description: "I am interested in newly founded companies.",
    },
  ];

  return (
    <div className="mt-4">
      <section className="px-lg-7 px-2 pb-0">
        <div className="bg-light-2 py-10 px-3 px-lg-8 rounded-4">
          <div className="row justify-content-center text-center mb-6">
            <div className="col-12 col-lg-8">
              <div>
                <h2>Explore active investors</h2>
              </div>
            </div>
          </div>
          <Row className="mx-lg-n10 mt-5">
            <Col>
              <InvestorCarousel items={items} />
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}

export default Investors;
