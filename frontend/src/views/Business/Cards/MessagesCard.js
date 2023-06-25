import { Card } from "react-bootstrap";
import { AiOutlineMessage } from "react-icons/ai";
import "../../../assets/scss/custom/components/card/_statistic.scss";

export default function MessagesCard() {
  return (
    <Card>
      <Card.Body>
        <div className="card-statistic">
          <div className="card-statistic-text">
            <h2 className="card-statistic-h2">0</h2>
            <span className="font-weight-light">Messages</span>
          </div>

          <div className="card-icon">
            <AiOutlineMessage color="#50B5FF" size={"45"} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
