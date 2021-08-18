import { takeLatest, put, all, call } from "redux-saga/effects";
import { storage, api, queryBuilder } from "services";
import authActions from "../actions/auth";
import get from "lodash/get";

export function* GetMeRequest() {
  try {
    const { data } = yield call(api.request.get, queryBuilder("/user/get-me", { include: "image" }));
    yield put(
      authActions.GetMeRequest.success({
        data
      })
    );
  } catch (error) {
    yield put(
      authActions.GetMeRequest.failure({
        error
      })
    );
  }
}

export function* Login(action) {
  const { values, cb } = action.payload;
  try {
    yield put(authActions.Login.request());

    const { data } = yield call(api.request.post, "user/sign-in-phone", values);

    yield put(authActions.Login.success(data));
    storage.set("token", get(data, "token"));
    yield call(cb.success);
  } catch (error) {
    yield call(cb.error, get(error, ["response", "data"]));
    yield put(authActions.Login.failure(error));
  } finally {
    yield put(authActions.Login.fulfill());
  }
}

export function* Logout() {
  yield call(storage.remove, "token");
}

export default function* root() {
  yield all([
    takeLatest(authActions.GetMeRequest.TRIGGER, GetMeRequest),
    takeLatest(authActions.Logout.REQUEST, Logout),
    takeLatest(authActions.Login.TRIGGER, Login)
  ]);
}
