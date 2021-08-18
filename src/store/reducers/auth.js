import authActions from "../actions/auth";

const initialState = {
  user: null,
  isFetched: false,
  isAuthenticated: false,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.GetMeRequest.SUCCESS:
      return {
        ...state,
        isFetched: true,
        isAuthenticated: true,
        user: action.payload.data
      };
    case authActions.GetMeRequest.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetched: true,
        user: {}
      };

    case authActions.SetToken.TRIGGER: {
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true
      };
    }

    case authActions.Logout.REQUEST: {
      return {
        user: null,
        isFetched: false,
        isAuthenticated: false,
        token: null
      };
    }
    case authActions.Login.REQUEST: {
      return { ...state, isAuthenticated: false };
    }

    case authActions.Login.SUCCESS: {
      const { token, user } = action.payload;
      return { ...state, token, isFetched: true, isAuthenticated: true, user };
    }

    case authActions.Login.FAILURE: {
      return { ...state, isFetched: true, isAuthenticated: false };
    }

    default:
      return state;
  }
};
