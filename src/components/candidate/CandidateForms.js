import { Button, InputLabel, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import "./../../styles/candidate.css";
import { isEmpty } from "lodash";

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

const CandidateForms = (props) => {
  const {
    values,
    role,
    title,
    visaList,
    userId,
    bucket,
    availableBuckets,
    availablePracticeArea,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleClose,
    isEdit,
    isView,
  } = props;
  const classes = useStyles();

  let buckets = availableBuckets.filter((e) => userId == e.owner)[0];

  if (
    role !== "Sadmin" &&
    values !== undefined &&
    values.bucket !== undefined &&
    buckets !== undefined
  ) {
    //when bdm editing his own record , we need this logic...
    values.bucketId = buckets["bucketId"];
  } else if (
    role !== "Sadmin" &&
    _.isEmpty(values, true) &&
    buckets !== undefined
  ) {
    //when bdm creation...
    values.bucketId = buckets["bucketId"];
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
          Create Lead Information
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
          Edit Lead Information
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
          View Lead Information
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
                id="leadFirstName"
                name="leadFirstName"
                label="First Name"
                size="medium"
                margin="dense"
                required
                InputProps={{
                  className: classes.input,
                }}
                helperText={
                  errors.leadFirstName ? `${errors.leadFirstName}` : null
                }
                error={touched.leadFirstName && errors.leadFirstName}
                variant="outlined"
                value={values.leadFirstName || ""}
                onChange={handleChange}
                disabled={isView}
                onBlur={handleBlur}
              />
            </td>

            <td className="candidate-align ">
              <TextField
                id="leadLastName"
                name="leadLastName"
                label="Last Name"
                size="medium"
                margin="dense"
                required
                error={touched.leadLastName && errors.leadLastName}
                helperText={
                  errors.leadLastName ? `${errors.leadLastName}` : null
                }
                value={values.leadLastName || ""}
                disabled={isView}
                InputProps={{
                  className: classes.input,
                }}
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
                id="leadPhone"
                name="leadPhone"
                label="Phone No"
                size="medium"
                margin="dense"
                required
                error={touched.leadPhone && errors.leadPhone}
                helperText={errors.leadPhone ? `${errors.leadPhone}` : null}
                InputProps={{
                  className: classes.input,
                }}
                value={values.leadPhone || ""}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>

            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadEmail"
                name="leadEmail"
                label="Lead Email"
                size="medium"
                margin="dense"
                required
                error={touched.leadEmail && errors.leadEmail}
                helperText={errors.leadEmail ? `${errors.leadEmail}` : null}
                value={values.leadEmail || ""}
                disabled={isView}
                InputProps={{
                  className: classes.input,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadSecondaryEmail"
                name="leadSecondaryEmail"
                label="Secondary Email"
                size="medium"
                margin="dense"
                error={
                  touched.leadSecondaryEmail &&
                  Boolean(errors.leadSecondaryEmail)
                }
                helperText={
                  errors.leadSecondaryEmail
                    ? `${errors.leadSecondaryEmail}`
                    : null
                }
                value={values.leadSecondaryEmail}
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
                select
                name="leadVisaType"
                autoFocus
                variant="outlined"
                margin="dense"
                label="Visa Type"
                required
                fullWidth={true}
                value={values.leadVisaType || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.leadVisaType &&
                  errors.leadVisaType &&
                  values.leadVisaType !== "SELECT"
                }
                helperText={
                  errors.leadVisaType ? `${errors.leadVisaType}` : null
                }
              >
                {(values.leadVisaType === undefined ||
                  values.leadVisaType === null) && (
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
                variant="outlined"
                id="address"
                name="leadAddress"
                label="Address"
                size="medium"
                margin="dense"
                value={values.leadAddress}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadAddress ? `${errors.leadAddress}` : null}
                error={touched.leadAddress && errors.leadAddress}
              />
            </td>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadState"
                name="leadState"
                label="State"
                size="medium"
                margin="dense"
                required
                value={values.leadState}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadState ? `${errors.leadState}` : null}
                error={touched.leadState && errors.leadState}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadCity"
                name="leadCity"
                label="City"
                size="medium"
                margin="dense"
                value={values.leadCity}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadCity ? `${errors.leadCity}` : null}
                error={touched.leadCity && errors.leadCity}
              />
            </td>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadEmpName"
                name="leadEmpName"
                label="Current Employer Name"
                size="medium"
                margin="dense"
                value={values.leadEmpName}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadEmpName ? `${errors.leadEmpName}` : null}
                error={touched.leadEmpName && errors.leadEmpName}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadJobTitle"
                name="leadJobTitle"
                label="Current Job Title"
                size="medium"
                margin="dense"
                value={values.leadJobTitle}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.leadJobTitle ? `${errors.leadJobTitle}` : null
                }
                error={touched.leadJobTitle && errors.leadJobTitle}
              />
            </td>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadPrefLoc"
                name="leadPrefLoc"
                label="Preferred Location"
                size="medium"
                margin="dense"
                value={values.leadPrefLoc}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadPrefLoc ? `${errors.leadPrefLoc}` : null}
                error={touched.leadPrefLoc && errors.leadPrefLoc}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadSalary"
                name="leadSalary"
                label="Current Salary"
                size="medium"
                margin="dense"
                required
                value={values.leadSalary}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadSalary ? `${errors.leadSalary}` : null}
                error={touched.leadSalary && errors.leadSalary}
              />
            </td>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadExpectedSalary"
                name="leadExpectedSalary"
                label="Expected Salary"
                size="medium"
                margin="dense"
                required
                value={values.leadExpectedSalary}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.leadExpectedSalary
                    ? `${errors.leadExpectedSalary}`
                    : null
                }
                error={touched.leadExpectedSalary && errors.leadExpectedSalary}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                select
                name="leadPracticeArea"
                autoFocus
                label="Practice Area"
                variant="outlined"
                fullWidth={true}
                margin="dense"
                value={values.leadPracticeArea || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.leadPracticeArea &&
                  errors.leadPracticeArea &&
                  values.leadPracticeArea !== "SELECT"
                }
                helperText={
                  errors.leadPracticeArea ? `${errors.leadPracticeArea}` : null
                }
              >
                {(values.leadPracticeArea === undefined ||
                  values.leadPracticeArea === null) && (
                  <MenuItem value={"SELECT"}>Select Practice Area</MenuItem>
                )}
                {availablePracticeArea.map((e) => (
                  <MenuItem value={e.prAreaid}>{e.practiceArea}</MenuItem>
                ))}
              </TextField>
            </td>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="submittedJobId"
                name="submittedJobId"
                label="Submitted Job Order Id"
                size="medium"
                margin="dense"
                required
                value={values.submittedJobId}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.submittedJobId ? `${errors.submittedJobId}` : null
                }
                error={touched.submittedJobId && errors.submittedJobId}
              />
            </td>
          </tr>
          <tr>
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
            {role === "Sadmin" && (
              <td className="candidate-align">
                <TextField
                  select
                  name="bucketId"
                  label="Bucket"
                  autoFocus
                  fullWidth={true}
                  required
                  variant="outlined"
                  margin="dense"
                  value={values.bucketId || "SELECT"}
                  InputProps={{
                    className: classes.input,
                  }}
                  disabled={isView}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.bucketId &&
                    errors.bucketId &&
                    values.bucketId !== "SELECT"
                  }
                  helperText={errors.bucketId ? `${errors.bucketId}` : null}
                >
                  {values.bucketId === undefined && (
                    <MenuItem value={"SELECT"}>Select Bucket</MenuItem>
                  )}
                  {availableBuckets.map((e) => (
                    <MenuItem value={e.bucketId}>{e.bucketName}-Bckt</MenuItem>
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
                  fullWidth={true}
                  margin="dense"
                  disabled
                  value={
                    isEdit === true && values.bucket !== undefined
                      ? values.bucket.bucketName
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
          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadResPath"
                name="leadResPath"
                label="Resume Path"
                size="medium"
                margin="dense"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadResPath ? `${errors.leadResPath}` : null}
                error={touched.leadResPath && errors.leadResPath}
                value={values.leadResPath}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
              />
            </td>

            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadResFileName"
                name="leadResFileName"
                label="FileName"
                size="medium"
                margin="dense"
                value={values.leadResume}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.leadResFileName ? `${errors.leadResFileName}` : null
                }
                error={touched.leadResFileName && errors.leadResFileName}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                select
                name="leadStatus"
                autoFocus
                variant="outlined"
                margin="dense"
                label="Lead Status"
                required
                fullWidth={true}
                value={values.leadStatus || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.leadStatus &&
                  errors.leadStatus &&
                  values.leadStatus !== "SELECT"
                }
                helperText={errors.leadStatus ? `${errors.leadStatus}` : null}
              >
                {(values.leadStatus === undefined ||
                  values.leadStatus === null) && (
                  <MenuItem value={"SELECT"}>Select leadStatus </MenuItem>
                )}
                <MenuItem value={"Active"}>{"Active"}</MenuItem>
                <MenuItem value={"InActive"}>{"Inactive"}</MenuItem>
              </TextField>
            </td>
            <td className="candidate-align">
              <TextField
                select
                name="leadWlgReLoc"
                autoFocus
                label="Relocation Option"
                variant="outlined"
                fullWidth={true}
                margin="dense"
                value={values.leadWlgReLoc || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.leadWlgReLoc &&
                  errors.leadWlgReLoc &&
                  values.leadWlgReLoc !== "SELECT"
                }
                helperText={
                  errors.leadWlgReLoc ? `${errors.leadWlgReLoc}` : null
                }
              >
                {(values.leadWlgReLoc === undefined ||
                  values.leadWlgReLoc === null) && (
                  <MenuItem value={"SELECT"}>Select Willingness </MenuItem>
                )}
                <MenuItem value={"1"}>{"Yes"}</MenuItem>
                <MenuItem value={"0"}>{"No"}</MenuItem>
              </TextField>
            </td>
          </tr>
          <tr>
            {isView === true && (
              <td className="candidate-align">
                <TextField
                  variant="outlined"
                  id="createdDate"
                  name="createdDate"
                  label="Created Date"
                  size="medium"
                  margin="dense"
                  disabled
                  value={values.createdDate}
                  InputProps={{
                    className: classes.input,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.createdDate ? `${errors.createdDate}` : null
                  }
                  error={touched.createdDate && errors.createdDate}
                />
              </td>
            )}
          </tr>
          {/* <td className="candidate-align">
              <TextField
                variant="outlined"
                id="leadNotes"
                name="leadNotes"
                label="Lead Notes"
                size="medium"
                margin="dense"
                required
                value={values.leadNotes}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.leadNotes ? `${errors.leadNotes}` : null}
                error={touched.leadNotes && errors.leadNotes}
              />
            </td> */}
          <div style={{ paddingLeft: "20px", width: "193%" }}>
            <TextField
              variant="outlined"
              id="comments"
              name="comments"
              // label="Comments"
              size="medium"
              margin="dense"
              multiline
              rows={4}
              fullWidth
              required
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.comments ? `${errors.comments}` : null}
              error={touched.comments && errors.comments}
              value={values.comments}
              disabled={isView}
              InputProps={{
                className: classes.input,
              }}
            />
          </div>
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre>
      <pre> {JSON.stringify(values, null, 2)}</pre> */}
      {isView === false && (
        <div style={{ paddingTop: "4%", paddingRight: "20px" }}>
          {!isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              Create Lead
            </Button>
          )}
          {isEdit && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
              disabled={title === "Lead" && role !== "Sadmin" ? true : false}
            >
              Edit Lead
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateForms;
