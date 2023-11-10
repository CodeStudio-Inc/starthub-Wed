import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, pin } from "../../Paths";
import { Modal, Button, Avatar, Upload, message } from "antd";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PushPinIcon from "@mui/icons-material/PushPin";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import moment from "moment";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Note = ({ open, setOpen }) => {
  const [edit, setEdit] = React.useState(false);

  const { loading, note } = useSelector((state) => state.requests);

  // const draftHtml = htmlToDraft("<p></p>");
  // const contentState = ContentState.createFromBlockArray(
  //   draftHtml?.contentBlocks
  // );

  // const [editorState, setEditorState] = React.useState(() =>
  //   EditorState.createWithContent(contentState)
  // );

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const dispatch = useDispatch();

  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleSetEdit = () => setEdit(true);
  const handleCancelSetEdit = () => setEdit(!edit);

  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const addNoteDescription = () => {
    const data = {
      description: html,
    };
    dispatch(
      actionCreators.updateItem(
        `catalyzer/note-description/${note._id}`,
        data,
        (data) => {
          const { description } = data;
          if (!description) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setEditorState(() => EditorState.createEmpty());
            setEdit(false);
            dispatch(actionCreators.setNotes(data.notes));
            const updatedNote = data.notes.find((n) => n._id === note._id);
            dispatch(actionCreators.setNote(updatedNote));
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const handleCustomRequest = async ({ file, onSuccess, onError }) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) return message.error("Image must smaller than 2MB!");
    try {
      const data = new FormData();
      data.append("upload_preset", "starthub_preset");
      data.append("cloud_name", "starthub-africa");
      data.append("file", file);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/starthub-africa/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        onSuccess(result, file);
        message.info("successful");
      } else {
        onError(new Error("Upload failed"));
        message.error("Upload Failed");
      }
    } catch (error) {
      onError(error);
    }
  };

  const deleteNote = (id) => {
    dispatch(
      actionCreators.deleteItem(`catalyzer/remove-note/${id}`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setNotes(data.notes));
          closeModal();
        }
        if (!success) console.log(error);
      })
    );
  };

  return (
    <Modal
      visible={open}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
      width={900}
    >
      <div className="note-modal">
        <div className="notes-column">
          <h2>{note?.title}</h2>
          <h5>
            with{" "}
            {/* {note?.mentor?.length > 1 ? note?.mentor?.join("&") : note?.mentor} */}
          </h5>
        </div>
        <div className="notes-card-row">
          <div className="editor-column">
            <div dangerouslySetInnerHTML={{ __html: note?.description }} />

            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(editorState) => setEditorState(editorState)}
              defaultEditorState={editorState}
              editorStyle={{
                border: "1px solid rgba(0,0,0,0.3)",
                minHeight: "150px",
              }}
            />
            {note?.description.length > 7 ? (
              <Button
                style={{ alignSelf: "flex-end", marginTop: "0.5rem" }}
                onClick={handleSetEdit}
              >
                Edit Description
              </Button>
            ) : (
              <Button
                style={{ alignSelf: "flex-end", marginTop: "0.5rem" }}
                onClick={addNoteDescription}
                disabled={loading}
              >
                Add Description
              </Button>
            )}
          </div>
          <div className="notes-column">
            <div className="notes-row">
              <AccessTimeIcon
                style={{
                  color: "rgba(0,0,0,0.5)",
                  fontSize: "16px",
                }}
              />
              <p>{note.duration.join("-")}</p>
            </div>
            <div className="notes-row">
              <CalendarMonthIcon
                style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }}
              />
              <p>{moment(note.dateCreated).format("ll")}</p>
            </div>
            <div className="notes-row">
              <PlaceIcon
                style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }}
              />
              <p>{note.venue}</p>
            </div>
            <h4 style={{ marginTop: "1rem" }}>Members</h4>
            <div className="avatar-column">
              {note.startup.map((s) => (
                <p>{s}</p>
              ))}
            </div>
            <Upload customRequest={handleCustomRequest}>
              <Button style={{ marginTop: "1rem" }}>Add attachment</Button>
            </Upload>
            <Button
              type="link"
              style={{ color: "#37561b" }}
              onClick={() => deleteNote(note._id)}
            >
              Delete Session
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Note;
