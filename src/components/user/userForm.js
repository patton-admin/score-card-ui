import { Button, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContentText from "@material-ui/core/DialogContentText";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  // form: {
  //   display: "flex",
  //   flexDirection: "column",
  //   margin: "auto",
  //   width: "fit-content",
  // },
  // formControl: {
  //   marginTop: theme.spacing(1),
  //   minWidth: 120,
  // },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
  input: {
    backgroundColor: "#dcebec",
  },
}));

//https://codesandbox.io/s/vxv6Q4z5?file=/index.js yup validation over here...
const UserForm = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleClose,
    isEdit,
    isView,
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
          Create User Information
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
          Edit User Information
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
          View User Information
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
                type="text"
                name="userLoginId"
                className="form__input"
                label="User Id"
                variant="outlined"
                margin="dense"
                size="medium"
                required
                value={values.userLoginId}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userLoginId && Boolean(errors.userLoginId)}
                helperText={errors.userLoginId ? `${errors.userLoginId}` : null}
              />
            </td>
            <td className="candidate-align">
              <TextField
                type="text"
                name="userEmail"
                label="Primary Email"
                className="form__input"
                placeholder="Primary Email"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                value={values.userEmail || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userEmail && errors.userEmail}
                helperText={errors.userEmail ? `${errors.userEmail}` : null}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView || isEdit}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                type="text"
                name="userPassword"
                className="form__input"
                label="Password"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                value={values.userPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userPassword && errors.userPassword}
                helperText={
                  errors.userPassword ? `${errors.userPassword}` : null
                }
              />
            </td>
            <td className="candidate-align">
              <TextField
                type="text"
                name="userFirstName"
                className="form__input"
                label="First Name"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                value={values.userFirstName || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userFirstName && errors.userFirstName}
                helperText={
                  errors.userFirstName ? `${errors.userFirstName}` : null
                }
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                type="text"
                name="userLastName"
                label="Last Name"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                value={values.userLastName || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userLastName && errors.userLastName}
                helperText={
                  errors.userLastName ? `${errors.userLastName}` : null
                }
              />
            </td>
            <td className="candidate-align">
              <TextField
                select
                name="userRole"
                label="Role"
                autoFocus
                required
                fullWidth={true}
                variant="outlined"
                margin="dense"
                value={values.userRole || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.userRole && errors.userRole
                  // && values.userRole !== "SELECT"
                }
                helperText={errors.userRole ? `${errors.userRole}` : null}
              >
                {(values.userRole === undefined ||
                  values.userRole === null) && (
                  <MenuItem value={"SELECT"}>Select Role</MenuItem>
                )}
                <MenuItem value={"BDM"}>BDM-Role</MenuItem>
                <MenuItem value={"Sadmin"}>Sadmin-Role</MenuItem>
              </TextField>
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                type="tel"
                name="userPrimaryPhone"
                label="Primary Phone"
                className="form__input"
                variant="outlined"
                size="medium"
                required
                margin="dense"
                value={values.userPrimaryPhone || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userPrimaryPhone && errors.userPrimaryPhone}
                helperText={
                  errors.userPrimaryPhone ? `${errors.userPrimaryPhone}` : null
                }
              />
            </td>
            <td className="candidate-align">
              <TextField
                type="text"
                name="userLocation"
                label="User Location"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                className="form__input"
                value={values.userLocation}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userLocation && Boolean(errors.userLocation)}
                helperText={
                  errors.userLocation ? `${errors.userLocation}` : null
                }
              />
            </td>
          </tr>
          <tr>
            <td className="candidate-align">
              <TextField
                type="text"
                name="resetQuestion1"
                label="Reset Question 1"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                className="form__input"
                value={values.resetQuestion1 || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.resetQuestion1 && errors.resetQuestion1}
                helperText={
                  errors.resetQuestion1 ? `${errors.resetQuestion1}` : null
                }
              />
            </td>
            <td className="candidate-align">
              <TextField
                type="text"
                name="resetQuestion2"
                label="Reset Question 2"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                className="form__input"
                value={values.resetQuestion2 || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.resetQuestion2 && errors.resetQuestion2}
                helperText={
                  errors.resetQuestion2 ? `${errors.resetQuestion2}` : null
                }
              />
            </td>
          </tr>
          <tr>
            <td className="candidate-align">
              <TextField
                type="text"
                name="resetans1"
                label="Reset Answer 1"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                className="form__input"
                value={values.resetans1 || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.resetans1 && errors.resetans1}
                helperText={errors.resetans1 ? `${errors.resetans1}` : null}
              />
            </td>
            <td className="candidate-align">
              <TextField
                type="text"
                name="resetans2"
                label="Reset Answer 2"
                variant="outlined"
                size="medium"
                required
                margin="dense"
                className="form__input"
                value={values.resetans2 || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.resetans2 && errors.resetans2}
                helperText={errors.resetans2 ? `${errors.resetans2}` : null}
              />
            </td>
          </tr>
          <tr>
            <td className="candidate-align">
              {" "}
              <TextField
                type="tel"
                name="userSecondaryPhone"
                label="Secondary Phone"
                className="form__input"
                variant="outlined"
                size="medium"
                margin="dense"
                value={values.userSecondaryPhone || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userSecondaryPhone && errors.userSecondaryPhone}
                helperText={
                  errors.userSecondaryPhone
                    ? `${errors.userSecondaryPhone}`
                    : null
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <tr>
        <td></td>
      </tr>

      {isView === false && (
        <div style={{ paddingTop: "4%", paddingRight: "20px" }}>
          {!isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Create User
            </Button>
          )}
          {isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Edit User
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserForm;
