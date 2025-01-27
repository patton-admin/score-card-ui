import {
  Button,
  TextField,
  FormControl,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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

const LovForm = (props) => {
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
          Create List Of Value
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
          Edit List Of Value
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
          View List Of Value
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
                name="prAreaid"
                className="form__input"
                label="Unique Practice Area"
                variant="outlined"
                margin="dense"
                size="medium"
                required
                value={values.prAreaid}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView || isEdit}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.prAreaid && Boolean(errors.prAreaid)}
                helperText={errors.prAreaid ? `${errors.prAreaid}` : null}
              />
            </td>
            <td className="candidate-align">
              <TextField
                type="text"
                name="practiceArea"
                label="Practice Area"
                className="form__input"
                placeholder="Practice Area"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                value={values.practiceArea || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.practiceArea && errors.practiceArea}
                helperText={
                  errors.practiceArea ? `${errors.practiceArea}` : null
                }
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <FormControlLabel
                control={
                  <Switch
                    checked={values.status}
                    onChange={handleChange}
                    name="status"
                    color="primary"
                    disabled={isView}
                  />
                }
                label={values.status === true ? "Active" : "InActive"}
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
              Create Lov
            </Button>
          )}
          {isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Edit Lov
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default LovForm;
