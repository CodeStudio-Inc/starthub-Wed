import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, pin } from "../../Paths";
import { Modal, Button } from "antd";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Note = ({ open, setOpen }) => {
  const [edit, setEdit] = React.useState(false);

  const { loading, note } = useSelector((state) => state.requests);

  console.log(note);

  const draftHtml = htmlToDraft("<p></p>");
  const contentState = ContentState.createFromBlockArray(
    draftHtml?.contentBlocks
  );

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(contentState)
  );

  //   console.log(contentState);

  const dispatch = useDispatch();

  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };

  //   console.log(editorState);

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
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <Modal
      visible={open}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
      width={800}
    >
      <div className="keyresult-modal">
        <div className="notes-card-row">
          <h2>{note?.title}</h2>
          <div className="notes-card-icon-row">
            <CalendarMonthIcon
              style={{ color: "rgba(0,0,0,0.5)", fontSize: "14px" }}
            />
            <h5>{moment(note?.dateCreated).format("DD/MM/YY")}</h5>
          </div>
        </div>
        {edit ? (
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(editorState) => setEditorState(editorState)}
            defaultEditorState={editorState}
            defaultContentState={contentState}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: note?.description }} />
        )}
        {!edit ? (
          <Button style={{ alignSelf: "flex-end" }} onClick={handleSetEdit}>
            edit
          </Button>
        ) : (
          <Button
            style={{ alignSelf: "flex-end" }}
            onClick={addNoteDescription}
            disabled={loading}
          >
            save changes
          </Button>
        )}
        {edit ? (
          <Button
            onClick={handleCancelSetEdit}
            style={{ alignSelf: "flex-end" }}
          >
            cancel
          </Button>
        ) : null}
      </div>
    </Modal>
  );
};

export default Note;
