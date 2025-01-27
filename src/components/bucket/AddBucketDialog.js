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
import { addBucket, updateBucketMessage } from "../../actions/bucket";
import { openModal } from "../../actions/util";
import { userLists } from "./../../selectors/visibleBucket";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import BenchForm from "./BenchForm";

const initialBucketValue = {
  bucketName: "",
  bucketOwner: "",
  bktShrtDesc: "",
  bktLngDesc: "",
  bktOwnerId: "",
  assignedUsers: [],
};

const bucketValidationSchema = {
  bucketName: Yup.string()
    .max(40, "Not More than 40ch")
    .required("Bucket Name is Required"),
  bucketOwner: Yup.string().required("Bucket Owner is Required"),
  // bucketOwnerId: Yup.number().required("Bucket Owner is Required"),
  bktShrtDesc: Yup.string().required("Short Desc is Required"),
  bktLngDesc: Yup.string().nullable(),
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
const AddBucketDialog = (props) => {
  //props...
  const {
    isOpen,
    userList,
    initialVal,
    message,
    //from toolbar rest...
    addHandler,
    internData,
    title,
    isView,
  } = props;

  const dispatch = useDispatch();

  /* for converting string to array... */
  if (
    initialVal["assignedUsers"] !== undefined &&
    typeof initialVal.assignedUsers === "string"
  ) {
    initialVal.assignedUsers = initialVal.assignedUsers
      .split(",")
      .map((e) => parseInt(e));
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(openModal({ initialVal: {}, isOpen: true }));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openModal({ initialVal: {}, isOpen: false }));
  };

  const onCloseAlert = () => {
    dispatch(updateBucketMessage());
  };

  const handleAdd = (value) => {
    console.log("value that are submitted...", value);
    try {
      if (value.hasOwnProperty("id") && value["id"] !== "") {
        if (value.assignedUsers !== undefined && value.assignedUsers !== NaN) {
          value.assignedUsers = value.assignedUsers.join();
        } else {
          value.assignedUsers = "0";
        }
        value.bktOwnerId = userList
          .filter((e) =>
            e.userLoginId === value.bucketOwner ? e.userId : 0
          )[0]
          .userId.toString();

        dispatch(addBucket(value));
        let handleProp = {};
        handleProp.isEditing = true;
        handleProp.forComp = "Bucket";
        addHandler(value, handleProp);
      } //add
      else {
        if (
          value.assignedUsers !== undefined &&
          typeof value.assignedUsers !== "string"
        ) {
          value.assignedUsers = value.assignedUsers.join();
        } else {
          value.assignedUsers = "0";
        }

        value.bktOwnerId = userList
          .filter((e) =>
            e.userLoginId === value.bucketOwner ? e.userId : 0
          )[0]
          .userId.toString();
        dispatch(addBucket(value));
        addHandler(value);
      }
    } catch (e) {
      console.log("error Occured...", e);
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
        open={open || isOpen}
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
          ) : null}{" "}
        </DialogTitle>

        <DialogContent>
          {/* <DialogContentText style={{ color: "#f50057", fontStyle: "Italic" }}>
            {"Note: * Marked as Required"}
          </DialogContentText> */}
          {message !== "" && (
            <Alert onClose={onCloseAlert} severity="info" varient="outlined">
              Message -
              {message !== null ? `${message}` : "Please validate your inputs"}
            </Alert>
          )}
          {/****Formik for handling the form******/}
          <Formik
            initialValues={isOpen !== true ? initialBucketValue : initialVal}
            validationSchema={Yup.object(bucketValidationSchema)}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("values...", values);
              handleAdd(values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <MuiThemeProvider theme={THEME}>
                  <BenchForm
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    handleClose={handleClose}
                    isEdit={Object.keys(initialVal).length === 0 ? false : true}
                    userList={userList}
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

const mapStateToProps = (state) => {
  return {
    isOpen: state.util.isOpen,
    isView: state.util.isView,
    userList: userLists(state),
    initialVal: state.util.initialVal,
    message: state.bucket.message,
  };
};

export default connect(mapStateToProps, null)(AddBucketDialog);
