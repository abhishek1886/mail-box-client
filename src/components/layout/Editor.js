import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import Compose from "./editor/Compose";
import Inbox from "./editor/Inbox";
import Sent from "./editor/Sent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { inboxActions } from "../../store/inbox-slice";

const EditorPage = () => {
  const [activeButton, setActiveButton] = useState("compose");

  const totalNewMails = useSelector(state => state.inbox.totalNewMails);
  const dataFetched = useSelector(state => state.inbox.dataFetched);
  const dispatch = useDispatch();

  const handleButtonClick = (button) => {
    setActiveButton(button);
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
            storedData.forEach((data) => {
              dispatch(inboxActions.addItems(data));
            });
          }
        });
    }
  }, [dataFetched, dispatch]);

  return (
    <div className=" bg-light">
      <Row>
        <Col className="col-3 bg-altlight px-0" style={{ paddingBottom: '500px'}}>
          <ButtonGroup className="w-100 " vertical >
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
              Inbox <div className="d-inline-block text-end"><Badge pill>{totalNewMails}</Badge></div>
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
