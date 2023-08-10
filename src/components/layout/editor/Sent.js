import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { sentActions } from "../../../store/sent-slice";
import SentItems from "./SentItems";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Sent = () => {
  const sent = useSelector((state) => state.sent.sentItems);
  const dispatch = useDispatch();
  const dataFetched = useSelector((state) => state.sent.dataFetched);

  const history = useHistory();
  useEffect(() => {
    if (!dataFetched) {
      const email = localStorage.getItem("email").replace(/[@.]/g, "");
      axios
        .get(
          `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/sent.json`
        )
        .then((res) => {
          let storedData;
          if (res.data) {
            storedData = Object.entries(res.data).map(([key, value]) => ({
              ...value,
              _id: key,
            }));
            storedData.reverse().forEach((data) => {
              dispatch(sentActions.addItem(data));
            });
          }
        });
    }
    if (dataFetched) {
      history.push('/editor/sent');
    }
  }, [dataFetched, dispatch]);

  let listItems = [];
  if (sent) {
    listItems = sent.map((item) => (
      <SentItems
        key={item.id}
        id={item.id}
        message={item.message}
        sub={item.subject}
        email={item.sendeeEmail}
        date={item.date}
        _id={item._id}
      />
    ));
  }

  return (
    <React.Fragment>
      <h3>Sent</h3>
      {listItems.length === 0 && <p>No sent emails. </p>}
      {listItems.length > 0 && <ListGroup as="ol" style={{ maxWidth: "700px" }}>{listItems}</ListGroup>}
    </React.Fragment>
  );
};

export default Sent;
