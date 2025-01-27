import { Tooltip } from "@material-ui/core";

export const getTodoData = (state) => {
  let todos = state.todo.todos;
  let { role, dbId } = state.login;
  if (role !== "Sadmin") {
    let too = todos.filter((e) => e.userName == dbId);
    return too;
  } else {
    return todos;
  }
};
