import { createRoutine } from "redux-saga-routines";

const MessageSendToUser = createRoutine("MESSAGE_SEND_TO_USER");
const MainChats = createRoutine("MAIN_CHATS");
const MainChatChildren = createRoutine("MAIN_CHAT_CHILDREN");
const ChatMessages = createRoutine("CHAT_MESSAGES");
const ProfileReplyMessage = createRoutine("PROFILE_REPLY_MESSAGE");

export default {
  MessageSendToUser,
  MainChats,
  MainChatChildren,
  ChatMessages,
  ProfileReplyMessage
};

