// Types
export const types = {
  // ---- DOCTOR DETAIL-------

  SET_DOCTOR_DETAIL: "SET_DOCTOR_DETAIL",

  //  ---- APPOINTMENT TYPE -----------

  SET_APPOINTMENT_TYPE: "SET_APPOINTMENT_TYPE",

  // ------ ON MODIFY -------------

  ON_MODIFY: "ON_MODIFY",

  SET_DOCTOR_DETAIL_WHOLE_CONTENT: "SET_DOCTOR_DETAIL_WHOLE_CONTENT",
};

export const appIntialState = {
  selectedDoctor: null,
  appointmentType: 1,
  isModify: false,
  doctorData: null,
};

// Reducer
const AppReducer = (state = appIntialState, action) => {
  switch (action.type) {
    case types.SET_DOCTOR_DETAIL:
      return { ...state, selectedDoctor: action.payload };

    case types.SET_APPOINTMENT_TYPE:
      return { ...state, appointmentType: action.payload };

    case types.ON_MODIFY:
      return { ...state, isModify: action.payload };

    case types.SET_DOCTOR_DETAIL_WHOLE_CONTENT:
      return { ...state, doctorData: action.payload };

    default:
      return state;
  }
};

export default AppReducer;

// Actions

export const appActions = {
  // --- SET DOCTOR DETAIL
  setDoctorDetail: (payload) => ({
    type: types.SET_DOCTOR_DETAIL,
    payload,
  }),

  setDoctorDetailWholeContent: (payload) => ({
    type: types.SET_DOCTOR_DETAIL_WHOLE_CONTENT,
    payload,
  }),
  //  ---- APPOINTMENT TYPE -----------

  setAppointmentType: (payload) => ({
    type: types.SET_APPOINTMENT_TYPE,
    payload,
  }),

  // ------ ON MODIFY -------------

  onModifyItem: (payload) => ({
    type: types.ON_MODIFY,
    payload,
  }),
};
