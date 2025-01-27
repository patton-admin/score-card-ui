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
import { addLov, viewLov } from "../../actions/util";
import { openModal } from "../../actions/util";
import "./../../styles/candidate.css";
import LovForm from "./LovForm";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const initialLovValue = {
  prAreaid: "",
  practiceArea: "",
  status: true,
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

const LovValidationSchema = {
  prAreaid: Yup.string()
    .max(25, "Not More than 25ch")
    .required("Practice Area Key is required"),
  practiceArea: Yup.string()
    .max(100, "Not More than 100ch")
    .required("Practice Area is required"),
};

const AddLovDialog = (props) => {
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
    // dispatch(updateLovMessage());
  };

  const handleAdd = (value) => {
    try {
      console.log("value that are submitted...", value);
      //for both editing and adding
      dispatch(addLov(value));
      let handleProp = {};
      handleProp.isEditing = true;
      handleProp.forComp = "Lov";
      addHandler(value, handleProp);
    } catch (e) {
      console.log("error occured while submitting the record in Lov...");
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
            initialValues={
              Object.keys(initialVal).length === 0
                ? initialLovValue
                : initialVal
            }
            validationSchema={Yup.object(LovValidationSchema)}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("values...", values);
              handleAdd(values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <MuiThemeProvider theme={THEME}>
                  <LovForm
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
// const createdBy = useSelector((state) => state.login.Lov_id);
// const message = useSelector((state) => state.Lov.message);

const mapStateToProps = (state) => {
  return {
    isOpen: state.util.isOpen,
    isView: state.util.isView,
    initialVal: state.util.initialVal,
  };
};

export default connect(mapStateToProps, null)(AddLovDialog);
