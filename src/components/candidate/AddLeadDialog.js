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
import { addCandidate } from "../../actions/candidate";
import { openModal } from "../../actions/util";
import { updateCandidateMessage } from "./../../actions/candidate";
import {
  getAvailablePriority,
  getAvailableVisaTypes,
  getAvailablePracticeArea,
  getValidPracticeArea,
} from "./../../selectors/selectUtils";
import {
  getAllBucketUserList,
  getUserBucketId,
} from "./../../selectors/visibleBucket";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CandidateForms from "./CandidateForms";

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

const initialLeadValue = {
  id: "",
  leadEmail: "",
  leadPhone: "",
  leadFirstName: "",
  leadLastName: "",
  leadPrimaryEmail: "",
  leadSecondaryEmail: "",
  leadAddress: "",
  leadState: "",
  leadCity: "",
  leadEmpName: "",
  leadJobTitle: "",
  leadSalary: 0,
  leadVisaType: "",
  leadWlgReLoc: "",
  leadPrefLoc: "",
  leadExpectedSalary: 0,
  leadPracticeArea: "",
  leadStatus: "",
  leadResFileName: "",
  leadResPath: "",
  leadNotes: "",
  comments: "",
  leadJobOrderid: 0,
  submittedJobId: 0,
  bucketId: 0,
  totalExp: 0,
};

const salaryRegExp = /^\d+$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const leadValidationSchema = {
  leadEmail: Yup.string()
    .required("Lead Email is Required")
    .max(50, "Not More than 50ch"),
  leadPhone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(14, "Phone number is not valid")
    .required("Lead Phone is required"),
  bucketId: Yup.number().required("Bucket is required"),
  leadFirstName: Yup.string()
    .max(25, "Not More than 25")
    .required("First Name is required"),
  leadLastName: Yup.string()
    .max(25, "Not More than 25")
    .required("Last Name is required"),
  leadPrimaryEmail: Yup.string().nullable().max(50, "Not More than 50ch"),
  leadSecondaryEmail: Yup.string().max(50, "Not More than 50ch").nullable(),
  leadAddress: Yup.string().max(300, "Not More than 300ch").nullable(),
  leadState: Yup.string()
    .max(15, "Not More than 15ch")
    .required("State is required"),
  leadCity: Yup.string().max(20, "Not More than 20ch").nullable(),
  leadEmpName: Yup.string().max(20, "Not More than 20ch").nullable(),
  leadJobTitle: Yup.string().max(100, "Not More than 100ch").nullable(),
  leadSalary: Yup.string()
    .matches(salaryRegExp, "Salary is not valid")
    .min(4, "Not Less than 4")
    .max(6, "Not More than 6")
    .required("Current Salary is required"),
  leadExpectedSalary: Yup.string()
    .matches(salaryRegExp, "Salary is not valid")
    .min(4, "Not Less than 4")
    .max(6, "Not More than 6")
    .required("Expected Salary is required"),
  leadVisaType: Yup.string().required("Visa Type is required"),
  leadWlgReLoc: Yup.string().max(1, "Not More than 1ch").nullable(),
  leadPrefLoc: Yup.string().max(20, "Not More than 20ch").nullable(),
  leadPracticeArea: Yup.string()
    .max(40, "Not More than 40ch")
    .required("Practice Area is required"),
  leadStatus: Yup.string().required("Lead status is required"),
  leadResFileName: Yup.string().max(20, "Not More than 20ch").nullable(),
  leadResPath: Yup.string().max(75, "Not More than 75ch").nullable(),
  // leadNotes: Yup.string()
  //   .max(200, "Not More than 200ch")
  //   .required("Notes is required"),
  comments: Yup.string()
    .max(4000, "Not More than 4000ch")
    .required("Comments is required"),
  // leadJobOrderid: Yup.number().n("JobOrder Id is required"),
  submittedJobId: Yup.string()
    .required("JobOrder Id is required")
    .matches(salaryRegExp, "Job Order is not valid"),
  totalExp: Yup.string()
    .matches(salaryRegExp, "Experience is not valid")
    .max(2, "Not More than 2ch")
    .required("Experience is required"),
};

const AddInternDialog = (props) => {
  //getting props...
  const {
    isOpen,
    initialVal,
    message,
    priorityList,
    visaList,
    //from toolbar rest...
    addHandler,
    internData,
    title,
    userId,
    availableBuckets,
    availablePracticeArea,
    role,
    isView,
  } = props;

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  //Methods...
  const handleClickOpen = () => {
    dispatch(openModal({ initialVal: {}, isOpen: true }));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openModal({ initialVal: {}, isOpen: false }));
  };

  const onCloseAlert = () => {
    dispatch(updateCandidateMessage());
  };

  const handleAdd = (value) => {
    console.log("value that are submitted...", value);
    if (value.hasOwnProperty("id") && value.id !== "") {
      if (role !== "Sadmin") {
        let bucket = availableBuckets.filter((e) => userId == e.owner)[0];
        value.bucketId = bucket["bucketId"];
      }

      if (value.bucketId !== undefined && value.bucketId !== "SELECT") {
        dispatch(addCandidate(value));
        let handleProp = {};
        handleProp.isEditing = true;
        handleProp.forComp = "Lead";
        addHandler(value, handleProp);
        console.log("you have to edit it here...for candidate");
      }
    } else {
      if (role !== "Sadmin") {
        let bucket = availableBuckets.filter((e) => userId == e.owner)[0];
        value.bucketId = bucket["bucketId"];
      }

      if (value.bucketId !== undefined && value.bucketId !== "SELECT") {
        dispatch(addCandidate(value));
        addHandler(value);
      }
    }
  };

  return (
    <div>
      {
        <Tooltip title="Add">
          <IconButton size="medium" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      }
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
              // className={classes.closeButton}
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
            {"Note-> * Marked as Required"}
          </DialogContentText> */}
          {message !== undefined && Object.keys(message).length > 0 && (
            <Alert onClose={onCloseAlert} severity="info" varient="outlined">
              Message:
              {message !== null ? message : "Please validate your inputs"}
            </Alert>
          )}
          {/****Formik for handling the form******/}
          <Formik
            initialValues={isOpen !== true ? initialLeadValue : initialVal}
            validationSchema={Yup.object(leadValidationSchema)}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("values...", values);
              handleAdd(values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <MuiThemeProvider theme={THEME}>
                  <CandidateForms
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    handleClose={handleClose}
                    availableBuckets={availableBuckets}
                    isEdit={Object.keys(initialVal).length < 2 ? false : true}
                    role={role}
                    title={title}
                    priorityList={priorityList}
                    visaList={visaList}
                    userId={userId}
                    isView={isView}
                    availablePracticeArea={availablePracticeArea}
                  />

                  {/* <pre> {JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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
    priorityList: getAvailablePriority(),
    visaList: getAvailableVisaTypes(),
    isOpen: state.util.isOpen,
    isView: state.util.isView,
    initialVal: state.util.initialVal,
    message: state.candidate.message,
    // availableBuckets: availableBuckets(state),
    bucket: getUserBucketId(state),
    //for getttingt the dropdown...
    availableBuckets: getAllBucketUserList(state),
    availablePracticeArea: getValidPracticeArea(state),
    // availablePracticeArea: getAvailablePracticeArea(state),
    role: state.login.role,
    userId: state.login.dbId,
  };
};

export default connect(mapStateToProps)(AddInternDialog);
