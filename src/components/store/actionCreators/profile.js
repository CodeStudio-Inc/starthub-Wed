import * as actions from "../actions";
import axios from "axios";

export const loaderAction = () => {
  return {
    type: actions.LOADER_ACTION,
  };
};

export const stopLoader = () => {
  return {
    type: actions.STOP_LOADER,
  };
};

export const setProfile = (data) => {
  return {
    type: actions.SET_PROFILE,
    data,
  };
};

export const addProfile = (
  founder,
  customer,
  businessModal,
  finance,
  goal,
  pitch,
  journey,
  callback
) => {
  return (dispatch, getState) => {
    dispatch(loaderAction());

    const data = {
      founder,
      customer,
      businessModal,
      finance,
      goal,
      pitch,
      journey,
    };

    axios
      .post(`catalyzer/profile`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true });
        // console.log(res.data);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
        console.log(error);
      });
  };
};

export const getProfile = () => {
  return (dispatch, getState) => {
    axios
      .get(`catalyzer/profile`)
      .then((res) => {
        dispatch(setProfile(res?.data?.profile));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getProfileAdmin = (userId) => {
  return (dispatch, getState) => {
    axios
      .get(`catalyzer/startup-profile?userId=${userId}`)
      .then((res) => {
        dispatch(setProfile(res?.data?.profile));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
