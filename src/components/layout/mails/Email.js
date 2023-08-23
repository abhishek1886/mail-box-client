import React from "react";
import { Container, Badge, Button } from "react-bootstrap";

const Email = (props) => {
  const { data } = props;
  return (
    <React.Fragment>
      <div style={{ borderBottom: "1px solid grey" }}>
        <Button variant="info" className="m-1 py-0 px-3" onClick={props.goBack}>
          {"< Back"}
        </Button>
      </div>
      <Container className="my-1">
        <div className="d-flex border-bottom border-dark justify-content-between align-items-center">
          <div>
            <h4 className="">{data.subject}</h4>
            <p className="small pb-2 mb-0" style={{ color: "grey" }}>
              {props.location === "sent" && (
                <span>
                  to <Badge bg="secondary">{data.sendeeEmail}</Badge>
                </span>
              )}
              {props.location === "inbox" && (
                <span>
                  from <Badge bg="secondary">{data.senderEmail}</Badge>
                </span>
              )}
              {props.location === "draft" && (
                <span>
                  to <Badge bg="secondary">{data.email}</Badge>
                </span>
              )}
            </p>
          </div>
          <div>
            {props.location === "draft" && (
              <Button
                variant="outline-primary"
                onClick={() => props.onEdit(data._id)}
                className="rounded-3 py-1 px-4"
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        <p>{data.message}</p>
      </Container>
    </React.Fragment>
  );
};

export default Email;
