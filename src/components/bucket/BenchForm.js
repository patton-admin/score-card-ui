import { Button, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import "./../../styles/candidate.css";
import CheckBox from "./CheckBox";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      width: "30ch",
    },
  },
  input: {
    backgroundColor: "#dcebec",
  },
}));

const BenchForm = (props) => {
  const [checkboxes, setCheckBoxes] = useState();

  const {
    values,
    userList,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleClose,
    isEdit,
    isView,
  } = props;

  const handleCheckboxgroupChange = (updatedUsecaseCBState) => {
    setCheckBoxes({
      checkboxes: updatedUsecaseCBState,
    });
  };

  const classes = useStyles();
  return (
    <div style={{ alignContent: "center", backgroundColor: "#f6f7f7" }}>
      {isEdit === false && isView === false && (
        <h3
          style={{
            alignContent: "center",
            color: "#606468",
            paddingTop: "30px",
            marginLeft: "25%",
            marginRight: "25%",
            paddingLeft: "10px",
          }}
        >
          Create Bucket Information
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
          Edit Bucket Information
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
          View Bucket Information
        </h3>
      )}
      <table
        className="table table-bordered"
        style={{ cellSpacing: "5", width: "100%" }}
      >
        <tbody>
          <tr>
            <td>
              <TextField
                type="text"
                name="bucketName"
                label="Bucket Name"
                className="form__input"
                placeholder="Primary Email"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                value={values.bucketName}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bucketName && Boolean(errors.bucketName)}
                helperText={errors.bucketName ? `${errors.bucketName}` : null}
              />
            </td>

            <td>
              <TextField
                select
                name="bucketOwner"
                autoFocus
                variant="outlined"
                margin="dense"
                label="Bucket Owner"
                required
                fullWidth={true}
                value={values.bucketOwner || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.bucketOwner &&
                  errors.bucketOwner &&
                  values.bucketOwner !== "SELECT"
                }
                helperText={errors.bucketOwner ? `${errors.bucketOwner}` : null}
              >
                {(values.bucketOwner === undefined ||
                  values.bucketOwner === null) && (
                  <MenuItem value={"SELECT"}>Select Bucket Owner</MenuItem>
                )}
                {userList.map((e) => (
                  <MenuItem value={e.userLoginId}>{e.userLoginId}</MenuItem>
                ))}
              </TextField>
            </td>
          </tr>

          <tr>
            <td>
              <TextField
                type="text"
                name="bktShrtDesc"
                className="form__input"
                label="Bucket Description"
                variant="outlined"
                size="medium"
                margin="dense"
                required
                value={values.bktShrtDesc}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bktShrtDesc && Boolean(errors.bktShrtDesc)}
                helperText={errors.bktShrtDesc ? `${errors.bktShrtDesc}` : null}
              />
            </td>
            <td>
              <TextField
                type="text"
                name="bktLngDesc"
                className="form__input"
                label="Detailed Description"
                variant="outlined"
                size="medium"
                margin="dense"
                value={values.bktLngDesc}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bktLngDesc && Boolean(errors.bktLngDesc)}
                helperText={errors.bktLngDesc ? `${errors.bktLngDesc}` : null}
              />
            </td>
          </tr>

          <tr>
            <td>
              <div>
                <h3>Bucket Users Detailed Information</h3>
                <h3>Assign/UnAssigned Bucket Users </h3>
                <div
                  style={{
                    border: "2px solid #ccc",
                    width: "300px",
                    height: "100px",
                    overflowY: "scroll",
                  }}
                >
                  <List dense style={{ paddingLeft: "10px" }}>
                    {userList.map((user) => {
                      return user.userRole !== "Sadmin" ? (
                        <li key={user.userId}>
                          <CheckBox
                            name="assignedUsers"
                            value={user.userId}
                            label={user.userLoginId}
                          ></CheckBox>
                        </li>
                      ) : (
                        ""
                      );
                    })}
                  </List>
                </div>
                {/* VALUES:*/}
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {isView === false && (
        <div style={{ paddingTop: "4%", paddingRight: "20px" }}>
          {!isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Create Bucket
            </Button>
          )}
          {isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Edit Bucket
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BenchForm;
