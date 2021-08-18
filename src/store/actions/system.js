import { createRoutine } from "redux-saga-routines";

const ChangeLanguage = createRoutine("CHANGE_LANGUAGE");
const SetRegionId = createRoutine("SET_REGION_ID");
const LoadSocialSettings = createRoutine("LOAD_SOCIAL_SETTINGS");
const Reset = createRoutine("RESET");
const UpdateProfile = createRoutine("UPDATE_PROFILE");
const Subscribe = createRoutine("SUBSCRIBE");
const AlertAction = createRoutine("ALERT_ACTION");
const getRegions = createRoutine("GET_REGIONS");
const SetPhoneView = createRoutine("SET_PHONE_VIEW");
const SetPhoneVacancy = createRoutine("PHONE_VIEW_VACANCY");
const Callback = createRoutine("CALLBACK");
const UploadFile = createRoutine("UPLOAD_FILE");
const DeleteFile = createRoutine("DELETE_FILE");
const toggleModal = createRoutine("TOGGLE_MODAL");
const setPageTitle = createRoutine("SET_PAGE_TITLE");

export default {
  ChangeLanguage,
  SetRegionId,
  Reset,
  LoadSocialSettings,
  UpdateProfile,
  Subscribe,
  AlertAction,
  getRegions,
  SetPhoneView,
  Callback,
  UploadFile,
  DeleteFile,
  toggleModal,
  setPageTitle,
  SetPhoneVacancy
};
