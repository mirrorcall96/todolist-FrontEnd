import {
  CREATE_TODOLIST,
  DELETE_TODOLIST,
  FETCH_TODOLISTS,
  UPDATE_TODOLIST,
} from "./actions";

const initialState = {
  todolists: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOLISTS:
      return {
        ...state,
        todolists: action.payload,
      };
    case DELETE_TODOLIST:
      const myTodolists = state.todolists.filter(
        (todolist) => todolist.id !== action.payload
      );
      return {
        ...state,
        todolists: myTodolists,
      };
    case CREATE_TODOLIST:
      return {
        ...state,
        todolists: [...state.todolists, action.payload],
      };
    case UPDATE_TODOLIST:
      return {
        ...state,
        todolists: state.todolists.map((todolist) =>
          action.payload.id === todolist.id ? action.payload : todolist
        ),
      };
    default:
      return state;
  }
};
export default reducer;
