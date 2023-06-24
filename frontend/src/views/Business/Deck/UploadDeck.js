import React, { useEffect, useState } from "react";
import "../../../assets/scss/custom/components/deck/deck.scss";
import { Col, Row, Container, Button, Spinner } from "react-bootstrap";
import NewGrid from "./NewGrid";
import Content from "./Content";
import { useSelector } from "react-redux";
import API from "../../../util/AxiosConfig";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Can't publish yet.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Not yet!</h4>
        <p>
          We can't publish your pitch yet! You have a section without any
          content filled, either fill it with some content or delete it to
          proceeed.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function UploadDeck() {
  const user = useSelector((state) => state.authentication.user);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);

  const [data, setData] = useState([
    {
      id: uuidv4(),
      index: 1,
      title: "Intro",
      subItems: [
        { id: uuidv4(), title: "Introduction of company", content: null },
        { id: uuidv4(), title: "Vision", content: null },
        { id: uuidv4(), title: "Meet the founders", content: null },
      ],
    },
    {
      id: uuidv4(),
      index: 2,
      title: "Development",
      subItems: [
        { id: uuidv4(), title: "Demo of product", content: "" },
        { id: uuidv4(), title: "Upcoming plan", content: "" },
        { id: uuidv4(), title: "Marketing plan", content: "" },
      ],
    },
    {
      id: uuidv4(),
      index: 3,
      title: "End",
      subItems: [
        { id: uuidv4(), title: "Sales projection 2023", content: "" },
        { id: uuidv4(), title: "Contact us", content: "" },
      ],
    },
  ]);

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(async () => {
    const lastSaved = await API.get(`/developmentPitch/${user?.user_id}`);

    if (lastSaved.data?.length > 0) {
      if (lastSaved[0]?.public == true) {
        setPublished(true);
      }
      setData(lastSaved.data);
    }
  }, []);

  const publishPitch = async () => {
    let result = data.every((x) =>
      x.subItems.every(
        (y) => typeof y.content === "object" && y.content !== null
      )
    );
    let result2 = data.every((item) => item.subItems.length > 0);

    if (!result || !result2) {
      setModalShow(true);
    } else {
      savePitch();
      await API.post(`/publish/${user?.user_id}`).data;
      setPublished(true);
    }
  };

  const savePitch = async () => {
    setLoading(true);
    const res = await API.post(`/pitch/${user?.user_id}`, { data: data });
    console.log("res", res);
    setLoading(false);
  };

  const addContent = (video, duration, type, itemId) => {
    // loop over the todos list and find the provided id.
    let updatedList = data.map((item) => {
      const newsubItems = item.subItems.map((obj) => {
        if (obj.id == itemId) {
          setSelectedColumn({
            ...obj,
            content: { video: video, duration: duration, type: type },
          });
          return {
            ...obj,
            content: { video: video, duration: duration, type: type },
          }; //gets everything that was already in item, and updates "done"
        }
        return obj; // else return unmodified item
      });
      return { ...item, subItems: newsubItems }; //gets everything that was already in item, and updates "done"
    });

    setData(updatedList); // set state to new object with updated list
  };

  const removeColumn = (id) => {
    const updatedList = data.filter(function (item) {
      return item.id != id;
    });

    setData(updatedList); // set state to new object with updated list
  };

  const removeContent = (itemId) => {
    // loop over the todos list and find the provided id.
    let updatedList = data.map((item) => {
      const newsubItems = item.subItems.map((obj) => {
        if (obj.id == itemId) {
          setSelectedColumn({ ...obj, content: null });
          return { ...obj, content: null }; //gets everything that was already in item, and updates "done"
        }
        return obj; // else return unmodified item
      });
      return { ...item, subItems: newsubItems }; //gets everything that was already in item, and updates "done"
    });

    //API KALD OG GEM

    setData(updatedList); // set state to new object with updated list
  };

  const removeRow = (itemId) => {
    // loop over the todos list and find the provided id.
    let updatedList = data.map((item) => {
      const newsubItems = item.subItems.filter((item) => item.id !== itemId);

      return { ...item, subItems: newsubItems }; //gets everything that was already in item, and updates "done"
    });

    //API KALD OG GEM

    setData(updatedList); // set state to new object with updated list
  };

  const addColumn = (row) => {
    let updatedList = data.map((item, index) => {
      if (index === row) {
        const newSubItems = item.subItems
          ? [
              ...item.subItems,
              {
                id: uuidv4(),
                title: "",
                content: "",
              },
            ]
          : [
              {
                id: uuidv4(),
                title: "",
                content: "",
              },
            ];
        return { ...item, subItems: newSubItems };
      } else {
        return { ...item };
      }
    });

    setData(updatedList);
  };

  const addSection = () => {
    setData((data) => [
      ...data,
      {
        id: uuidv4(),
        title: "New section",
        subItems: [{ id: uuidv4(), title: "New column", content: null }],
      },
    ]);
  };

  const changeTitle = (title, itemId) => {
    // loop over the todos list and find the provided id.

    let updatedList = data.map((item) => {
      if (item.id == itemId) {
        return { ...item, title: title }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });
    setData(updatedList); // set state to new object with updated list
  };

  const changeColumnTitle = (title, itemId) => {
    // loop over the todos list and find the provided id.
    let updatedList = data.map((item) => {
      const newsubItems = item.subItems.map((obj) => {
        if (obj.id == itemId) {
          return { ...obj, title: title }; //gets everything that was already in item, and updates "done"
        }
        return obj; // else return unmodified item
      });
      return { ...item, subItems: newsubItems }; //gets everything that was already in item, and updates "done"
    });

    setData(updatedList); // set state to new object with updated list
  };

  const selectColumn = (obj) => {
    setSelectedColumn(obj);
  };

  return (
    <Container className="h-100" fluid>
      <Row className="h-100">
        <Col className="container-wrapper-subItems h-100" sm={5}>
          <Row style={{ height: "100%", overflowY: "scroll" }}>
            <div class="container">
              <div class="row">
                <div class="col-auto">
                  {published ? (
                    <Button>Published</Button>
                  ) : (
                    <Button onClick={publishPitch}>Publish</Button>
                  )}
                </div>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  class="col-auto ml-auto"
                />
                <div class="col-auto d-flex align-items-center">
                  {loading ? (
                    <>
                      <span>Saving...</span>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="subItems-container">
              <NewGrid
                changeTitle={changeTitle}
                addSection={addSection}
                removeColumn={removeColumn}
                addColumn={addColumn}
                addContent={addContent}
                removeContent={removeContent}
                removeRow={removeRow}
                changeColumnTitle={changeColumnTitle}
                selectedColumn={selectedColumn}
                selectColumn={selectColumn}
                savePitch={savePitch}
                data={data}
                setData={setData}
              />
            </div>
          </Row>
        </Col>

        <Col sm>
          <Content content={data} selectedColumn={selectedColumn} />
        </Col>
      </Row>
    </Container>
  );
}
