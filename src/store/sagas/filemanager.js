import { takeEvery, call, put, all } from "redux-saga/effects";

import { api, queryBuilder } from "services";

import filemanagerActions from "../actions/filemanager";

function* UploadImage(action) {
  const { image, cb } = action.payload;

  try {
    yield put(filemanagerActions.UploadImage.request());

    const { data } = yield call(api.request.post, queryBuilder("/filemanager/uploads"), image);

    yield put(filemanagerActions.UploadImage.success({ image: data }));
    yield call(cb.success, data);
  } catch (e) {
    yield put(filemanagerActions.UploadImage.failure(e));
    yield call(cb.failure);
  } finally {
    yield put(filemanagerActions.UploadImage.fulfill());
    yield call(cb.finally);
  }
}

function* DeleteImage(action) {
  const { imageId } = action.payload;

  try {
    yield put(filemanagerActions.UploadImageDelete.request());

    yield call(api.request.delete, queryBuilder(`/filemanager/${imageId}`));
  } catch (e) {
    yield put(filemanagerActions.UploadImageDelete.failure(e));
  } finally {
    yield put(filemanagerActions.UploadImageDelete.fulfill());
  }
}

export default function* root() {
  yield all([
    takeEvery(filemanagerActions.UploadImage.TRIGGER, UploadImage),
    takeEvery(filemanagerActions.UploadImageDelete.TRIGGER, DeleteImage)
  ]);
}
