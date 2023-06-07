import * as actions from "../actions";
import { updateObject } from "./utility";

const initialState = {
  profile: [],
  loading: false,
  profiles: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADER_ACTION:
      return updateObject(state, {
        loading: true,
      });

    case actions.STOP_LOADER:
      return updateObject(state, {
        loading: false,
      });

    case actions.SET_PROFILE:
      return updateObject(state, {
        profile: action.data,
      });

    case actions.SET_ALL_PROFILES:
      return updateObject(state, {
        profiles: action.data,
      });
    default:
      return state;
  }
};

export default auth;
