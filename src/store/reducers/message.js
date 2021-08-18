import uniqBy from "lodash/uniqBy";
import get from "lodash/get";

import messageActions from "../actions/message";

const initialState = {
  mainChats: {
    isFetched: false,
    data: {}
  },
  chatGroupsByCompany: {},
  chatMessagesByChatId: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case messageActions.ProfileReplyMessage.SUCCESS: {
      const {chatId, data} = action.payload;
      return {
        ...state,
        chatMessagesByChatId: {
          ...state.chatMessagesByChatId,
          [chatId]: uniqBy([
            ...get(state.chatMessagesByChatId, chatId, []),
            data
          ], 'id')
        }
      };
    }
    case messageActions.MainChats.REQUEST: {
      return {
        ...state,
        mainChats: {
          isFetched: false,
          data: {}
        }
      };
    }
    case messageActions.MainChats.SUCCESS: {
      return {
        ...state,
        mainChats: {
          isFetched: true,
          data: action.payload.data
        }
      };
    }
    case messageActions.MainChatChildren.SUCCESS: {
      const {id, data} = action.payload;
      return {
        ...state,
        chatGroupsByCompany: {
          ...state.chatGroupsByCompany,
          [id]: data
        }
      };
    }
    case messageActions.ChatMessages.SUCCESS: {
      const {chatId, data} = action.payload;
      return {
        ...state,
        chatMessagesByChatId: {
          ...state.chatMessagesByChatId,
          [chatId]: uniqBy([
            ...get(state.chatMessagesByChatId, chatId, []),
            ...data
          ], 'id')
        }
      };
    }

    default:
      return state;
  }
};
