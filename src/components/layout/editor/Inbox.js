import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import InboxItems from "./InboxItems";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Email from "./Email";
import useGet from "../../hooks/useFetch";

const Inbox = () => {
  const [showList, setShowList] = useState(true);
  const [id, setId] = useState(null);
  const inbox = useSelector((state) => state.inbox.inboxItems);
  const dataFetched = useSelector((state) => state.inbox.dataFetched);
  const { patchData } = useGet();
  const history = useHistory();

  useEffect(() => {
    if (dataFetched) {
      history.push("/editor/inbox");
    }
  }, [dataFetched, history]);

  const emailClickHandler = async (id) => {
    setShowList(false);
    const data = inbox.filter((data) => data._id === id);
    setId(data[0]);
    patchData(id);
  };

  let listItems = [];
  if (inbox) {
    listItems = inbox.map((item) => (
      <InboxItems
        key={item.id}
        id={item.id}
        message={item.message}
        sub={item.subject}
        senderEmail={item.senderEmail}
        sendeeEmail={item.sendeeEmail}
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
        <div className="scrollable-list">
          <ListGroup
            as="ul"
            className="list-group-flush overflow-auto"
            style={{ maxWidth: "700px", maxHeight: "600px" }}
          >
            {listItems}
          </ListGroup>
        </div>
      )}
      {!showList && id && (
        <Email goBack={goBackHandler} data={id} location={"inbox"} />
      )}
    </React.Fragment>
  );
};

export default Inbox;
