import React from "react";
import { ListGroup, Badge, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useGet from "../../hooks/useFetch";

const SentItems = (props) => {
  const history = useHistory();
  const { deleteData } = useGet();
  
  const listItemClickHandler = () => {
    history.push(`/mails/sent/${props._id}`);
    props.onClick(props._id);
  };

  const deleteButtonHandler = (event) => {
    event.stopPropagation();

    deleteData(props._id, "sent");
  };
  return (
    <ListGroup.Item
      key={props.id}
      id={props.id}
      as="li"
      onClick={listItemClickHandler}
      className="d-flex justify-content-between align-items-center"
    >
      <div>
        <p className="mb-0">{props.sub}</p>
        <p className="small mb-0" style={{ color: "grey" }}>
          to <Badge className="bg-secondary">{props.sendeeEmail}</Badge>
        </p>
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

export default SentItems;
