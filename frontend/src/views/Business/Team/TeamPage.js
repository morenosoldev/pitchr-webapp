import React, { useEffect } from "react";
import Member from "./Member";
import { useDispatch, useSelector } from "react-redux";
import { teamActions } from "../../../store/actions/team.actions";
import { Card, Container } from "react-bootstrap";

export default function TeamPage({ urlID }) {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.team.members);

  useEffect(() => {
    dispatch(teamActions.getMembers(urlID));
  }, []);

  return (
    <Container fluid>
      <Card>
        <Card.Body>
          <div
            className="d-grid gap-3 d-grid-template-1fr-19"
            style={{ overflowY: "scroll" }}
          >
            {members.length > 0 ? (
              members?.map((member) => (
                <Member
                  key={member.id}
                  urlID={urlID}
                  linkedIn={member.linkedIn}
                  name={member.name}
                  jobTitle={member.jobTitle}
                  profilePic={member.profilePic}
                  jobDescription={member.jobDescription}
                  id={member.id}
                />
              ))
            ) : (
              <h4>You don't have any people added to your team yet.. </h4>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
