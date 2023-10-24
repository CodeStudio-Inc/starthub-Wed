import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, pin } from "../../Paths";
import { Row, Input } from "antd";
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PushPinIcon from "@mui/icons-material/PushPin";

import Note from "./Note";

const { Search } = Input;

const Notes = () => {
  const [open, setOpen] = React.useState(false);
  const [editNote, setEditNote] = React.useState(false);
  const [note, setNote] = React.useState();
  const [newNote, setNewNote] = React.useState("");
  const { loading, notes } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const handleOnClickNote = (note) => {
    setNote(note);
    dispatch(actionCreators.setNote(note));
    setOpen(true);
  };

  const handleSetEditNote = (note) => {
    setEditNote(true);
    setNewNote(note);
  };

  const updateNote = (id) => {
    const data = { title: newNote };
    dispatch(
      actionCreators.updateItem(
        `catalyzer/note/${id}`,
        data,
        (data) => {
          const { title } = data;
          if (!title) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setNewNote("");
            setEditNote(false);
            dispatch(actionCreators.setNotes(data.notes));
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const deleteNote = (id) => {
    dispatch(
      actionCreators.deleteItem(`catalyzer/remove-note/${id}`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setNotes(data.notes));
        }
        if (!success) console.log(error);
      })
    );
  };

  return (
    <div className="notes-container">
      <Search
        placeholder="search notes"
        allowClear
        bordered={false}
        // onSearch={onSearch}
        style={{
          width: "80%",
          borderRadius: "5px",
          background: "#eee",
          marginBottom: "1rem",
        }}
      />
      <Row
        xs={12}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {notes?.map((n) => (
          <div
            key={n._id}
            className="notes-card"
            style={{ background: n.color }}
          >
            <div className="notes-card-edit-row">
              {editNote ? (
                <div className="notes-save-column">
                  <input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    autoFocus
                  />
                  <div className="notes-save-column">
                    <p onClick={() => updateNote(n._id)}>save</p>
                    <CancelIcon
                      onClick={() => setEditNote(false)}
                      style={{
                        color: "#37561b",
                        fontSize: "14px",
                        marginLeft: "0.5rem",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p onClick={() => handleOnClickNote(n)}>{n.title}</p>
              )}
              <img src={pin} style={{ height: "14px", width: "14px" }} />
            </div>
            <div className="notes-card-row">
              <div className="notes-card-icon-row">
                <CalendarMonthIcon
                  style={{ color: "rgba(0,0,0,0.5)", fontSize: "14px" }}
                />
                <h5>{moment(n.dateCreated).format("DD/MM/YY")}</h5>
              </div>
              <div className="notes-card-icon-row">
                <ModeEditOutlineIcon
                  style={{ color: "rgba(0,0,0,0.7)", fontSize: "14px" }}
                  onClick={() => handleSetEditNote(n.title)}
                />
                <DeleteIcon
                  style={{ color: "rgba(0,0,0,0.7)", fontSize: "14px" }}
                  onClick={() => deleteNote(n._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </Row>
      <Note open={open} not={note} setOpen={setOpen} />
    </div>
  );
};

export default Notes;
