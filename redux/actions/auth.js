// Types
export const types = {
  // ---- USERINFO-------
  SET_USER_DATA: "SET_USER_DATA",
  // ---  LOGOUT--------
  ON_LOGOUT: "ON_LOGOUT",
};

export const authIntialState = {
  user: null,
};

// Reducer
const AuthReducer = (state = authIntialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return { ...state, user: action.payload };

    case types.ON_LOGOUT:
      console.log("eneter here logout");
      
      return { ...state, user: null };

    default:
      return state;
  }
};

export default AuthReducer;

// Actions

export const actions = {
  // --- SET USER DETAIL
  setUserDetail: (payload) => ({
    type: types.SET_USER_DATA,
    payload,
  }),

  // ---USER LOGOUT--------

  onLogout: () => ({
    type: types.ON_LOGOUT,
  }),
};
