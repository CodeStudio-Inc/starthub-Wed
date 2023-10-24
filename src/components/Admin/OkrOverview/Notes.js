import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, pin } from "../../Paths";
import { Row, Input } from "antd";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PushPinIcon from "@mui/icons-material/PushPin";

import Note from "./Note";

const { Search } = Input;

const Notes = () => {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState();
  const { loading, notes } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const handleOnClickNote = (note) => {
    setNote(note);
    dispatch(actionCreators.setNote(note));
    setOpen(true);
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
        {notes.map((n) => (
          <div
            key={n._id}
            className="notes-card"
            style={{ background: n.color }}
          >
            <div
              className="notes-card-edit-row"
              onClick={() => handleOnClickNote(n)}
            >
              <p>{n.title}</p>
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
