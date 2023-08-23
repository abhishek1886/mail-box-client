import React, { useRef, useEffect, useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, InputGroup, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sentActions } from "../../../store/sent-slice";
import { useHistory } from "react-router-dom";
import useGet from "../../hooks/useFetch";

const Compose = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
  });
  const [editorState, setEditorState] = useState("");
  const { postData } = useGet();
  const dispatch = useDispatch();
  const history = useHistory();

  const formDataRef = useRef(formData);
  formDataRef.current = formData;
  const editorStateRef = useRef(editorState);
  editorStateRef.current = editorState;

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

  const submitHandler = async (e) => {
    e.preventDefault();

    const sendeeEmail = formData.email.replace(/[@.]/g, "");
    const senderEmail = localStorage.getItem("email").replace(/[@.]/g, "");
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const data = {
      subject: formData.subject,
      sendeeEmail: formData.email,
      senderEmail: localStorage.getItem("email"),
      id: Math.random().toString(),
      message: editorState.getCurrentContent().getPlainText(),
      date: formattedTime,
      isNew: true,
    };

    await postData(sendeeEmail, "recieved", data);
    await postData(senderEmail, "sent", data);

    setFormData({
      email: "",
      subject: "",
    });

    dispatch(sentActions.addItem(data));
  };

  useEffect(() => {
    history.push("/mails/compose");

    return () => {
      //Draft
      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (isValidEmail(formDataRef.current.email)) {
        const payload = {
          ...formDataRef.current,
          message: editorStateRef.current.getCurrentContent().getPlainText(),
          date: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          isNew: true,
          id: Math.random().toString()
        };
        const user = localStorage.getItem("email").replace(/[@.]/g, '');
        postData(user, "drafts", payload);
      }
    };
  }, []);

  return (
    <Card
      className="bg-light p-2 shadow mt-2 me-2"
      style={{ maxWidth: "700px" }}
    >
      <Form onSubmit={submitHandler}>
        <InputGroup className="mb-2">
          <InputGroup.Text id="toUser">To..</InputGroup.Text>
          <Form.Control
            type="email"
            aria-describedby="toUser"
            name="email"
            value={formData.email}
            onChange={formChangeHandler}
            required
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <InputGroup.Text id="toUser">Sub</InputGroup.Text>
          <Form.Control
            type="text"
            aria-describedby="subject"
            name="subject"
            value={formData.subject}
            onChange={formChangeHandler}
            required
          />
        </InputGroup>
        <Form.Label>Message:</Form.Label>
        <Editor
          required
          toolbarOnFocus
          wrapperClassName="border border-info"
          toolbarClassName="border-bottom border-dark"
          editorClassName="bg-white m-1 p-2"
          editorState={editorState}
          onEditorStateChange={editorChangeHandler}
        />
        <div className="text-end m-3">
          <Button type="submit" variant="secondary">
            Send
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Compose;
