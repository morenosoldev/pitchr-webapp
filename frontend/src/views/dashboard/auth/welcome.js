import React,{useEffect} from "react";
import { verifyUser } from "../../../store/services/auth.service";
import { useParams } from "react-router-dom";

const Welcome = () => {
  let token = useParams();

  useEffect(() => {
      verifyUser(token.confirmationCode);
  }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Nu har du aktiveret for brugerens konto!</strong>
          <p>Btw det kun ogs der kan se den her side. </p>
        </h3>
      </header>

    </div>
  );
};

export default Welcome;