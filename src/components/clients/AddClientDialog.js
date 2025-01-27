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
import { updateClientMessage } from "../../actions/client";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import {
  getAllBucketUserList,
  getUserBucketId,
} from "../../selectors/visibleBucket";
import { addClient, updateClient } from "../../actions/client";
import { openModal } from "../../actions/util";
import ClientForms from "./ClientForms";

const initialClientValue = {
  clientId: "",
  clientName: "",
  contactPerson: "",
  clientEmail: "",
  vendorName: "",
  vendorEmail: "",
  bucketId: "",
  vendorContactPerson: "",
  lastUpdatedDate: "",
  createdDate: "",
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

const clientValidationSchema = {
  clientName: Yup.string()
    .required("Client Name is Required")
    .max(50, "No More than 50Ch"),
  // clientId: Yup.string()
  //   .required("Client is Required")
  //   .max(15, "No More than 15Ch"),
  bucketId: Yup.string()
    .required("Bucket is required")
    .max(20, "No More than 20ch"),
  contactPerson: Yup.string()
    .max(30, "No More than 30Ch")
    .required("Contact person is required"),
  clientEmail: Yup.string().max(50, "No More than 50Ch").nullable(),
  vendorName: Yup.string().max(30, "No More than 30Ch").nullable(),
  vendorEmail: Yup.string().max(50, "No More than 50Ch").nullable(),
  vendorContactPerson: Yup.string().max(30, "No More than 30Ch").nullable(),
};

const AddClientDialog = (props) => {
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
    dispatch(updateClientMessage());
  };

  const handleAdd = (value) => {
    console.log("value that are submitted...", value);
    try {
      if (value.hasOwnProperty("bucketOwner") && value.bucketOwner !== "") {
        dispatch(addClient(value));
        let handleProp = {};
        handleProp.isEditing = true;
        handleProp.forComp = "Client";
        addHandler(value, handleProp);
        console.log("you have to edit it here...for Client");
      } else {
        dispatch(addClient(value));
        addHandler(value);
      }
    } catch (e) {
      console.log("error from client...", e);
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
              // className={classes.closeButton}
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
          {/* <DialogContentText style={{ color: "#f50057", fontStyle: "Italic" }}>
            {"Note: * Marked as Required"}
          </DialogContentText> */}
          {message !== "" && (
            <Alert onClose={onCloseAlert} severity="info" varient="outlined">
              Message:
              {message !== null ? message : "Please validate your inputs"}
            </Alert>
          )}
          {/****Formik for handling the form******/}
          <Formik
            initialValues={isOpen !== true ? initialClientValue : initialVal}
            validationSchema={Yup.object(clientValidationSchema)}
            validateOnBlur={false}
            onSubmit={(values) => {
              console.log("values...", values);
              handleAdd(values);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <MuiThemeProvider theme={THEME}>
                  <ClientForms
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
    availableBuckets: getAllBucketUserList(state),
    role: state.login.role,
    userId: state.login.dbId,
  };
};

export default connect(mapStateToProps)(AddClientDialog);
