import React from "react";

import { ListGroup, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const InboxItems = (props) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push(`/editor/inbox/${props._id}`);
    props.onClick(props._id);
  };
  return (
    <ListGroup.Item
      key={props.id}
      id={props.id}
      as="li"
      className="d-flex justify-content-between align-items-center"
      onClick={clickHandler}
      style={{ listStyle: "inside" }}
    >
      <div>
        {props.isNew && <div className="d-inline-block text-center"><Badge className="p-0 text-primary me-2 rounded-circle">&bull;</Badge></div>}
        <div className="d-inline-block">
          <p className={`mb-0 ${props.isNew ? "fw-bold" : ""}`}>{props.sub}</p>
          <p className="small mb-0" style={{ color: "grey" }}>
            from <Badge className="bg-secondary">{props.email}</Badge>
          </p>
        </div>
      </div>
      <div className=" small" style={{ color: "grey" }}>
        {props.date}
      </div>
    </ListGroup.Item>
  );
};

export default InboxItems;
