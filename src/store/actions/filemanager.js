import { createRoutine } from "redux-saga-routines";

const UploadImage = createRoutine("UPLOAD_IMAGES");

const UploadImagesClear = createRoutine("UPLOAD_IMAGES_CLEAR");

const UploadImageDelete = createRoutine("UPLOAD_IMAGES_DELETE");

const SetInitialImages = createRoutine("SET_INITIAL_IMAGES");

export default {
  UploadImage,
  UploadImagesClear,
  UploadImageDelete,
  SetInitialImages
};
