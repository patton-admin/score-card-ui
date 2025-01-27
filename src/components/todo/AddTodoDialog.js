import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { Form, Formik } from "formik";
import React from "react";
import { connect, useDispatch } from "react-redux";
import * as Yup from "yup";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { addTodo, updateTodoMessage } from "../../actions/todo";
import { openModal } from "../../actions/util";
import { getAvailableUsers } from "./../../selectors/selectUsers";
import { getAvailablePriority } from "./../../selectors/selectUtils";
import TodoForms from "./TodoForms";
import moment from "moment";

let date = moment().format("MM/DD/YYYY");

const initialTodoValue = {
  id: "",
  todoName: "",
  userName: "",
  userId: "",
  userEmail: "",
  startDate: moment().format("MM/DD/YYYY").toString(),
  endDate: moment().add(1, "day").format("MM/DD/YYYY").toString(),
  priority: "",
  shortDescription: "",
  LongDescription: "",
  comments: "",
  createdDate: "",
  updatedDate: "",
};

const THEME = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      // light: "rgba(225, 110, 28, 0.91)",
      main: "rgba(0, 38, 88, 0.91)",
      // dark: "rgba(225, 110, 28, 0.91)",
      contrastText: "#fff",
    },
  },
});

const todoValidationSchema = {
  // todoName: Yup.string()
  //   .required("Todo Name is Required")
  //   .max(50, "No More than 50Ch"),
};

const AddTodoDialog = (props) => {
  //getting props...
  const {
    isOpen,
    initialVal,
    role,
    availableBuckets,
    userId,
    message,
    //from toolbar rest...
    addHandler,
    internData,
    title,
    isView,
    userList,
    users,
    priority,
  } = props;

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(openModal({ initialVal: {}, isOpen: true }));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openModal({ initialVal: {}, isOpen: false }));
  };

  const onCloseAlert = () => {
    dispatch(updateTodoMessage());
  };

  const handleAdd = (value) => {
    if (value.userEmail !== undefined) {
      let x = userList.filter((e) => e.userId === value.userEmail);
      value.userName = x.length === 1 ? x[0].id : 0;
    }

    console.log("value that are submitted...", value);
    try {
      if (value.hasOwnProperty("id") && value.id !== "") {
        dispatch(addTodo(value));
        let handleProp = {};
        handleProp.isEditing = true;
        handleProp.forComp = "Todo";
        addHandler(value, handleProp);
        console.log("you have to edit it here...for todo");
      } else {
        dispatch(addTodo(value));
        addHandler(value);
      }
    } catch (e) {
      console.log("error from todo...", e);
    }
  };

  return (
    <div>
      {role === "Sadmin" && (
        <Tooltip title="Add">
          <IconButton size="medium" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        style={{ height: "96%", marginTop: "3%", marginBottom: "-5%" }}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{
            color: "rgba(0, 38, 88, 0.91)",
            fontSize: "18px",
            paddingTop: "40px",
            fontWeight: "bolder",
            borderBottom: "1px solid #cccfd2",
            // border-bottom: 1px solid var(--border-color)
          }}
          disableTypography="true"
        >
          {title}
          {isOpen ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{
                float: "right",
                color: "rgba(0, 38, 88, 0.91)",
                fontWeight: "bolder",
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent>
          {message !== "" && (
            <Alert onClose={onCloseAlert} severity="info" varient="outlined">
              Message:
              {message !== null ? message : "Please validate your inputs"}
            </Alert>
          )}
          {/****Formik for handling the form******/}
          <Formik
            initialValues={
              Object.keys(initialVal).length === 0
                ? initialTodoValue
                : initialVal
            }
            validationSchema={Yup.object(todoValidationSchema)}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("values...", values);
              handleAdd(values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <MuiThemeProvider theme={THEME}>
                  <TodoForms
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    handleClose={handleClose}
                    availableBuckets={availableBuckets}
                    isEdit={Object.keys(initialVal).length <= 1 ? false : true}
                    role={role}
                    userId={userId}
                    isView={isView}
                    userList={userList}
                    priority={priority}
                  />

                  {/* <pre> {JSON.stringify(values, null, 2)}</pre>*/}
                  {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                </MuiThemeProvider>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.util.isOpen,
    isView: state.util.isView,
    initialVal: state.util.initialVal,
    message: state.client.message,
    role: state.login.role,
    userId: state.login.dbId,
    userList: getAvailableUsers(state.user.users),
    priority: getAvailablePriority(),
    users: state.user.users,
  };
};

export default connect(mapStateToProps)(AddTodoDialog);
