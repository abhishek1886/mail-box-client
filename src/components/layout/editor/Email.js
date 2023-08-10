import React from "react";
import { Container, Badge, Button } from "react-bootstrap";

const Email = (props) => {
  const { data } = props;
  return (
    <React.Fragment>
      <div style={{ borderBottom: "1px solid grey" }}>
        <Button
          variant="info"
          className="m-1 py-0 px-3"
          onClick={props.goBack}
          
        >
          {"< Back"}
        </Button>
      </div>
      <Container className="mt-3">
        <h4 className="">{data.subject}</h4>
        <p
          className="border-bottom border-dark small pb-2"
          style={{ color: "grey" }}
        >
          {props.location === 'sent' && <span>to <Badge bg="secondary">{data.sendeeEmail}</Badge></span>  }
          {props.location === 'inbox' && <span>from <Badge bg="secondary">{data.senderEmail}</Badge></span>}
        </p>
        <p>{data.message}</p>
      </Container>
    </React.Fragment>
  );
};

export default Email;
