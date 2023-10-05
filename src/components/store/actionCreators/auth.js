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

export const setCategories = (categories) => {
  return {
    type: actions.SET_CATEGORIES,
    categories,
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

export const setDiagnostics = (data) => {
  return {
    type: actions.SET_DIAGNOSTICS_TOOLS,
    data,
  };
};

export const setUsers = (data) => {
  return {
    type: actions.SET_ALL_USERS,
    data,
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
        dispatch(setDiagnostics(res.data.diagnostics));
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
        dispatch(setDiagnostics(res.data.diagnostics));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserz = () => {
  return (dispatch, getState) => {
    dispatch(loaderAction());

    axios
      .get(`auth/users`)
      .then((res) => {
        dispatch(stopLoader());
        dispatch(setUsers(res.data.users));
      })
      .catch((error) => {
        dispatch(stopLoader());
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
        dispatch(setUsers(res.data.users));
        callback({ success: true });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
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
        dispatch(setUsers(res.data.users));
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
        callback({ success: false });
        console.log(error);
      });
  };
};

export const assignStartup = (startupId, mentorId, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      mentorId,
    };

    axios
      .patch(`auth/assign/${startupId}`, data)
      .then((res) => {
        dispatch(stopLoader());
        dispatch(setUsers(res.data.users));
        callback({ success: true });
        console.log(res.data);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
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

export const addFeatures = (features, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());
    const data = {
      features,
    };
    axios
      .post("/auth/feature", data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true });
      })
      .catch((error) => {
        callback({ success: false });
        dispatch(stopLoader());
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

export const addCategory = (categories, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());
    const data = {
      categories,
    };
    axios
      .post("/auth/category", data)
      .then((res) => {
        callback({ success: true });
        dispatch(stopLoader());
      })
      .catch((error) => {
        callback({ success: false });
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

export const getCategories = () => {
  return (dispatch) => {
    axios
      .get("/auth/categories")
      .then((res) => {
        dispatch(setCategories(res.data.categories));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateUserDiagnostics = (diagnostics, callback) => {
  return (dispatch) => {
    dispatch(loaderAction());

    const data = {
      diagnostics,
    };

    axios
      .patch(`auth/diagnostics`, data)
      .then((res) => {
        dispatch(stopLoader());
        dispatch(setDiagnostics(res.data.user.diagnostics));
        callback({ success: true });
        // console.log(res.data.user.diagnostics);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
        console.log(error);
      });
  };
};

export const getUserDiagnostics = () => {
  return (dispatch) => {
    axios
      .get(`auth/user-diagnostics`)
      .then((res) => {
        dispatch(setCategories(res.data.diagnostics));
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
