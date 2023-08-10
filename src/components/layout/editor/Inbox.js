import React, { useEffect } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../../store/inbox-slice";
import InboxItems from "./InboxItems";
import { ListGroup } from "react-bootstrap";

const Inbox = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.inbox.inboxItems);
  const dataFetched = useSelector((state) => state.inbox.dataFetched);

  useEffect(() => {
    if (!dataFetched) {
      const email = localStorage.getItem("email").replace(/[@.]/g, "");

      axios
        .get(
          `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/recieved.json`
        )
        .then((res) => {
          let storedData;
          if (res.data) {
            storedData = Object.entries(res.data).map(([key, value]) => ({
              ...value,
              _id: key,
            }));
            storedData.reverse().forEach((data) => {
              dispatch(inboxActions.addItems(data));
            });
          }
        });
    }
  }, [dataFetched, dispatch]);

  let listItems = [];
  if (inbox) {
    listItems = inbox.map((item) => (
      <InboxItems
        key={item.id}
        id={item.id}
        message={item.message}
        sub={item.subject}
        email={item.senderEmail}
      />
    ));
  }
  return (
    <React.Fragment>
      <h3>Inbox</h3>
      {listItems.length === 0 && <p>No emails. </p>}
      {listItems.length > 0 && <ListGroup as="ol">{listItems}</ListGroup>}
    </React.Fragment>
  );
};

export default Inbox;
