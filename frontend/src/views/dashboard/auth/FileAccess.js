import React,{useEffect} from "react";
import { verifyFileAccess } from "../../../store/services/auth.service";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const FileAccess = () => {
  let token = useParams();

  useEffect(() => {
      verifyFileAccess(token.confirmationCode);
      console.log(token.confirmationCode);
  }, [])
  

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>You have now given access to your file room.</strong>
          <p>You can now close this windows.</p>
        </h3>
      </header>

    </div>
  );
};

export default FileAccess;