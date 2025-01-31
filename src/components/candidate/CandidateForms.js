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
  const teamList = [
    { "id": 1, "team": "Team1" },
    { "id": 2, "team": "Team2" }
  ]

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
          Create Score Card
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
          Edit Score Card
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
          View Score Card
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
                id="recruiterName"
                name="recruiterName"
                label="Recruiter Name"
                size="medium"
                margin="dense"
                required
                InputProps={{
                  className: classes.input,
                }}
                helperText={
                  errors.recruiterName ? `${errors.recruiterName}` : null
                }
                error={touched.recruiterName && errors.recruiterName}
                variant="outlined"
                value={values.recruiterName || ""}
                onChange={handleChange}
                disabled={isView}
                onBlur={handleBlur}
              />
            </td>

            <td className="candidate-align ">
              <TextField
                select
                name="team"
                autoFocus
                variant="outlined"
                margin="dense"
                label="Team"
                required
                fullWidth={true}
                value={values.team || "SELECT"}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.team &&
                  errors.team &&
                  values.team !== "SELECT"
                }
                helperText={
                  errors.team ? `${errors.team}` : null
                }
              >
                {(values.team === undefined ||
                  values.team === null) && (
                    <MenuItem value={"SELECT"}>Select Team</MenuItem>
                  )}
                {teamList.map((e) => (
                  <MenuItem value={e.team}>{e.team}</MenuItem>
                ))}
              </TextField>
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="achievedInterviews"
                name="achievedInterviews"
                label="Achieved Interviews"
                size="medium"
                margin="dense"
                required
                error={touched.achievedInterviews && errors.achievedInterviews}
                helperText={errors.achievedInterviews ? `${errors.achievedInterviews}` : null}
                InputProps={{
                  className: classes.input,
                }}
                value={values.achievedInterviews || ""}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>

            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="expectedInterviews"
                name="expectedInterviews"
                label="Expected Interviews"
                size="medium"
                margin="dense"
                required
                error={touched.expectedInterviews && errors.expectedInterviews}
                helperText={errors.expectedInterviews ? `${errors.expectedInterviews}` : null}
                InputProps={{
                  className: classes.input,
                }}
                value={values.expectedInterviews || ""}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>
          </tr>

          <tr>
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="day"
                name="day"
                label="Day"
                size="medium"
                margin="dense"
                error={
                  touched.day &&
                  Boolean(errors.day)
                }
                helperText={
                  errors.day
                    ? `${errors.day}`
                    : null
                }
                value={values.day}
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
                id="month"
                name="month"
                label="Month"
                size="medium"
                margin="dense"
                error={
                  touched.month &&
                  Boolean(errors.month)
                }
                helperText={
                  errors.month
                    ? `${errors.month}`
                    : null
                }
                value={values.month}
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
            <td className="candidate-align">
              <TextField
                variant="outlined"
                id="year"
                name="year"
                label="Year"
                size="medium"
                margin="dense"
                error={
                  touched.year &&
                  Boolean(errors.year)
                }
                helperText={
                  errors.year
                    ? `${errors.year}`
                    : null
                }
                value={values.year}
                InputProps={{
                  className: classes.input,
                }}
                disabled={isView}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </td>
          </tr>


          <div style={{ paddingLeft: "20px", width: "193%" }}>
            <TextField
              variant="outlined"
              id="comments"
              name="comments"
              label="Comments"
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
