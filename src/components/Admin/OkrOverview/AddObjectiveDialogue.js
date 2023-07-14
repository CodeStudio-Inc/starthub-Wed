import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, svg } from "../../Paths";
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
  const [state, setState] = React.useState({
    description: "",
    quarter: 0,
  });

  const { category } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const addObjective = () => {
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

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Objective</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Objectives added from here are not restricted to the current quarter
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
            onChange={(e) => setState({ ...state, quarter: e.target.value })}
            disabled={loading}
          />
        </DialogContent>
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
