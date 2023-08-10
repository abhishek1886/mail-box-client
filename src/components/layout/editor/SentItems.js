import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

const SentItems = (props) => {
  return (
    <ListGroup.Item
      key={props.id}
      id={props.id}
      as="li"
      className="d-flex flex-column"
    >
      <p className="mb-0">{props.message}</p>
      <p className="small mb-0">
        to <Badge className="bg-secondary">{props.email}</Badge>
      </p>
    </ListGroup.Item>
  );
};

export default SentItems;
