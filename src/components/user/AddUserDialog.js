import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as Yup from "yup";
import { addUser, updateUser, updateUserMessage } from "../../actions/user";
import { openModal } from "../../actions/util";
import "./../../styles/candidate.css";
import UserForm from "./userForm";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const initialUserValue = {
  userId: "",
  userLoginId: "",
  userEmail: "",
  userPassword: "",
  userFirstName: "",
  userLastName: "",
  userPrimaryPhone: "",
  userSecondaryPhone: "",
  userLocation: "",
  country: "",
  userRole: "",
  resetQuestion1: "",
  resetQuestion2: "",
  resetans1: "",
  resetans2: "",
  createdBy: "",
  updatedBy: "",
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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userValidationSchema = {
  userFirstName: Yup.string()
    .max(25, "Not More than 25ch")
    .required("First Name is required"),
  userLastName: Yup.string()
    .max(25, "Not More than 25ch")
    .required("Last Name is required"),
  userPrimaryPhone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(14, "Phone number is not valid")
    .required("Phone is required"),
  userSecondaryPhone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(14, "Phone number is not valid")
    .nullable(),
  userPassword: Yup.string()
    .min(6, "pwd More than 6 characters")
    .required("Password is required"),
  userRole: Yup.string().required("User role is required"),
  userEmail: Yup.string()
    .max(50, "No More than 50")
    .required("Email is required"),
  userLoginId: Yup.string()
    .required("Login Id is required")
    .max(50, "No More than 50"),
  resetQuestion1: Yup.string()
    .max(100, "No More than 100")
    .required("Reset Q1 is required"),
  resetQuestion2: Yup.string()
    .max(100, "No More than 100")
    .required("Reset Q2 is required"),
  resetans1: Yup.string()
    .max(25, "No More than 25")
    .required("Reset Ans1 is required"),
  resetans2: Yup.string()
    .max(25, "No More than 25")
    .required("Reset Ans2 is required"),
  userLocation: Yup.string()
    .max(30, "No More than 30")
    .required("User Location is required"),
};

const AddUserDialog = (props) => {
  const {
    isOpen,
    initialVal,
    createdBy,
    message,
    //from toolbar rest...
    addHandler,
    internData,
    title,
    isView,
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
    dispatch(updateUserMessage());
  };

  const handleAdd = (value) => {
    try {
      console.log("value that are submitted...", value);
      if (value.hasOwnProperty("userId") && value["userId"] !== "") {
        //only during edition
        dispatch(addUser(value));
        value.createdBy = createdBy;
        value.updatedBy = createdBy;
        let handleProp = {};
        handleProp.isEditing = true;
        handleProp.forComp = "User";
        addHandler(value, handleProp);
      } else {
        dispatch(addUser(value));
        addHandler(value);
      }
    } catch (e) {
      console.log("error occured while submitting the record in User...");
    }
  };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton size="medium" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
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
                color: "#606468",
                fontWeight: "bolder",
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent>
          {message !== undefined && Object.keys(message).length > 0 && (
            <Alert onClose={onCloseAlert} severity="info" varient="outlined">
              Message:
              {message !== null ? `${message}` : "Please validate your inputs"}
            </Alert>
          )}
          <Formik
            initialValues={isOpen !== true ? initialUserValue : initialVal}
            validationSchema={Yup.object(userValidationSchema)}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("values...", values);
              handleAdd(values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <MuiThemeProvider theme={THEME}>
                  <UserForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    handleClose={handleClose}
                    isEdit={Object.keys(initialVal).length === 0 ? false : true}
                    isView={isView}
                  />

                  {/* <pre> {JSON.stringify(values, null, 2)}</pre> */}
                  {/* <pre> {JSON.stringify(errors, null, 2)}</pre> */}
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

// const isOpen = useSelector((state) => state.util.isOpen);
// const initialVal = useSelector((state) => state.util.initialVal);
// const createdBy = useSelector((state) => state.login.user_id);
// const message = useSelector((state) => state.user.message);

const mapStateToProps = (state) => {
  return {
    isOpen: state.util.isOpen,
    isView: state.util.isView,
    initialVal: state.util.initialVal,
    createdBy: state.login.user_id,
    message: state.user.message,
  };
};

export default connect(mapStateToProps, null)(AddUserDialog);
