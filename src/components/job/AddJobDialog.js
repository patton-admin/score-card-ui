import React, { useState, useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, connect } from "react-redux";
import { addJob, updateJob, updateJobMessage } from "../../actions/job";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { openModal } from "../../actions/util";
import { getAvailableClients } from "./../../selectors/selectJobOrders";
import {
  getAvailablePriority,
  getAvailableVisaTypes,
} from "./../../selectors/selectUtils";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { getAllClientList } from "./../../selectors/visibleBucket";
import JobOrderForm from "./JobOrderForm";

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

const initialJobValue = {
  id: "",
  jobOrderTitle: "",
  jobOrderStatus: "",
  clientId: "",
  noOfPositions: 0,
  city: "",
  state: "",
  priority: "",
  totalExp: 0,
  rate: 0,
  visaType: "",
  lngDesc: "",
  comments: "",
  updatedDate: "",
  createdDate: "",
};

const numberOnlyRegEx = /^\d+$/;
const jobValidationSchema = {
  clientId: Yup.string().required("Client is Required"),
  jobOrderTitle: Yup.string()
    .required("Job-Order Title is Required")
    .max(100, "Not More than 100Ch"),
  city: Yup.string().max(30, "Not More than 30Ch").required("City is required"),
  state: Yup.string().max(30, "Not More than 30Ch").nullable(),
  priority: Yup.string()
    // .max(5, "Not More than 5Ch")
    .required("Priority is required"),
  rate: Yup.string()
    .matches(numberOnlyRegEx, "Rate is not valid")
    .max(3, "Not more than 3ch")
    .required("Rate is required"),
  totalExp: Yup.string()
    .matches(numberOnlyRegEx, "Experience is not valid")
    .max(2, "Not More than 2ch")
    .required("Experience is required"),
  visaType: Yup.string()
    .max(10, "Not More than 10Ch")
    .required("Visa Type is required"),
  lngDesc: Yup.string()
    .max(5000, "Not More than 5000Ch")
    .required("Job Desc is required"),
  comments: Yup.string().max(300, "Not More than 300Ch").nullable(),
  noOfPositions: Yup.string()
    .matches(numberOnlyRegEx, "Positions value is not valid")
    .max(2, "Not More than 2Ch")
    .required("Positions is required"),
};

const AddJobDialog = (props) => {
  const {
    isOpen,
    initialVal,
    role,
    bdmClient,
    priority,
    visaList,
    userId,
    createdBy,
    message,
    //from toolbar rest...
    addHandler,
    internData,
    title,
    availableClients,
    isView,
  } = props;

  const dispatch = useDispatch();

  const [intern, setIntern] = useState(initialJobValue);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(openModal({ initialVal: {}, isOpen: true }));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openModal({ initialVal: {}, isOpen: false }));
  };

  const onCloseAlert = () => {
    dispatch(updateJobMessage());
  };

  const handleAdd = (value) => {
    console.log("value that are submitted...", value);
    if (value.hasOwnProperty("id") && value.id !== "") {
      dispatch(addJob(value));
      value.createdBy = createdBy;
      value.updatedBy = createdBy;
      let handleProp = {};
      handleProp.isEditing = true;
      handleProp.forComp = "Job";
      addHandler(value, handleProp);
    } else {
      value.jobOrderClientId = value.clientId;
      dispatch(addJob(value));
      addHandler(value);
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
          disableTypography={true}
        >
          {" "}
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
          {/* <DialogContentText style={{ color: "#f50057", fontStyle: "Italic" }}>
            {"Note ---> * Marked as Required"}
          </DialogContentText> */}
          {message !== undefined && (
            <Alert onClose={onCloseAlert} severity="info" varient="outlined">
              Message:
              {message !== null ? `${message}` : "Please validate your inputs"}
            </Alert>
          )}

          {/****Formik for handling the form******/}
          <Formik
            initialValues={isOpen !== true ? initialJobValue : initialVal}
            validationSchema={Yup.object(jobValidationSchema)}
            // validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("values...", values);
              handleAdd(values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <MuiThemeProvider theme={THEME}>
                  <JobOrderForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    handleClose={handleClose}
                    isEdit={Object.keys(initialVal).length < 2 ? false : true}
                    availableClients={availableClients}
                    role={role}
                    bdmClient={bdmClient}
                    priorityList={priority}
                    visaList={visaList}
                    isView={isView}
                  />

                  {/* <pre> {JSON.stringify(values, null, 2)}</pre> */}
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

const mapStateToProps = (state) => {
  return {
    isOpen: state.util.isOpen,
    isView: state.util.isView,
    initialVal: state.util.initialVal,
    message: state.jobOrder.message,
    availableClients: getAllClientList(state),
    bdmClient: getAvailableClients(state),
    priority: getAvailablePriority(),
    visaList: getAvailableVisaTypes(),
    role: state.login.role,
    userId: state.login.dbId,
  };
};

export default connect(mapStateToProps, null)(AddJobDialog);
