import { takeLatest, call, put, all } from "redux-saga/effects";

import { api, queryBuilder, storage } from "services";
import systemActions from "../actions/system";

function* LoadSocialSettings() {
  const { LoadSocialSettings } = systemActions;
  try {
    yield put(LoadSocialSettings.request());

    const { data } = yield call(api.request.post, queryBuilder("/settings/contact"));

    yield put(LoadSocialSettings.success(data));
  } catch (e) {
    yield put(LoadSocialSettings.failure(e));
  } finally {
    yield put(LoadSocialSettings.fulfill());
  }
}

function* getRegionsAction({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(api.request.get, queryBuilder(`/counts/info-counts/${id}`));

    yield put(systemActions.getRegions.success(data));
  } catch (e) {
    yield put(systemActions.getRegions.failure(e));
  } finally {
    yield put(systemActions.getRegions.fulfill());
  }
}

function* ChangeLanguage(action) {
  storage.set("language", action.payload);
  yield put(systemActions.ChangeLanguage.success());
}

function* SetPhoneView({ payload }) {
  try {
    yield call(api.request.post, queryBuilder(`/doctor/show-phone/${payload}`));

    yield put(systemActions.SetPhoneView.success(payload));
  } catch (e) {
    yield put(systemActions.SetPhoneView.failure(e));
  }
}

function* SetVacancyPhone({ payload }) {
  try {
    yield call(api.request.post, queryBuilder(`/vacation/count-view/${payload}`));
    yield put(systemActions.SetPhoneVacancy.success(payload));
  } catch (e) {
    yield put(systemActions.SetPhoneVacancy.failure(e));
  }
}

function* DeleteFile(action) {
  const { id, cb } = action.payload;

  try {
    yield put(systemActions.DeleteFile.request());
    const { data } = yield call(api.request.delete, queryBuilder(`/filemanager/${id}`));
    yield put(systemActions.DeleteFile.success({ files: data }));
    yield call(cb.success, data);
  } catch (e) {
    yield put(systemActions.DeleteFile.failure(e));
    yield call(cb.failure, e);
  } finally {
    yield put(systemActions.DeleteFile.fulfill());
    yield call(cb.finally);
  }
}

function* UploadFile(action) {
  const { files, cb } = action.payload;

  try {
    const { data } = yield call(api.request.post, queryBuilder("/filemanager/uploads"), files);

    yield put(systemActions.UploadFile.success({ files: data }));
    yield call(cb.success, data);
  } catch (e) {
    yield put(systemActions.UploadFile.failure(e));
    yield call(cb.failure, e);
  } finally {
    yield put(systemActions.UploadFile.fulfill());
    yield call(cb.finally);
  }
}

export default function* root() {
  yield all([
    takeLatest(systemActions.ChangeLanguage.TRIGGER, ChangeLanguage),
    takeLatest(systemActions.LoadSocialSettings.TRIGGER, LoadSocialSettings),
    takeLatest(systemActions.getRegions.TRIGGER, getRegionsAction),
    takeLatest(systemActions.SetPhoneView.TRIGGER, SetPhoneView),

    takeLatest(systemActions.UploadFile.TRIGGER, UploadFile),
    takeLatest(systemActions.DeleteFile.TRIGGER, DeleteFile),
    takeLatest(systemActions.SetPhoneVacancy.TRIGGER, SetVacancyPhone)
  ]);
}
