import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, svg } from "../../Paths";
import { message, Tabs, Row } from "antd";
import { getRandomColor } from "../../utilities/helpers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddObjectiveDialogue = ({ open, handleClose, setPayload }) => {
  const { TabPane } = Tabs;
  const [state, setState] = React.useState({
    description: "",
    quarter: 0,
  });
  const [title, setTitle] = React.useState(" ");
  const [color, setColor] = React.useState(" ");
  const [index, setIndex] = React.useState(" ");
  const [activeTab, setActiveTab] = React.useState("");

  const { category } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const handleSetNoteColor = (color, index) => {
    setIndex(index);
    setColor(color);
  };

  const notesColors = [
    "#f1f58f",
    "#ffa92f",
    "#ff33b1",
    "#4ee8f2",
    "#74ed4a",
    "#ddff4f",
    "#dfa7dd",
  ];

  const addObjective = () => {
    if (activeTab === "2") return addNote();
    const data = {
      description: state.description,
      quarter: state.quarter,
      category,
    };
    dispatch(
      actionCreators.addItem(
        `catalyzer/objective`,
        data,
        (data) => {
          const { description, quarter } = data;
          if (!description || !quarter) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
            setState({
              description: "",
              quarter: "",
            });
            handleClose();
          }
          if (!success) console.log(success);
        }
      )
    );
  };

  const addNote = () => {
    const data = {
      title,
      color: color,
    };
    dispatch(
      actionCreators.addItem(
        `catalyzer/note`,
        data,
        (data) => {
          const { title } = data;
          if (!title) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            setTitle("");
            setColor("");
            setIndex("");
            dispatch(actionCreators.setNotes(data.notes));
            handleClose();
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <Tabs
          style={{ width: "100%" }}
          tabBarStyle={{ color: "#37561b" }}
          size="small"
          type="card"
          onTabClick={(e) => setActiveTab(e)}
          defaultActiveKey="1"
        >
          <TabPane tab="Add Objective" key="1">
            <DialogContent>
              <DialogContentText>
                Objectives added from here are not restricted to the current
                quarter
              </DialogContentText>
              <TextField
                autoFocus
                value={state.description}
                margin="dense"
                label="Objective"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
                disabled={loading}
              />
              <TextField
                value={state.quarter}
                margin="dense"
                label="Quarter"
                fullWidth
                variant="standard"
                type="number"
                inputProps={{ max: 4, min: 1 }}
                onChange={(e) =>
                  setState({ ...state, quarter: e.target.value })
                }
                disabled={loading}
              />
            </DialogContent>
          </TabPane>
          <TabPane tab="Add Note" key="2">
            <DialogContent>
              <DialogContentText>
                Create To-Do lists that will help you get things done
              </DialogContentText>
              <TextField
                autoFocus
                value={title}
                margin="dense"
                label="note"
                fullWidth
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
              <Row style={{ marginTop: "1rem" }}>
                {notesColors.map((c, i) => (
                  <div
                    className="color-container"
                    onClick={() => handleSetNoteColor(c, i)}
                    key={i}
                    style={{
                      backgroundColor: c,
                      border:
                        i === index ? "2px solid rgba(0,0,0,0.2)" : "none",
                    }}
                  />
                ))}
              </Row>
            </DialogContent>
          </TabPane>
        </Tabs>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={addObjective} disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddObjectiveDialogue;
