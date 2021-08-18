import { createRoutine } from "redux-saga-routines";

const GetMeRequest = createRoutine("GET_ME");
const Logout = createRoutine("LOGOUT");
const SetToken = createRoutine("SET_TOKEN");
const Login = createRoutine("LOGIN");

const UpdateUser = createRoutine("UPDATE_USER");

export default {
  GetMeRequest,
  Logout,
  SetToken,
  Login,
  UpdateUser
};
