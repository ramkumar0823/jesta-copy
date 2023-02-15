import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  doctorID: '',
  hospitalID: '',
  loginUserId: '',
  roleID: '',
  mobNumber: '',
  otpresponse: '',
  parameters: '',
  projects: '',
  location: '',
};

const userSlicer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setDoctorID: (state, action) => ({...state, doctorID: action.payload}),
    setHospitalID: (state, action) => ({...state, hospitalID: action.payload}),
    setLoginUserId: (state, action) => ({
      ...state,
      loginUserId: action.payload,
    }),
    setRoleID: (state, action) => ({...state, roleID: action.payload}),
    setMobNumber: (state, action) => ({...state, mobNumber: action.payload}),
    setOtpResponse: (state, action) => ({
      ...state,
      otpresponse: action.payload,
    }),
    setUser: (state, action) => ({...state, parameters: action.payload}),
    setProjects: (state, action) => ({...state, projects: action.payload}),
    setLocation: (state, action) => ({...state, location: action.payload}),
  },
});
export default userSlicer.reducer;

export const {
  setRoleID,
  setHospitalID,
  setDoctorID,
  setMobNumber,
  setOtpResponse,
  setLocation,
  setUser,
  setProjects,
  setLoginUserId,
} = userSlicer.actions;
