import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { sentActions } from "../../../store/sent-slice";
import SentItems from "./SentItems";
import { useHistory } from "react-router-dom";
import Email from "./Email";
import useGet from "../../hooks/useFetch";

const Sent = () => {
  const [showList, setShowList] = useState(true);
  const [id, setId] = useState(null);
  const sent = useSelector((state) => state.sent.sentItems);
  const dispatch = useDispatch();
  const dataFetched = useSelector((state) => state.sent.dataFetched);
  const { fetchData } = useGet();
  const history = useHistory();

  useEffect(() => {
    if (!dataFetched) {
      fetchData("sent");
    }
    if (dataFetched) {
      history.push("/editor/sent");
    }
  }, [dataFetched, dispatch]);

  const emailClickHandler = async (id) => {
    setShowList(false);
    const data = sent.filter((data) => data._id === id);
    setId(data[0]);
    const email = localStorage.getItem("email").replace(/[@.]/g, "");
    // await axios.patch(
    //   `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${email}/recieved/${id}.json`,
    //   {
    //     isNew: false,
    //   }
    // );

    dispatch(sentActions.removeItems({ type: "all" }));
  };

  let listItems = [];
  if (sent) {
    listItems = sent.map((item) => (
      <SentItems
        key={item.id}
        id={item.id}
        message={item.message}
        sub={item.subject}
        sendeeEmail={item.sendeeEmail}
        senderEmail={item.sendeeEmail}
        date={item.date}
        onClick={emailClickHandler}
        _id={item._id}
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
      {showList && <h3>Sent</h3>}
      {listItems.length === 0 && showList && <p>No sent emails. </p>}
      {listItems.length > 0 && showList && (
        <div className="scrollable-list">
          <ListGroup
            as="ol"
            style={{ maxWidth: "700px", maxHeight: "600px" }}
            className="list-group-flush overflow-auto"
          >
            {listItems}
          </ListGroup>
        </div>
      )}
      {!showList && id && (
        <Email goBack={goBackHandler} data={id} location={"sent"} />
      )}
    </React.Fragment>
  );
};

export default Sent;
