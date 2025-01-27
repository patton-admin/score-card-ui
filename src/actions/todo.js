/***
 * type: Action(User)
 * Operations : addTodo, deleteTodo, updateTodo
 */

import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  GET_ALL_TODO,
  GET_ALL_TODO_SUCCESS,
  GET_ALL_TODO_ERROR,
  UPDATE_TODO_MESSAGE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
} from "./action";

export const viewTodo = (payload = {}) => ({
  type: GET_ALL_TODO,
  todo: payload,
});
export const viewTodoSuccess = (payload = {}) => ({
  type: GET_ALL_TODO_SUCCESS,
  todo: payload,
});
export const viewTodoError = () => ({
  type: GET_ALL_TODO_ERROR,
});

//Add Todo...
export const addTodo = (payload = {}) => ({
  type: ADD_TODO,
  todo: payload,
});

export const addTodoSuccess = (payload = {}) => ({
  type: ADD_TODO_SUCCESS,
  todo: payload,
});

export const addTodoError = (payload = {}) => ({
  type: ADD_TODO_ERROR,
  message: payload,
});

//update Todo...
// export const updateTodo = (payload = {}) => ({
//   type: UPDATE_Todo,
//   todo: payload,
// });

// export const updateTodoSuccess = (payload = {}) => ({
//   type: UPDATE_Todo_SUCCESS,
//   todo: payload,
// });

// export const updateTodoFailure = (payload = {}) => ({
//   type: UPDATE_Todo_ERROR,
//   message: payload,
// });

export const updateTodoMessage = () => ({
  type: UPDATE_TODO_MESSAGE,
  message: "",
});

export const deleteTodo = ({ todoId } = {}) => ({
  type: DELETE_TODO,
  todoId,
});

export const deleteTodoSuccess = (payload = {}) => ({
  type: DELETE_TODO_SUCCESS,
  todoId: payload,
});

export const deleteTodoError = (payload = {}) => ({
  type: DELETE_TODO_ERROR,
  todoId: payload,
});
