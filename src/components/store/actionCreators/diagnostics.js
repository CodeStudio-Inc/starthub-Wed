import * as actions from "../actions";
import axios from "axios";

export const setDiagnostics = (diagnostics) => {
  return {
    type: actions.SET_DIAGNOSTICS,
    diagnostics,
  };
};

export const setDiagnosticsPayload = (data) => {
  return {
    type: actions.SET_DIAGNOSTICS_PAYLOAD,
    data,
  };
};

export const addDiagnostics = (project, title, steps, callback) => {
  return (dispatch) => {
    const data = {
      project,
      title,
      steps,
    };
    axios
      .post("/auth/diagnostic", data)
      .then((res) => {
        callback({ success: true });
      })
      .catch((error) => {
        callback({ success: false });
        console.log(error);
      });
  };
};

export const getDiagnostics = () => {
  return (dispatch) => {
    axios
      .get("/auth/diagnostics")
      .then((res) => {
        dispatch(setDiagnostics(res.data.diagnostics));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const diagnosticsPayload = (payload) => {
  return (dispatch, getState) => {
    dispatch(setDiagnosticsPayload(payload));
  };
};
