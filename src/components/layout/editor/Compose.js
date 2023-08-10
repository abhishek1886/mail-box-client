import React, { useDebugValue, useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sentActions } from "../../../store/sent-slice";
import axios from "axios";

const Compose = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
  });
  const [editorState, setEditorState] = useState("");

  const dispatch = useDispatch();

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editorChangeHandler = (editorState) => {
    setEditorState(editorState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const sendeeEmail = formData.email.replace(/[@.]/g, "");
    const senderEmail = localStorage.getItem("email").replace(/[@.]/g, "");

    const data = {
      subject: formData.subject,
      sendeeEmail: formData.email,
      senderEmail: localStorage.getItem("email"),
      id: Math.random().toString(),
      message: editorState.getCurrentContent().getPlainText(),
    };

    axios.post(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${sendeeEmail}/recieved.json`,
      data
    );
    axios.post(
      `https://mail-box-client-a8037-default-rtdb.firebaseio.com/${senderEmail}/sent.json`,
      data
    );
    setFormData({
      email: "",
      subject: "",
    });

    dispatch(sentActions.addItem(data));
  };

  return (
    <div className="bg-light p-2" style={{ maxWidth: "700px" }}>
      <Form onSubmit={submitHandler}>
        <InputGroup className="mb-2">
          <InputGroup.Text id="toUser">To..</InputGroup.Text>
          <Form.Control
            type="email"
            aria-describedby="toUser"
            name="email"
            value={formData.email}
            onChange={formChangeHandler}
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control
            type="text"
            aria-describedby="subject"
            name="subject"
            value={formData.subject}
            onChange={formChangeHandler}
          />
        </InputGroup>
        <Editor
          toolbarOnFocus
          wrapperClassName="border border-info"
          toolbarClassName="border-bottom border-dark"
          editorState={editorState}
          onEditorStateChange={editorChangeHandler}
        />
        <div className="text-end m-3">
          <Button type="submit" variant="secondary">
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Compose;
