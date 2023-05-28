import * as actions from "../actions";
import { updateObject } from "./utility";

const initialState = {
  diagnostics: [],
  payload: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DIAGNOSTICS:
      return updateObject(state, {
        diagnostics: action.diagnostics,
      });

    case actions.SET_DIAGNOSTICS_PAYLOAD:
      return updateObject(state, {
        payload: action.data,
      });

    default:
      return state;
  }
};

export default auth;
