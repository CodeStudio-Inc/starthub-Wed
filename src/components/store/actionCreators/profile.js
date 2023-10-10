import * as actions from "../actions";
import axios from "axios";
import { message } from "antd";

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

export const setAllProfiles = (data) => {
  return {
    type: actions.SET_ALL_PROFILES,
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
        dispatch(setProfile(res?.data?.profile));
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

export const updateRevenue = (lifeTimeRevenue, fullMonthRevenue, monthYear) => {
  const data = {
    lifeTimeRevenue,
    fullMonthRevenue,
    monthYear,
  };
  return (dispatch, getState) => {
    dispatch(loaderAction());
    axios
      .patch(`catalyzer/update-revenue`, data)
      .then((res) => {
        dispatch(stopLoader());
        dispatch(setProfile(res?.data?.profile));
        // console.log(res.data);
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

export const updateFounder = (
  id,
  name,
  time,
  focus,
  growth,
  product,
  operations,
  finance,
  communication
) => {
  const data = {
    name,
    time,
    focus,
    growth,
    product,
    operations,
    finance,
    communication,
  };
  return (dispatch, getState) => {
    dispatch(loaderAction());
    axios
      .patch(`catalyzer/update-founder/${id}`, data)
      .then((res) => {
        dispatch(stopLoader());
        dispatch(setProfile(res?.data?.profile));
        // console.log(res.data);
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

export const updateProduct = (id, name, price, unitCost) => {
  const data = {
    id,
    name,
    price,
    unitCost,
  };
  return (dispatch, getState) => {
    dispatch(loaderAction());
    axios
      .patch(`catalyzer/update-product/${id}`, data)
      .then((res) => {
        dispatch(stopLoader());
        dispatch(setProfile(res?.data?.profile));
        // console.log(res.data);
      })
      .catch((error) => {
        dispatch(stopLoader());
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

export const getAllProfiles = () => {
  return (dispatch, getState) => {
    axios
      .get(`catalyzer/profiles`)
      .then((res) => {
        dispatch(setAllProfiles(res.data.profiles));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/// resusable functions for making requests
export const addProfileItem = (path, data, validate, callback) => {
  if (typeof validate !== "undefined" && !validate(data))
    return message.info("All fields are required");
  return (dispatch) => {
    dispatch(loaderAction());
    axios
      .post(path, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
        console.log(error);
      });
  };
};

export const getProfileItem = (path, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());
    axios
      .get(path)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false, error: error });
        console.log(error);
      });
  };
};

export const searchProfileItem = (path, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());
    axios
      .get(path)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false, error: error });
        console.log(error);
      });
  };
};

export const updateProfileItem = (path, data, validate, callback) => {
  if (typeof validate !== "undefined" && !validate(data))
    return message.info("All fields are required");
  return (dispatch) => {
    dispatch(loaderAction());
    axios
      .patch(path, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
        console.log(error);
      });
  };
};

export const deleteProfileItem = (path, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());
    axios
      .delete(path)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false, error: error });
        console.log(error);
      });
  };
};
