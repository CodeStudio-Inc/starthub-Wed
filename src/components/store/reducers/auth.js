import * as actions from "../actions";
import { updateObject } from "./utility";

const initialState = {
  all_users: [],
  userId: "",
  username: "",
  email: "",
  token: "",
  category: "",
  platformFeatures: [],
  features: [],
  diagnostics: [],
  categories: [],
  userRole: "",
  permissions: "",
  tokenExpiration: "",
  totalExpectedRevenueShare: 0,
  totalRevSharePaid: 0,
  totalRevenue: 0,
  totalExpense: 0,
  daysSinceLastSubmit: "",
  loanEligibility: "",
  loanEligibilityMsg: "",
  loanApplicationDate: "",
  eligibilityCheck: false,
  loading: false,
  authenticated: false,
  error: "",
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

    case actions.SET_USER:
      return updateObject(state, {
        loading: false,
        userId: action.userId,
        username: action.username,
        email: action.email,
        category: action.category,
        features: action.features,
        userRole: action.userRole,
        permissions: action.permissions,
        token: action.token,
        tokenExpiration: action.tokenExpiration,
        totalExpectedRevenueShare: action.totalExpectedRevenueShare,
        totalRevSharePaid: action.totalRevSharePaid,
        totalRevenue: action.totalRevenue,
        totalExpense: action.totalExpense,
        daysSinceLastSubmit: action.daysSinceLastSubmit,
        loanEligibility: action.loanEligibility,
        loanEligibilityMsg: action.loanEligibilityMsg,
        loanApplicationDate: action.loanApplicationDate,
        eligibilityCheck: action.eligibilityCheck,
        authenticated: true,
      });

    case actions.SET_ALL_USERS:
      return updateObject(state, {
        all_users: action.data,
      });

    case actions.SET_DIAGNOSTICS_TOOLS:
      return updateObject(state, {
        diagnostics: action.data,
      });

    case actions.SET_FEATURES:
      return updateObject(state, {
        platformFeatures: action.features,
      });

    case actions.SET_CATEGORIES:
      return updateObject(state, {
        categories: action.categories,
      });

    case actions.REMOVE_USER:
      return updateObject(state, {
        userId: "",
        email: "",
        token: "",
        authenticated: false,
        loading: false,
      });

    default:
      return state;
  }
};

export default auth;
