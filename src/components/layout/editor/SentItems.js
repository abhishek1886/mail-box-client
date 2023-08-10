import React from "react";
import { ListGroup, Badge, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sentActions } from "../../../store/sent-slice";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SentItems = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const listItemClickHandler = () => {
    history.push(`/editor/inbox/${props._id}`);
    props.onClick(props._id);
  };

  const deleteButtonHandler = (event) => {
    event.stopPropagation();

    console.log(props._id);
    const email = localStorage.getItem("email").replace(/[@.]/g, "");
    axios
      .delete(
        `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/sent/${props._id}.json`
      )
      .catch((err) => {
        alert(err.message);
      });
    const payload = {
      _id: props._id,
    };
    dispatch(sentActions.removeItems(payload));
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
