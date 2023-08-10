import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

const SentItems = (props) => {
  return (
    <ListGroup.Item
      key={props.id}
      id={props.id}
      as="li"
      className="d-flex justify-content-between align-items-center"
    >
      <div>
        <p className="mb-0">{props.sub}</p>
        <p className="small mb-0" style={{ color: "grey"}}>
          to <Badge className="bg-secondary">{props.email}</Badge>
        </p>
      </div>
      <div className=" small" style={{ color: "grey"}}>
        {props.date}
      </div>
    </ListGroup.Item>
  );
};

export default SentItems;
