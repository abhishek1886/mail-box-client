import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { draftActions } from "../../../store/draft-slice";
import Email from "./Email";
import DraftItems from "./DraftItmes";
import useGet from "../../hooks/useFetch";

const Sent = (props) => {
  const [showList, setShowList] = useState(true);
  const [id, setId] = useState(null);
  const draft = useSelector((state) => state.draft.draftItems);
  const dispatch = useDispatch();
  const dataFetched = useSelector((state) => state.draft.dataFetched);
  const { fetchData } = useGet();
  const history = useHistory();

  useEffect(() => {
    if (!dataFetched) {
      fetchData("drafts");
    }
    history.push("/mails/drafts");
  }, [dataFetched, history]);

  const emailClickHandler = async (id) => {
    setShowList(false);
    const data = draft.filter((data) => data._id === id);
    setId(data[0]);

    dispatch(draftActions.removeItems({ type: "all" }));
  };

  let listItems = [];
  if (draft) {
    listItems = draft.map((item) => (
      <DraftItems
        key={item.id}
        id={item.id}
        message={item.message}
        sub={item.subject}
        email={item.email}
        date={item.date}
        onClick={emailClickHandler}
        _id={item._id}
      />
    ));
  }

  const goBackHandler = () => {
    setId(null);
    setShowList(true);
    history.push("/mails/draft");
  };

  const editButtonHandler = (id) => {
    props.onDraft(id);
  };

  return (
    <React.Fragment>
      {showList && <h3>Draft</h3>}
      {listItems.length === 0 && showList && <p>No Drafts. </p>}
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
        <Email
          goBack={goBackHandler}
          onEdit={editButtonHandler}
          data={id}
          location={"draft"}
        />
      )}
    </React.Fragment>
  );
};

export default Sent;
