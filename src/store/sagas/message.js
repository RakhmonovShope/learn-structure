import {takeLatest, call, put, all} from "redux-saga/effects";

import messageActions from "../actions/message";
import { api, queryBuilder } from "services";


function* MainChatsRequest() {

  try {
    const { data } = yield call(api.request.get, queryBuilder(`/profile/chats`));

    yield put(messageActions.MainChats.success(data));

  } catch (e) {
    yield put(messageActions.MainChats.failure(e));
  } finally {
    yield put(messageActions.MainChats.fulfill());
  }
}

function* MainChatChildrenRequest(action) {

  const { id } = action.payload;
  let canId = (Number(id) !== 0) ? id : '';
  try {

    const { data } = yield call(api.request.get, queryBuilder(`/profile/chats/${canId}`));

    yield put(messageActions.MainChatChildren.success({
      id,
      data
    }));

  } catch (e) {
    yield put(messageActions.MainChatChildren.failure(e));
  } finally {
    yield put(messageActions.MainChatChildren.fulfill());
  }
}

function* ChatMessagesRequest(action) {

  const { chatId } = action.payload;

  try {

    const { data } = yield call(api.request.get, queryBuilder(`/profile/messages/${chatId}`, {include: "user", sort: 'id', limit: 50}));

    yield put(messageActions.ChatMessages.success({
      data: data.data,
      chatId: chatId
    }));

  } catch (e) {
    yield put(messageActions.ChatMessages.failure(e));
  } finally {
    yield put(messageActions.ChatMessages.fulfill());
  }
}

function* ProfileReplyMessageRequest(action) {

  const { cb, chatId, values } = action.payload;

  try {

    const { data } = yield call(api.request.post, queryBuilder(`/profile/reply/${chatId}`, {include: 'user'}), values);

    yield put(messageActions.ProfileReplyMessage.success({
      data:data,
      chatId
    }));
    yield call(cb.success, data);

  } catch (e) {
    yield put(messageActions.ProfileReplyMessage.failure(e));
    yield call(cb.error, e);
  } finally {
    yield put(messageActions.ProfileReplyMessage.fulfill());
  }
}


export default function* root() {
  yield all([
    takeLatest(messageActions.MainChats.REQUEST, MainChatsRequest),
    takeLatest(messageActions.MainChatChildren.REQUEST, MainChatChildrenRequest),
    takeLatest(messageActions.ChatMessages.REQUEST, ChatMessagesRequest),
    takeLatest(messageActions.ProfileReplyMessage.REQUEST, ProfileReplyMessageRequest),

  ]);
}