import { ActionTypes } from "../constants/auth-action-types";

const initialStateAuth = {
  isAuthenticated: null,
  user: { username: "", attributes: { email: "" } },
  cognitoGroup: [null],
};

export const authReducer = (state = initialStateAuth, { type, payload }) => {
  switch (type) {
    case ActionTypes.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ActionTypes.SIGN_IN_SUCCESS:
    case ActionTypes.GOOGLE_AUTH_SUCCESS:
    case ActionTypes.FACEBOOK_AUTH_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case ActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case ActionTypes.USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
        cognitoGroup:
          payload.signInUserSession.accessToken.payload["cognito:groups"],
      };
    case ActionTypes.AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        cognitoGroup: ["unAuthenticated"],
      };
    case ActionTypes.USER_LOADED_FAIL:
      return {
        ...state,
        user: { username: "", attributes: { email: "" } },
        cognitoGroup: ["unAuthenticated"],
      };
    case ActionTypes.GOOGLE_AUTH_FAIL:
    case ActionTypes.FACEBOOK_AUTH_FAIL:
    case ActionTypes.SIGN_IN_FAIL:
    case ActionTypes.SIGN_UP_FAIL:
    case ActionTypes.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: { username: "", attributes: { email: "" } },
        cognitoGroup: ["unAuthenticated"],
      };
    case ActionTypes.PASSWORD_RESET_SUCCESS:
    case ActionTypes.PASSWORD_RESET_FAIL:
    case ActionTypes.PASSWORD_RESET_CONFIRM_SUCCESS:
    case ActionTypes.PASSWORD_RESET_CONFIRM_FAIL:
    case ActionTypes.ACTIVATION_SUCCESS:
    case ActionTypes.ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
