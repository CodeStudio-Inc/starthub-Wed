import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, pin } from "../../Paths";
import { Row, Input, Avatar } from "antd";
import moment from "moment";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PushPinIcon from "@mui/icons-material/PushPin";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

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
    // setEditNote(true);
    // setNewNote(note);
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

  return (
    <div className="notes-container">
      <div className="notes-total">
        <h3>Total Sessions : </h3>
        <h2>{notes.length}</h2>
      </div>
      {notes?.map((n) => (
        <div
          key={n._id}
          onClick={() => handleOnClickNote(n)}
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
              <div className="notes-column">
                <h3>{n.title}</h3>
                <h5>
                  with {n.mentor.length > 1 ? n.mentor.join("&") : n.mentor[0]}
                </h5>
                <div className="notes-row">
                  <AccessTimeIcon
                    style={{
                      color: "rgba(0,0,0,0.5)",
                      fontSize: "16px",
                    }}
                  />
                  <p>{n.duration.join("-")}</p>
                </div>
                <div className="notes-row">
                  <CalendarMonthIcon
                    style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }}
                  />
                  <p>{moment(n.dateCreated).format("ll")}</p>
                </div>
                <div className="notes-row">
                  <PlaceIcon
                    style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }}
                  />
                  <p>{n.venue}</p>
                </div>
              </div>
            )}
            <Avatar
              shape="square"
              size={64}
              style={{ background: "#36561b56" }}
            >
              <h1 style={{ color: "#fff" }}>{n.mentor[0].substring(0, 1)}</h1>
            </Avatar>
          </div>
          {/* <div className="notes-card-row">
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
          </div> */}
        </div>
      ))}
      <Note open={open} not={note} setOpen={setOpen} />
    </div>
  );
};

export default Notes;
