import React from "react";
import _ from "lodash";
import { Button, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./../../styles/candidate.css";

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

const ClientForms = (props) => {
  const {
    values,
    availableBuckets,
    role,
    handleChange,
    handleBlur,
    errors,
    userId,
    touched,
    handleClose,
    isEdit,
    isView,
  } = props;
  const classes = useStyles();

  let bucket = availableBuckets.filter((e) => userId == e.owner)[0];

  if (
    role !== "Sadmin" &&
    values !== undefined &&
    values.bucket !== undefined &&
    bucket !== undefined
  ) {
    //when bdm editing his own record , we need this logic...
    values.bucketId = bucket["bucketId"];
  } else if (
    role !== "Sadmin" &&
    _.isEmpty(values, true) &&
    bucket !== undefined
  ) {
    //when bdm creation...
    values.bucketId = bucket["bucketId"];
  }

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
          Create Client Information
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
          Edit Client Information
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
          View Client Information
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
                name="clientName"
                label="Client Name"
                size="medium"
                margin="dense"
                required
                helperText={errors.clientName ? `${errors.clientName}` : null}
                error={touched.clientName && errors.clientName}
                variant="outlined"
                value={values.clientName || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>

            <td className="candidate-align ">
              <TextField
                id="contactPerson"
                name="contactPerson"
                label="Contact Person"
                size="medium"
                margin="dense"
                required
                error={touched.contactPerson && errors.contactPerson}
                helperText={
                  errors.contactPerson ? `${errors.contactPerson}` : null
                }
                value={values.contactPerson || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="clientEmail"
                name="clientEmail"
                label="Client Email"
                size="medium"
                margin="dense"
                error={touched.clientEmail && errors.clientEmail}
                helperText={errors.clientEmail ? `${errors.clientEmail}` : null}
                value={values.clientEmail || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>

            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="vendorName"
                name="vendorName"
                label="Vendor Name"
                size="medium"
                margin="dense"
                error={touched.vendorName && errors.vendorName}
                helperText={errors.vendorName ? `${errors.vendorName}` : null}
                value={values.vendorName || ""}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>
          </tr>
          <tr>
            {/* <td className="candidate-align">
              <TextField
                variant="outlined"
                id="clientId"
                name="clientId"
                label="Client *"
                size="medium"
                margin="dense"
                Required
                disabled={isEdit}
                value={values.clientId}
                error={touched.clientId && Boolean(errors.clientId)}
                helperText={errors.clientId ? `${errors.clientId}` : null}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td> */}
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="vendorEmail"
                name="vendorEmail"
                label="Vendor Email"
                size="medium"
                margin="dense"
                error={touched.vendorEmail && Boolean(errors.vendorEmail)}
                helperText={errors.vendorEmail ? `${errors.vendorEmail}` : null}
                value={values.vendorEmail}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="vendorContactPerson"
                name="vendorContactPerson"
                label="Vendor Contact"
                size="medium"
                margin="dense"
                value={values.vendorContactPerson}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                error={
                  touched.vendorContactPerson && errors.vendorContactPerson
                }
                helperText={
                  errors.vendorContactPerson
                    ? `${errors.vendorContactPerson}`
                    : null
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>
          </tr>
          <tr>
            {role === "Sadmin" && (
              <td className="candidate-align">
                <TextField
                  select
                  name="bucketId"
                  autoFocus
                  required
                  variant="outlined"
                  margin="dense"
                  label="Bucket"
                  value={values.bucketId || "SELECT"}
                  InputProps={{
                    className: classes.input,
                  }}
                  disabled={isView}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth={true}
                  error={
                    touched.bucketId &&
                    errors.bucketId &&
                    values.bucketId === "SELECT"
                  }
                  helperText={errors.bucketId ? `${errors.bucketId}` : null}
                >
                  {(values.bucketId === undefined ||
                    values.bucketId === null) && (
                    <MenuItem value={"SELECT"}>Select Bucket</MenuItem>
                  )}
                  {availableBuckets.map((e) => (
                    <MenuItem value={e.bucketId}>{e.bucketName}-bkt</MenuItem>
                  ))}
                </TextField>
              </td>
            )}
            {role !== "Sadmin" && (
              <td className="candidate-align">
                <TextField
                  variant="outlined"
                  id="BucketName"
                  name="bucketName"
                  label="Bucket Name"
                  size="medium"
                  margin="dense"
                  disabled
                  fullWidth={true}
                  value={
                    isEdit === true && values.bcktClients !== undefined
                      ? values.bcktClients["bucketName"]
                      : ""
                  }
                  InputProps={{
                    className: classes.input,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </td>
            )}
          </tr>
        </tbody>
      </table>

      {/* <pre> {JSON.stringify(values, null, 2)}</pre>
      <pre> {JSON.stringify(errors, null, 2)}</pre> */}
      {bucket === undefined && role !== "Sadmin" && (
        <p style={{ color: "#f50057", fontWeight: "bold" }}>
          Please ask SuperAdmin to create a Specific bucket for you...
        </p>
      )}
      {isView === false && (
        <div style={{ paddingTop: "4%", paddingRight: "20px" }}>
          {!isEdit && values.bucketId && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Create Client
            </Button>
          )}
          {isEdit && values.bucketId && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              // disabled="true"
              style={{ float: "right" }}
            >
              Edit Client
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientForms;
