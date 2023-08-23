import React from "react";
import { ListGroup, Badge, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useGet from "../../hooks/useFetch";

const InboxItems = (props) => {
  const history = useHistory();
  const { deleteData } = useGet();
  
  const listItemClickHandler = () => {
    history.push(`/mails/inbox/${props._id}`);
    props.onClick(props._id);
  };

  const deleteButtonHandler = (event) => {
    event.stopPropagation();

    deleteData(props._id, "recieved")
  };
  return (
    <ListGroup.Item
      key={props.id}
      id={props.id}
      as="li"
      className="d-flex justify-content-between align-items-center"
      onClick={listItemClickHandler}
      style={{ listStyle: "inside" }}
    >
      <div>
        {props.isNew && (
          <div className="d-inline-block text-center">
            <Badge className="p-0 text-primary me-2 rounded-circle">
              &bull;
            </Badge>
          </div>
        )}
        <div className="d-inline-block">
          <p className={`mb-0 ${props.isNew ? "fw-bold" : ""}`}>{props.sub}</p>
          <p className="small mb-0" style={{ color: "grey" }}>
            from <Badge className="bg-secondary">{props.senderEmail}</Badge>
          </p>
        </div>
      </div>
      <div
        className="small d-flex align-items-center"
        style={{ color: "grey" }}
      >
        <div>{props.date}</div>
        <div>
          <Image
            src="https://icons.veryicon.com/png/o/miscellaneous/merchant-edition/delete-589.png"
            roundedCircle
            className="bg-white p-1 bg-secondary"
            style={{ height: "30px", cursor: "pointer" }}
            onClick={deleteButtonHandler}
          />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default InboxItems;
