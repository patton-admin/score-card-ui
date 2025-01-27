import { call, put, takeLatest } from "redux-saga/effects";
import {
  addTodo,
  addTodoSuccess,
  addTodoError,
  viewTodo,
  viewTodoSuccess,
  viewTodoError,
  deleteTodo,
  deleteTodoError,
  deleteTodoSuccess,
} from "../actions/todo";
import { openModal } from "../actions/util";
import { addTodoApi, getAllTodo, deleteTodoApi } from "../api/api";

export function* getAllTodoEffect() {
  try {
    const { status, data } = yield call(getAllTodo, { method: "get" });
    if (status === 200 && data !== undefined) {
      yield put(viewTodoSuccess(data));
    } else {
      yield put(
        viewTodoError(
          data.message === null ? "Unknown-Error Ocurred..." : data.message
        )
      );
    }
  } catch {
    yield put(viewTodoError());
  }
}

export function* getAllTodoWatcher() {
  yield takeLatest("GET_ALL_TODO", getAllTodoEffect);
}

//to add a new Todo...
export function* addTodoEffect(todoAction) {
  let { todo } = todoAction;
  try {
    const { status, data } = yield call(addTodoApi, todo);
    if (status === 200 && data !== undefined) {
      yield put(addTodoSuccess(data));
      yield put(openModal({ initialVal: {}, isOpen: false }));
    } else {
      yield put(addTodoError(data.message));
    }
  } catch {
    yield put(addTodoEffect());
  }
}

export function* addTodoWatcher() {
  yield takeLatest("ADD_TODO", addTodoEffect);
}

export function* deleteTodoEffect(id) {
  const { TodoId } = id;
  console.log("id... for deleting the Todo...", TodoId);
  try {
    const { status, data } = yield call(deleteTodoApi, TodoId);
    if (status === 200 && data !== undefined) {
      yield put(deleteTodoSuccess(TodoId));
    } else {
      yield put(deleteTodoError(data));
    }
  } catch (e) {
    yield put(deleteTodoError());
  }
}

export function* deleteTodoWatcher() {
  yield takeLatest("DELETE_TODO", deleteTodoEffect);
}
