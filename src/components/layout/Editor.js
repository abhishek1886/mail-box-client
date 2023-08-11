import React, { useEffect, useState, useRef } from "react";

import { Row, Col, ToggleButton, ButtonGroup, Badge } from "react-bootstrap";
import Compose from "./editor/Compose";
import Inbox from "./editor/Inbox";
import Sent from "./editor/Sent";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../../store/inbox-slice";
import useGet from "../hooks/useFetch";

const EditorPage = () => {
  const [activeButton, setActiveButton] = useState("compose");
  const totalNewMails = useSelector((state) => state.inbox.totalNewMails);
  const dataFetched = useSelector((state) => state.inbox.dataFetched);
  const inbox = useSelector((state) => state.inbox.inboxItems);
  const {fetchData, data} = useGet();
  const dispatch = useDispatch();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const checkForNewMails = () => {
    if (dataFetched) {
      fetchData("recieved");
      if (data) {
        const newMails = data.filter(
          (data) => !inbox.some((d) => d._id === data._id)
        );
        if (newMails.length > 0) {
          newMails.forEach((data) => {
            dispatch(inboxActions.addItems(data));
          });
        }
      }
    }
  };

  const renderContent = () => {
    switch (activeButton) {
      case "compose":
        return <Compose />;
      case "inbox":
        return <Inbox />;
      case "sent":
        return <Sent />;
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

    return () => {
      clearInterval(id);
    };
    // checkForNewMails();
  }, [dataFetched, inbox, dispatch]);

  return (
    <div className=" bg-light">
      <Row>
        <Col
          className="col-3 bg-altlight px-0"
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
              className="border border-0 rounded-0 fw-bold"
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
              className="border border-0 rounded-0 fw-bold "
              active={activeButton === "sent"}
              onClick={() => handleButtonClick("sent")}
            >
              Sent
            </ToggleButton>
          </ButtonGroup>
        </Col>
        <Col>
          <div className="content-wrapper">{renderContent()}</div>
        </Col>
      </Row>
    </div>
  );
};

export default EditorPage;
