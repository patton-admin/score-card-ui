import React from "react";
import _ from "lodash";
import { Button, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./../../styles/candidate.css";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      width: "30ch",
    },
  },
  input: {
    backgroundColor: "#dcebec",
  },
}));

const TodoForms = (props) => {
  const {
    values,
    role,
    handleChange,
    handleBlur,
    errors,
    userId,
    touched,
    handleClose,
    isEdit,
    isView,
    userList,
    priority,
  } = props;
  const classes = useStyles();

  return (
    <div style={{ alignContent: "center", backgroundColor: "#f6f7f7" }}>
      {isEdit === false && isView === false && (
        <h3
          style={{
            alignContent: "center",
            color: "#606468",
            paddingTop: "30px",
            marginLeft: "30%",
            marginRight: "30%",
            paddingLeft: "10px",
          }}
        >
          Create Todo
        </h3>
      )}
      {isEdit === true && isView === false && (
        <h3
          style={{
            alignContent: "center",
            color: "#606468",
            paddingTop: "30px",
            marginLeft: "30%",
            marginRight: "30%",
            paddingLeft: "10px",
          }}
        >
          Edit Todo Information
        </h3>
      )}
      {isView === true && (
        <h3
          style={{
            alignContent: "center",
            color: "#606468",
            paddingTop: "30px",
            marginLeft: "30%",
            marginRight: "30%",
            paddingLeft: "10px",
          }}
        >
          View Todo Information
        </h3>
      )}
      <table
        className="table table-bordered"
        style={{ cellSpacing: "5", width: "100%" }}
      >
        <tbody>
          <tr>
            <td className="candidate-align">
              <TextField
                name="todoName"
                label="Todo Name"
                size="medium"
                margin="dense"
                required
                helperText={errors.todoName ? `${errors.todoName}` : null}
                error={touched.todoName && errors.todoName}
                variant="outlined"
                value={values.todoName || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView || role !== "Sadmin" ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>

            <td className="candidate-align">
              <TextField
                select
                name="userEmail"
                autoFocus
                required
                variant="outlined"
                margin="dense"
                label="userEmail"
                value={values.userEmail}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView || role !== "Sadmin" ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                error={
                  touched.userEmail &&
                  errors.userEmail &&
                  values.userEmail === "SELECT"
                }
                helperText={errors.userEmail ? `${errors.userEmail}` : null}
              >
                {(values.userEmail === "" || values.userEmail === null) && (
                  <MenuItem value={"SELECT"}>Select User</MenuItem>
                )}
                {userList.map((e) => (
                  <MenuItem value={e.userId}>{e.userId}</MenuItem>
                ))}
              </TextField>
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <FormControl style={{ minWidth: "226px" }}>
                <TextField
                  type="date"
                  variant="outlined"
                  name="startDate"
                  label="StartDate"
                  placeholder="Start Date"
                  size="medium"
                  margin="dense"
                  error={touched.startDate && Boolean(errors.startDate)}
                  value={
                    values.startDate !== undefined
                      ? moment(values.startDate).format("YYYY-MM-DD").toString()
                      : ""
                  }
                  disabled={isView || isEdit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
            </td>
            <td className="candidate-align">
              <FormControl style={{ minWidth: "226px" }}>
                <TextField
                  type="date"
                  variant="outlined"
                  name="endDate"
                  label="EndDate"
                  a
                  placeholder="End Date"
                  size="medium"
                  margin="dense"
                  disabled={isView || isEdit}
                  error={touched.endDate && Boolean(errors.endDate)}
                  value={
                    values.endDate !== undefined
                      ? moment(values.endDate).format("YYYY-MM-DD").toString()
                      : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
            </td>
          </tr>
          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                name="shortDescription"
                label="Short Description"
                size="medium"
                margin="dense"
                value={values.shortDescription}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView || role !== "Sadmin" ? true : false}
                error={touched.shortDescription && errors.shortDescription}
                helperText={
                  errors.shortDescription ? `${errors.shortDescription}` : null
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>
            <td className="candidate-align">
              <FormControl style={{ minWidth: "226px" }}>
                <TextField
                  select
                  variant="outlined"
                  name="priority"
                  label="Priority"
                  size="medium"
                  margin="dense"
                  value={values.priority}
                  disabled={isView || isEdit}
                  InputProps={{
                    className: classes.input,
                  }}
                  // disabled={role !== "sadmin" ? true : false}
                  error={touched.priority && errors.priority}
                  helperText={errors.priority ? `${errors.priority}` : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(values.priority === "" || values.priority === null) && (
                    <MenuItem value={"SELECT"}>Select Priority</MenuItem>
                  )}
                  {priority.map((e) => (
                    <MenuItem value={e.pid}>{e.priorityType}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </td>
          </tr>
          <div style={{ paddingLeft: "20px", width: "193%" }}>
            <TextField
              variant="outlined"
              name="longDescription"
              label="Todo Description"
              size="medium"
              margin="dense"
              multiline
              rows={4}
              fullWidth
              value={values.longDescription}
              InputProps={{
                className: classes.input,
              }}
              disabled={isView || role !== "Sadmin" ? true : false}
              error={touched.longDescription && errors.longDescription}
              helperText={
                errors.longDescription ? `${errors.longDescription}` : null
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div style={{ paddingLeft: "20px", width: "193%" }}>
            <TextField
              variant="outlined"
              id="comments"
              name="comments"
              label="Comments"
              size="medium"
              margin="dense"
              multiline
              rows={4}
              fullWidth
              required
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.comments ? `${errors.comments}` : null}
              error={touched.comments && errors.comments}
              value={values.comments}
              disabled={isView}
              InputProps={{
                className: classes.input,
              }}
            />
          </div>
          <tr>
            <td className="candidate-align">
              <TextField
                select
                name="status"
                autoFocus
                variant="outlined"
                margin="dense"
                label="Status"
                value={values.status}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth={true}
                error={
                  touched.status && errors.status && values.status === "SELECT"
                }
                helperText={errors.status ? `${errors.status}` : null}
              >
                {(values.status === "" || values.status === null) && (
                  <MenuItem value={"SELECT"}>Select User</MenuItem>
                )}
                <MenuItem value={"assigned"}>Assigned</MenuItem>
                <MenuItem value={"notStarted"}>Not Started</MenuItem>
                <MenuItem value={"inProgress"}>In Progress</MenuItem>
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
                <MenuItem value={"due"}>Due Today</MenuItem>
                <MenuItem value={"over-Due"}>Over-Due</MenuItem>
                <MenuItem value={"reviewed"}>Reviewed</MenuItem>
                <MenuItem value={"closed"}>Closed</MenuItem>
              </TextField>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <pre> {JSON.stringify(values, null, 2)}</pre>
      <pre> {JSON.stringify(errors, null, 2)}</pre> */}
      {isView === false && (
        <div style={{ paddingTop: "4%", paddingRight: "20px" }}>
          {!isEdit && values.id === "" && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Create Todo
            </Button>
          )}
          {isEdit && values.id !== "" && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              // disabled="true"
              style={{ float: "right" }}
            >
              Edit Todo
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoForms;
