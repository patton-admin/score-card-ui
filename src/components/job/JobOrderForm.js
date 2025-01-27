import React from "react";
import { Button, InputLabel, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import "./../../styles/candidate.css";

const JobOrderForm = (props) => {
  const {
    values,
    role,
    handleChange,
    handleBlur,
    errors,
    touched,
    visaList,
    priorityList,
    handleClose,
    isEdit,
    availableClients,
    bdmClient,
    isView,
  } = props;

  const useStyles = makeStyles((theme) => ({
    input: {
      backgroundColor: "#dcebec",
    },
  }));

  // ligher - daedef

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
          Create Job Information
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
          Edit Job Information
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
          View Job Information
        </h3>
      )}
      <table className="table table-bordered" style={{ cellSpacing: "10%" }}>
        <tbody>
          <tr>
            <td className="candidate-align">
              <TextField
                id="jobOrderTitle"
                name="jobOrderTitle"
                label="Job Title "
                size="medium"
                margin="dense"
                variant="outlined"
                required
                value={values.jobOrderTitle}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.jobOrderTitle && Boolean(errors.jobOrderTitle)}
                helperText={
                  errors.jobOrderTitle ? `${errors.jobOrderTitle}` : null
                }
              />
            </td>
            {role === "Sadmin" && (
              <td className="candidate-align">
                <TextField
                  select
                  name="clientId"
                  label="Client"
                  autoFocus
                  required
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                  value={values.clientId || "SELECT"}
                  InputProps={{
                    className: classes.input,
                  }}
                  disabled={isView}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.clientId &&
                    errors.clientId &&
                    values.clientId !== "SELECT"
                  }
                  helperText={errors.clientId ? `${errors.clientId}` : null}
                >
                  {values.clientId === undefined && (
                    <MenuItem value={"SELECT"}>Select Client</MenuItem>
                  )}
                  {availableClients.map((e, acc) => (
                    <MenuItem value={e.clientId}>{e.clientName}</MenuItem>
                  ))}
                </TextField>
              </td>
            )}
            {role !== "Sadmin" && (
              <td className="candidate-align">
                <TextField
                  select
                  name="clientId"
                  label="Client"
                  autoFocus
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                  value={values.clientId || "SELECT"}
                  InputProps={{
                    className: classes.input,
                  }}
                  disabled={isView}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.clientId &&
                    errors.clientId &&
                    values.clientId !== "SELECT"
                  }
                  helperText={errors.clientId ? `${errors.clientId}` : null}
                >
                  {values.clientId === undefined && (
                    <MenuItem value={"SELECT"}>Select Client</MenuItem>
                  )}
                  {bdmClient.map((e) => (
                    <MenuItem value={e.clientId}>{e.clientName}</MenuItem>
                  ))}
                </TextField>
              </td>
            )}
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                select
                name="jobOrderStatus"
                autoFocus
                variant="outlined"
                margin="dense"
                label="JobOrder Status"
                required
                fullWidth={true}
                value={values.jobOrderStatus || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.jobOrderStatus &&
                  errors.jobOrderStatus &&
                  values.jobOrderStatus !== "SELECT"
                }
                helperText={
                  errors.jobOrderStatus ? `${errors.jobOrderStatus}` : null
                }
              >
                {(values.jobOrderStatus === undefined ||
                  values.jobOrderStatus === null) && (
                  <MenuItem value={"SELECT"}>Select Status </MenuItem>
                )}
                <MenuItem value={"Active"}>{"Active"}</MenuItem>
                <MenuItem value={"InActive"}>{"Inactive"}</MenuItem>
              </TextField>
            </td>
            <td className="candidate-align">
              <TextField
                id="noOfPositions"
                name="noOfPositions"
                label="No Of Positions"
                size="medium"
                margin="dense"
                variant="outlined"
                required
                value={values.noOfPositions}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.noOfPositions && Boolean(errors.noOfPositions)}
                helperText={
                  errors.noOfPositions ? `${errors.noOfPositions}` : null
                }
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                id="city"
                name="city"
                label="City"
                size="medium"
                required
                margin="dense"
                variant="outlined"
                value={values.city}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={errors.city ? `${errors.city}` : null}
              />
            </td>

            <td className="candidate-align">
              <TextField
                select
                name="priority"
                autoFocus
                variant="outlined"
                fullWidth={true}
                required
                margin="dense"
                label="Priority"
                value={values.priority || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.priority &&
                  errors.priority &&
                  values.priority !== "SELECT"
                }
                helperText={errors.priority ? `${errors.priority}` : null}
              >
                {(values.priority === undefined ||
                  values.priority === null) && (
                  <MenuItem value={"SELECT"}>Select Priority</MenuItem>
                )}
                {priorityList.map((e) => (
                  <MenuItem value={e.pid}>{e.priorityType}-priority</MenuItem>
                ))}
              </TextField>
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                id="rate"
                name="rate"
                label="Rate"
                size="medium"
                required
                margin="dense"
                variant="outlined"
                value={values.rate}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rate && Boolean(errors.rate)}
                helperText={errors.rate ? `${errors.rate}` : null}
              />
            </td>
            <td className="candidate-align">
              <TextField
                select
                name="visaType"
                autoFocus
                variant="outlined"
                fullWidth={true}
                required
                margin="dense"
                label="Visa Type"
                value={values.visaType || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.visaType &&
                  errors.visaType &&
                  values.visaType !== "SELECT"
                }
                helperText={errors.visaType ? `${errors.visaType}` : null}
              >
                {(values.visaType === undefined ||
                  values.visaType === null) && (
                  <MenuItem value={"SELECT"}>Select Visa</MenuItem>
                )}
                {visaList.map((e) => (
                  <MenuItem value={e.vid}>{e.visaType}</MenuItem>
                ))}
              </TextField>
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                id="state"
                name="state"
                label="State"
                size="medium"
                margin="dense"
                variant="outlined"
                value={values.state}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.state && Boolean(errors.state)}
                helperText={errors.state ? `${errors.state}` : null}
              />
            </td>
            <td className="candidate-align">
              <TextField
                id="totalExp"
                name="totalExp"
                label="Total Exp"
                size="medium"
                margin="dense"
                required
                variant="outlined"
                value={values.totalExp}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.totalExp && Boolean(errors.totalExp)}
                helperText={errors.totalExp ? `${errors.totalExp}` : null}
              />
            </td>
          </tr>
          <tr>
            {(isView === true || isEdit === true) && (
              <td className="candidate-align">
                <TextField
                  id="id"
                  name="id"
                  label="Job Order Id"
                  size="medium"
                  margin="dense"
                  disabled
                  value={values.id}
                  InputProps={{
                    className: classes.input,
                  }}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </td>
            )}
            {isView && (
              <td className="candidate-align">
                <TextField
                  id="createdDate"
                  name="id"
                  label="Created Date"
                  size="medium"
                  margin="dense"
                  disabled
                  value={values.createdDate}
                  InputProps={{
                    className: classes.input,
                  }}
                  disabled={isView}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </td>
            )}
          </tr>
          <tr>
            <div style={{ paddingLeft: "20px", width: "193%" }}>
              <TextField
                id="lngDesc"
                name="lngDesc"
                label="Job Description"
                size="medium"
                margin="dense"
                multiline
                fullWidth
                rows={4}
                required
                value={values.lngDesc}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lngDesc && Boolean(errors.lngDesc)}
                helperText={errors.lngDesc ? `${errors.lngDesc}` : null}
              />
            </div>
            <div style={{ paddingLeft: "20px", width: "193%" }}>
              <TextField
                id="comments"
                name="comments"
                label="Comments"
                size="small"
                margin="dense"
                multiline
                fullWidth
                rows={4}
                value={values.comments}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.comments && Boolean(errors.comments)}
                helperText={errors.comments ? `${errors.comments}` : null}
              />
            </div>
          </tr>
        </tbody>
      </table>
      <div>
        <p>{"   "}</p>
      </div>
      {/* <pre> {JSON.stringify(values, null, 2)}</pre> */}
      {isView === false && (
        <div style={{ paddingTop: "4%", paddingRight: "20px" }}>
          {!isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Create Job
            </Button>
          )}
          {isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
              // disabled="true"
            >
              Edit Job
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobOrderForm;
