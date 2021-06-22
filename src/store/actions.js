import axios from "axios";

export const FETCH_TODOLISTS = "FETCH_TODOLISTS";
export const DELETE_TODOLIST = "DELETE_TODOLIST";
export const CREATE_TODOLIST = "CREATE_TODOLIST";
export const UPDATE_TODOLIST = "UPDATE_TODOLIST";

export const fetchTodolist = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/todolist");
    dispatch({
      type: FETCH_TODOLISTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTodolist = (todolistId) => async (dispatch) => {
  try {
    await axios.delete("http://localhost:8000/todolist/" + todolistId);
    dispatch({
      type: DELETE_TODOLIST,
      payload: todolistId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createTodolist = (newTodolist) => async (dispatch) => {
  try {
    const newTodolistBackend = await axios.post(
      "http://localhost:8000/todolist/",
      newTodolist
    );
    dispatch({
      type: CREATE_TODOLIST,
      payload: newTodolistBackend.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateTodolist = (todolistId, newTodolist) => async (dispatch) => {
  try {
    const newTodolistBackend = await axios.post(
      "http://localhost:8000/todolist/" + todolistId,
      newTodolist
    );
    dispatch({
      type: UPDATE_TODOLIST,
      payload: newTodolistBackend.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
