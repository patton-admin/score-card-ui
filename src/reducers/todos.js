/****
 * candidate...
 */
import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  GET_ALL_TODO,
  GET_ALL_TODO_SUCCESS,
  GET_ALL_TODO_ERROR,
  UPDATE_TODO_MESSAGE,
} from "../actions/action";

//object...

const todo = {
  id: "",
  todoName: "",
  userName: "",
  userId: "",
  userEmail: "",
  startDate: "",
  endDate: "",
  shortDescription: "",
  LongDescription: "",
  comments: "",
  createdDate: "",
  updatedDate: "",
};

const initialStateValue = {
  todoLoading: false,
  todoError: false,
  message: "",
  todos: [],
};

export const todoReducer = (state = initialStateValue, action) => {
  // console.log("action from todo REducer...", action);
  switch (action.type) {
    case GET_ALL_TODO:
      return { ...state, todoLoading: true, todoError: false };
    case GET_ALL_TODO_SUCCESS:
      return {
        ...state,
        todos: action.todo,
        todoLoading: false,
        todoError: false,
      };
    case GET_ALL_TODO_ERROR:
      return { ...state, todoLoading: false, todoError: true };

    case ADD_TODO:
      return { ...state, todoLoading: true, todoError: false };
    case ADD_TODO_SUCCESS:
      let { id } = action.todo;
      let data = state.todos.filter((e) => e.id !== id);
      data = [...data, action.todo];
      return {
        ...state,
        todos: data,
        todoLoading: false,
        todoError: false,
      };
    case ADD_TODO_ERROR:
      return {
        ...state,
        todoLoading: false,
        todoError: true,
        message: action.message,
      };

    case UPDATE_TODO_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};
