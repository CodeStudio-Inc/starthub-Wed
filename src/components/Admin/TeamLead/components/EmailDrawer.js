import React from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
  Typography,
} from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../Paths";

const EmailDrawer = ({ toggle, open, record }) => {
  const [subject, setSubject] = React.useState("");
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const { username, email } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const handleSendEmail = () => {
    const data = {
      reciever: "stuartkal@gmail.com",
      subject,
      sender: email,
      name: username,
      message: html,
    };
    console.log(data);
    dispatch(
      actionCreators.addItem(
        `auth/send-email`,
        data,
        (data) => {
          const { message, reciever, subject } = data;
          if (!message || !reciever || !subject) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setEditorState(() => EditorState.createEmpty());
            setSubject("");
            toggle();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <Drawer
      title="Send email"
      closeIcon={null}
      width="40rem"
      onClose={toggle}
      placement="right"
      visible={open}
      extra={
        <Space>
          <Button onClick={handleSendEmail} className="btn" disabled={loading}>
            send
          </Button>
        </Space>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          span={20}
          layout="vertical"
          validateMessages="All fields required"
          style={{
            width: "90%",
          }}
        >
          <Row gutter={12}>
            <Typography level="title-md" style={{ paddingBottom: "0.5rem" }}>
              To : {record.email}
            </Typography>
          </Row>
          <Row gutter={12}>
            <Form.Item
              name="subject"
              label="Subject"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter subject",
                },
              ]}
            >
              <Input
                disabled={loading}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                size="large"
              />
            </Form.Item>
          </Row>
          <Row gutter={12}>
            <Form.Item
              name="message"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please enter message",
                },
              ]}
            >
              <Editor
                disabled={loading}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) =>
                  setEditorState(editorState)
                }
                defaultEditorState={editorState}
                editorStyle={{
                  border: "1px solid rgba(0,0,0,0.3)",
                  minHeight: "25rem",
                  paddingLeft: "10px",
                }}
              />
            </Form.Item>
          </Row>
        </Form>
      </div>
    </Drawer>
  );
};

export default EmailDrawer;
