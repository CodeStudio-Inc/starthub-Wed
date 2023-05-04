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

export const setFeatures = (features) => {
  return {
    type: actions.SET_FEATURES,
    features,
  };
};

export const setUser = (
  userId,
  username,
  email,
  category,
  features,
  userRole,
  permissions,
  token,
  tokenExpiration,
  totalExpectedRevenueShare,
  totalRevSharePaid,
  totalRevenue,
  totalExpense,
  daysSinceLastSubmit,
  loanEligibility,
  loanEligibilityMsg,
  loanApplicationDate,
  eligibilityCheck
) => {
  return {
    type: actions.SET_USER,
    userId,
    username,
    email,
    category,
    features,
    userRole,
    permissions,
    token,
    tokenExpiration,
    totalExpectedRevenueShare,
    totalRevSharePaid,
    totalRevenue,
    totalExpense,
    daysSinceLastSubmit,
    loanEligibility,
    loanEligibilityMsg,
    loanApplicationDate,
    eligibilityCheck,
  };
};

export const removeUser = () => {
  return {
    type: actions.REMOVE_USER,
  };
};

export const login = (email, password, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      email,
      password,
    };

    axios
      .post(`auth/signin`, data)
      .then((res) => {
        dispatch(stopLoader());
        console.log(res.data);
        dispatch(
          setUser(
            res.data.userId,
            res.data.username,
            res.data.email,
            res.data.category,
            res.data.features,
            res.data.userRole,
            res.data.permissions,
            res.data.token,
            res.data.tokenExpiration,
            res.data.totalExpectedRevenueShare,
            res.data.totalRevSharePaid,
            res.data.totalRevenue,
            res.data.totalExpense,
            res.data.daysSinceLastSubmit,
            res.data.loanEligibility,
            res.data.loanEligibilityMsg,
            res.data.loanApplicationDate,
            res.data.eligibilityCheck
          )
        );
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
        callback({ success: false, error: error });
      });
  };
};

export const getUser = (userId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    axios
      .get(`auth/user/${userId}`)
      .then((res) => {
        // console.log(res.data);
        dispatch(
          setUser(
            res.data.userId,
            res.data.username,
            res.data.email,
            res.data.category,
            res.data.features,
            res.data.userRole,
            res.data.permissions,
            token,
            res.data.tokenExpiration,
            res.data.totalExpectedRevenueShare,
            res.data.totalRevSharePaid,
            res.data.totalRevenue,
            res.data.totalExpense,
            res.data.daysSinceLastSubmit,
            res.data.loanEligibility,
            res.data.loanEligibilityMsg,
            res.data.loanApplicationDate,
            res.data.eligibilityCheck
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTeamLead = (
  username,
  email,
  teamCategory,
  permissions,
  password,
  userRole,
  features,
  callback
) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      username,
      email,
      teamCategory,
      permissions,
      password,
      userRole,
      features,
    };

    axios
      .put(`auth/add-team-lead`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, res: res.data.message });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ error: true, err: error });
        console.log(error);
      });
  };
};

export const addTeamMember = (
  username,
  email,
  teamCategory,
  permissions,
  password,
  userRole,
  features,
  callback
) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      username,
      email,
      teamCategory,
      permissions,
      password,
      userRole,
      features,
    };

    axios
      .put(`auth/add-team-member`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, res: res.data.message });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ error: true, err: error });
        console.log(error);
      });
  };
};

export const addStartup = (
  username,
  email,
  teamCategory,
  password,
  features,
  userRole,
  contractDate,
  percentageShare,
  callback
) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      username,
      email,
      teamCategory,
      password,
      features,
      userRole,
      contractDate,
      percentageShare,
    };

    axios
      .put(`auth/add-startup`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, res: res.data.message });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ error: true, err: error });
        console.log(error);
      });
  };
};

export const editUserPermissions = (id, permission, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      permission,
    };

    axios
      .patch(`auth/permissions/${id}`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ error: true });
        console.log(error);
      });
  };
};

export const editUserRole = (id, role, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      role,
    };

    axios
      .patch(`auth/user-role/${id}`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ error: true });
        console.log(error);
      });
  };
};

export const editFeatures = (id, features, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      features,
    };

    axios
      .patch(`auth/user-role/${id}`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true });
        console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ error: true });
        console.log(error);
      });
  };
};

export const loanEligibilityCheck = () => {
  return (dispatch, getState) => {
    const data = {
      data: "",
    };
    axios
      .post(`auth/loan-eligibility`, data)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getFeatures = () => {
  return (dispatch) => {
    axios
      .get("/auth/features")
      .then((res) => {
        dispatch(setFeatures(res.data.features));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
