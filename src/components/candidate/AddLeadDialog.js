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


const leadValidationSchema = {

  recruiterName: Yup.string()
    .max(25, "Not More than 25")
    .required("First Name is required"),
  achievedInterviews: Yup.string().max(20, "Not More than 20ch").required(),
  expectedInterviews: Yup.string().max(20, "Not More than 100ch").required(),
  day: Yup.date().required("Day is required"),
  month: Yup.string().required("Month is required"),
  year: Yup.string().required("Year is required"),
  comments: Yup.string()
    .max(4000, "Not More than 4000ch")
    .required("Comments is required"),
  // leadJobOrderid: Yup.number().n("JobOrder Id is required"),
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
    if (value.hasOwnProperty("PK") && value.PK !== "") {
      if (value.team !== undefined && value.team !== "SELECT") {
        dispatch(addCandidate(value));
        let handleProp = {};
        handleProp.isEditing = true;
        handleProp.forComp = "Lead";
        addHandler(value, handleProp);
        console.log("you have to edit it here...for candidate");
      }
    } else {
      if (value.team !== undefined && value.team !== "SELECT") {
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
