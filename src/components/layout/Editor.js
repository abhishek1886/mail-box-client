import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import Compose from "./editor/Compose";
import Inbox from "./editor/Inbox";
import Sent from "./editor/Sent";

const EditorPage = () => {
  const [activeButton, setActiveButton] = useState("compose");

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
              className="border border-0 rounded-0 "
              active={activeButton === "compose"}
              onClick={() => handleButtonClick("compose")}
            >
              Compose
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              id="2"
              type="radio"
              name="radio"
              className="border border-0 rounded-0 "
              active={activeButton === "inbox"}
              onClick={() => handleButtonClick("inbox")}
            >
              Inbox
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              id="3"
              type="radio"
              name="radio"
              className="border border-0 rounded-0 "
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
