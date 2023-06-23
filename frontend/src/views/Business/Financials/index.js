import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import "./style.css";
import API from "../../../util/AxiosConfig";
import ChartWide from "../../../components/Financials/Wide/ChartWide";
import { BsFillFileSpreadsheetFill } from "react-icons/bs";
import { AiFillPlusCircle, AiOutlineFileExcel } from "react-icons/ai";
import Blank from "./Blank";
import Template from "./Template";
import Upload from "./Upload";
import { useParams } from "react-router-dom";

export default function FinancialIndex() {
  const user = useSelector((state) => state.authentication.user);
  const [charts, setCharts] = useState([]);
  const [showInsert, setShowInsert] = useState(false);
  const handleInsertClose = () => setShowInsert(false);
  const handleInsertShow = () => setShowInsert(true);

  const [showBlank, setShowBlank] = useState(false);
  const handleBlankClose = () => setShowBlank(false);
  const handleBlankShow = () => setShowBlank(true);

  const [showUpload, setShowUpload] = useState(false);
  const handleUploadClose = () => setShowUpload(false);
  const handleUploadShow = () => setShowUpload(true);
  const { type, id } = useParams();

  useEffect(async () => {
    const getData = async () => {
      const res = await API.get(`/financials/${id}`);

      setCharts(res.data);
    };
    getData();
  }, []);

  const addChart = (chart) => {
    setCharts((oldArray) => [...oldArray, chart]);

    handleBlankClose();
    handleInsertClose();
    handleUploadClose();
  };

  const removeChart = (id) => {
    setCharts(charts.filter((chart) => chart.id !== id));
  };

  return (
    <Container className="h-100">
      <Col sm>
        <Modal size="xl" show={showBlank} onHide={handleBlankClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new metric</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Blank addChart={addChart} />
          </Modal.Body>
        </Modal>

        <Modal size="xl" show={showInsert} onHide={handleInsertClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new metric</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Template addChart={addChart} />
          </Modal.Body>
        </Modal>

        <Modal size="xl" show={showUpload} onHide={handleUploadClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new metric</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Upload addChart={addChart} />
          </Modal.Body>
        </Modal>
      </Col>

      <Row className="h-100">
        <Col className="h-100">
          <div
            className="h-100 d-grid"
            style={{
              gridTemplateColumns: "500px 500px",
              gridTemplateRows: "50% 50%",
            }}
          >
            {user?.user_id == id ? (
              <Col style={{ display: "flex", alignItems: "center" }} sm>
                <Card.Body>
                  <Card.Title>Create a Metric</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Transform your data into powerful financials.
                  </Card.Subtitle>
                  <div className="tw-flex tw-justify-around">
                    <div className="blank">
                      <Card.Body>
                        <div className="metric-upload">
                          <AiFillPlusCircle
                            style={{ cursor: "pointer" }}
                            onClick={setShowBlank}
                            size={"35"}
                          />
                          <h4 className="mt-2 metric-header">BLANK</h4>
                        </div>
                      </Card.Body>
                    </div>

                    <div className="import-file">
                      <Card.Body>
                        <div className="metric-upload">
                          <BsFillFileSpreadsheetFill
                            style={{ cursor: "pointer" }}
                            onClick={setShowInsert}
                            size={"35"}
                          />
                          <h4 className="mt-2 metric-header">TEMPLATE</h4>
                        </div>
                      </Card.Body>
                    </div>

                    <div>
                      <Card.Body>
                        <div className="metric-upload">
                          <AiOutlineFileExcel
                            style={{ cursor: "pointer" }}
                            onClick={setShowUpload}
                            size={"35"}
                          />
                          <h4 className="mt-2 metric-header">IMPORT FILE</h4>
                        </div>
                      </Card.Body>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            ) : null}

            {charts?.length == 0 && user?.type == "investor" ? (
              <div className="mx-auto">
                <h4>No metrics yet...</h4>
              </div>
            ) : (
              <>
                {charts?.map((chart) => (
                  <Col sm>
                    <ChartWide
                      metric={chart?.name}
                      data={chart}
                      deleteChart={removeChart}
                    />
                  </Col>
                ))}
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
