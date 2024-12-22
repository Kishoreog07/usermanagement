const initialState = {
  token: null,
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, token: action.payload.token, error: null };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload, error: null };
    case "FETCH_USERS_FAILURE":
      return { ...state, error: action.payload };
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
      };
    case "CREATE_USER_FAILURE":
      return { ...state, error: action.payload };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        error: null,
      };
    case "UPDATE_USER_FAILURE":
      return { ...state, error: action.payload };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };
    case "DELETE_USER_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
