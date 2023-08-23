import React, { useEffect, useState, useRef } from "react";

import { Row, Col, ToggleButton, ButtonGroup, Badge } from "react-bootstrap";
import Compose from "./mails/Compose";
import Inbox from "./mails/Inbox";
import Drafts from "./mails/Draft";
import Sent from "./mails/Sent";
import { useDispatch, useSelector } from "react-redux";
import useGet from "../hooks/useFetch";

const EditorPage = () => {
  const [activeButton, setActiveButton] = useState("inbox");
  const [showCompose, setShowCompose] = useState(null);
  const [draftId, setDraftId] = useState(null);
  const totalNewMails = useSelector((state) => state.inbox.totalNewMails);
  const dataFetched = useSelector((state) => state.inbox.dataFetched);
  const inbox = useSelector((state) => state.inbox.inboxItems);
  const { fetchData } = useGet();
  const dispatch = useDispatch();

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if(button === 'compose'){
      setShowCompose(<Compose />);
    } else {
      setShowCompose(null);
    }
  };

  const checkForNewMails = () => {
    if (dataFetched || inbox.length === 0) {
      fetchData("recieved", true);
    }
  };

  const draftHandler = (id) => {
    console.log(id);
  }

  const renderContent = () => {
    switch (activeButton) {
      case "inbox":
        return <Inbox />;
      case "sent":
        return <Sent />;
      case "drafts":
        return <Drafts onDraft={draftHandler} />
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchData("recieved");
    }
  }, [dataFetched, dispatch]);

  useEffect(() => {
    const id = setInterval(() => {
      checkForNewMails();
    }, 2000);
    localStorage.setItem("intervalID", id);

    return () => {
      localStorage.removeItem("intervalID");
      clearInterval(id);
    };
  }, [dataFetched, inbox, dispatch]);

  return (
    <div className=" bg-light">
      <Row>
        <Col
          className="col-3 col-lg-2 bg-altlight px-0 shadow"
          style={{ paddingBottom: "520px" }}
        >
          <ButtonGroup className="w-100 " vertical>
            <ToggleButton
              variant="outline-secondary"
              id="1"
              type="radio"
              name="radio"
              className="border border-0 fw-bold rounded-0 "
              active={activeButton === "compose"}
              onClick={() => handleButtonClick("compose")}
            >
              <Badge className="rounded-5 px-md-5 py-md-3">Compose</Badge>
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              id="2"
              type="radio"
              name="radio"
              className="border border-0 text-start rounded-0 fw-bold ps-4"
              active={activeButton === "inbox"}
              onClick={() => handleButtonClick("inbox")}
            >
              Inbox{" "}
              <div className="d-inline-block text-end">
                <Badge pill>{totalNewMails}</Badge>
              </div>
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              id="3"
              type="radio"
              name="radio"
              className="border border-0 rounded-0 fw-bold text-start ps-4 "
              active={activeButton === "sent"}
              onClick={() => handleButtonClick("sent")}
            >
              Sent
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              id="3"
              type="radio"
              name="radio"
              className="border border-0 rounded-0 text-start ps-4 "
              active={activeButton === "drafts"}
              onClick={() => handleButtonClick("drafts")}
            >
              Drafts
            </ToggleButton>
          </ButtonGroup>
        </Col>
        <Col>
          <div className="content-wrapper">{activeButton === 'compose' ? showCompose : renderContent()}</div>
        </Col>
      </Row>
    </div>
  );
};

export default EditorPage;
