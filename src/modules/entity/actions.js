import { createRoutine } from "redux-saga-routines";

const LoadAll = createRoutine("LOAD_ALL_ENTITY");
const LoadOne = createRoutine("LOAD_ONE_ENTITY");
const Form = createRoutine("FORM_ENTITY");
const LoadInfo = createRoutine("LOAD_INFO_ENTITY");
const LoadDefault = createRoutine("LOAD_DEFAULT");
const FormDefault = createRoutine("FORM_DEFAULT");
const Append = createRoutine("APPEND_ENTITY");
export default {
  LoadAll,
  LoadOne,
  Form,
  LoadInfo,
  LoadDefault,
  FormDefault,
  Append
};
