import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../../store/inbox-slice";
import InboxItems from "./InboxItems";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Email from "./Email";

const Inbox = () => {
  const [showList, setShowList] = useState(true);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.inbox.inboxItems);
  const dataFetched = useSelector((state) => state.inbox.dataFetched);

  const history = useHistory();
  useEffect(() => {
    // if (!dataFetched) {
    //   console.log(dataFetched);
    //   const email = localStorage.getItem("email").replace(/[@.]/g, "");

    //   axios
    //     .get(
    //       `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/recieved.json`
    //     )
    //     .then((res) => {
    //       let storedData;
    //       if (res.data) {
    //         storedData = Object.entries(res.data).map(([key, value]) => ({
    //           ...value,
    //           _id: key,
    //         }));
    //         storedData.forEach((data) => {
    //           dispatch(inboxActions.addItems(data));
    //         });
    //       }
    //     });
    // }
    if (dataFetched) {
      history.push("/editor/inbox");
    }
  }, [dataFetched, dispatch]);

  const emailClickHandler = async (id) => {
    setShowList(false);
    const data = inbox.filter((data) => data._id === id);
    setId(data[0]);
    const email = localStorage.getItem("email").replace(/[@.]/g, "");
    await axios.patch(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/recieved/${id}.json`,
      {
        isNew: false,
      }
    );

    dispatch(inboxActions.removeItems({ type: "all" }));
    // console.log(inbox);
    // const res = await axios.get(
    //   `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/recieved.json`
    // );
    // Object.entries(res.data)
    //   .map(([key, value]) => ({
    //     ...value,
    //     _id: key,
    //   }))
    //   .reverse()
    //   .forEach((data) => {
    //     dispatch(inboxActions.addItems(data));
    //   });
    
  };

  let listItems = [];
  if (inbox) {
    listItems = inbox.map((item) => (
      <InboxItems
        key={item.id}
        id={item.id}
        message={item.message}
        sub={item.subject}
        email={item.senderEmail}
        date={item.date}
        _id={item._id}
        onClick={emailClickHandler}
        isNew={item.isNew}
      />
    ));
  }

  const goBackHandler = () => {
    setId(null);
    setShowList(true);
    history.push("/editor/inbox");
  };



  return (
    <React.Fragment>
      {showList && <h3>Inbox</h3>}
      {listItems.length === 0 && showList && <p>No emails. </p>}
      {listItems.length > 0 && showList && (
        <ListGroup as="ul" style={{ maxWidth: "700px" }}>
          {listItems}
        </ListGroup>
      )}
      {!showList && id && <Email goBack={goBackHandler} data={id} />}
    </React.Fragment>
  );
};

export default Inbox;
