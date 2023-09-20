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

export const addDiagnostics = (payload, callback) => {
  return (dispatch) => {
    const data = {
      payload,
    };
    axios
      .patch("/auth/update-diagnostics", data)
      .then((res) => {
        callback({ success: true });
      })
      .catch((error) => {
        callback({ success: false });
        console.log(error);
      });
  };
};

export const addStartupDiagnostics = (userId, payload, callback) => {
  return (dispatch) => {
    const data = {
      payload,
    };
    axios
      .patch(`/auth/diagnostics/${userId}`, data)
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
      .get("/auth/user-diagnostics")
      .then((res) => {
        dispatch(setDiagnosticsPayload(res.data.diagnostics));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStartupDiagnostics = (userId) => {
  return (dispatch) => {
    axios
      .get(`/auth/diagnostics/${userId}`)
      .then((res) => {
        dispatch(setDiagnosticsPayload(res.data.diagnostics));
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
