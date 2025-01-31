import MomentUtils from "@date-io/moment";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { availableBuckets } from "../../selectors/visibleBucket";
import "../../styles/dashboard.css";
import {
  getDashboardData,
  getLeadDashboardData,
} from "./../../actions/dashboard";
import DashboardTabs from "./DashboardTabs";

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "#dcebec",
    marginTop: "8px",
  },
  root: {
    marginTop: "23px",
  },
}));

const initialFilterValue = {
  startDate: moment().add(-30, "days").format("YYYY/MM/DD"),
  endDate: moment().format("YYYY/MM/DD"),
  bktId: "SELECT",
};

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Breme",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#e57373",
      borderColor: "#ef5350",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#d32f2f",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#b71c1c",
      pointHoverBorderColor: "#ff8a80",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "Karthik",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#a5d6a7",
      borderColor: "#81c784",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#43a047",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#69f0ae",
      pointHoverBorderColor: "#76ff03",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [5, 95, 60, 17, 16, 5, 10],
    },
    {
      label: "Manjula",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [6, 9, 89, 8, 6, 75, 98],
    },
  ],
};

const data1 = {
  labels: ["Breme", "Karthik", "Manjula"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const Dashboard = ({ availableBuckets, sendMsg, dataFeed, dataFeedLead }) => {
  const classes = useStyles();

  console.log("available Buckets...", availableBuckets);
  const columnFeed = [
    // {
    //   Header: "Job Order Id",
    //   accessor: "leadJobOrderid",
    // },
    // {
    //   Header: "Job Title",
    //   accessor: "leadJobTitle",
    // },
    {
      Header: "JobId",
      accessor: "joborder_id",
    },
    {
      Header: "Job Title",
      accessor: "joborder_title",
    },
    {
      Header: "ClientName",
      accessor: "client_name",
    },
    {
      Header: "BucketName",
      accessor: "bucketName",
    },
    // {
    //   Header: "Order Date",
    //   accessor: "creation_date",
    // },
    {
      Header: "Priority",
      accessor: "joborder_priority",
    },
    {
      Header: "City",
      accessor: "joborder_city",
    },
  ];

  const columnFeedLead = [
    // {
    //   Header: "Job Order Id",
    //   accessor: "leadJobOrderid",
    // },
    // {
    //   Header: "Job Title",
    //   accessor: "leadJobTitle",
    // },
    {
      Header: "Bucket",
      accessor: "bucket_name",
    },
    {
      Header: "FirstName",
      accessor: "lead_firstname",
    },
    {
      Header: "LastName",
      accessor: "lead_lastname",
    },
    {
      Header: "PracticeArea",
      accessor: "lead_practice_area",
    },
    {
      Header: "visaType",
      accessor: "lead_visatype",
    },
    {
      Header: "Exp",
      accessor: "lead_yrs_of_exp",
    },
    {
      Header: "Submitted JobId",
      accessor: "lead_submitted_job_id",
    },
  ];

  // const t = dataFeed.map((e) => {
  //   if (e.bucket_tbl_bucket_id) {
  //     let name = availableBuckets.find(
  //       (bkt) => bkt.bktId === e.bucket_tbl_bucket_id
  //     );
  //     e.bucket_tbl_bucket_id = name;
  //   }
  // });

  const [chartData, setChartData] = useState(dataFeed);
  const [chartLeadData, setChartLeadData] = useState(dataFeedLead);
  const [startDate, setStartDate] = useState(initialFilterValue.startDate);
  const [endDate, setEndDate] = useState(initialFilterValue.endDate);
  const [bktId, setBktId] = useState(initialFilterValue.bktId);

  useEffect(() => {
    const t = dataFeed.map((e) => {
      if (e.bucket_tbl_bucket_id) {
        let name = availableBuckets.find(
          (bkt) => bkt.bktId === e.bucket_tbl_bucket_id
        );
        e.bucketName = name.bktName;
        return e;
      }
    });
    setChartData(t);
  }, [dataFeed]);

  useEffect(() => {
    setChartLeadData(dataFeedLead);
  }, [dataFeedLead]);

  const handleChange = (bktId) => {
    try {
      console.log("bucketId from bucket...", bktId.target.value);
      setBktId(bktId.target.value);
    } catch (e) {
      console.log("value of e...", e);
    }
  };

  const submit = (event) => {
    let values = {};
    try {
      if (startDate) {
        values.startDate =
          typeof startDate === "object"
            ? moment(startDate).format("YYYY/MM/DD")
            : startDate;
      } else {
        values.startDate = initialFilterValue.startDate;
      }
      if (endDate) {
        values.endDate =
          typeof endDate === "object"
            ? moment(endDate).format("YYYY/MM/DD")
            : endDate;
      } else {
        values.endDate = initialFilterValue.endDate;
      }
      if (bktId !== "SELECT") {
        values.bucketId = bktId !== undefined ? bktId : 0;
      } else {
        values.bucketId = -1;
      }
      console.log("Values that are submitted are...", values);
      sendMsg(values);
      setChartData([]);
      setChartLeadData([]);
      event.preventDefault();
    } catch (e) {
      console.log("value of e...", e);
    }
  };

  return (
    <div>
      <form
        onSubmit={(startDate, endDate, bktId) =>
          submit(startDate, endDate, bktId)
        }
        style={{ paddingLeft: "3%" }}
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            // disableToolbar
            variant="inline"
            // autoOk={true}
            format="YYYY/MM/DD"
            margin="normal"
            // id="date-picker-inline"
            name="startDate"
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          {"   "}
          <KeyboardDatePicker
            // disableToolbar
            variant="inline"
            autoOk={true}
            format="YYYY/MM/DD"
            margin="normal"
            // id="date-picker-inline"
            name="endDate"
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <span>{""}</span>
        <span style={{ paddingLeft: "20px" }}>
          <TextField
            select
            name="bucketId"
            autoFocus
            variant="filled"
            size="medium"
            margin="dense"
            label="Bucket"
            value={bktId || "SELECT"}
            InputProps={{
              className: classes.input,
            }}
            onChange={(bktId) => handleChange(bktId)}
          >
            <MenuItem value={"SELECT"}>Select Bucket</MenuItem>
            {availableBuckets.map((e) => (
              <MenuItem value={e.bktId}>{e.bktName}-bkt</MenuItem>
            ))}
          </TextField>
        </span>

        <span style={{ paddingLeft: "20px" }}>
          <Button
            type="submit"
            value="Submit"
            variant="outlined"
            color="primary"
            style={{
              // float: "right",
              marginTop: "26px",
              paddingRight: "40px",
            }}
          >
            Filter Data
          </Button>
        </span>
      </form>
      <div className="clearfix"></div>
      <div className="row">
        <div className="row">
          {/* <DashboardTabs
            chartData={chartData}
            chartLeadData={chartLeadData}
            columnFeed={columnFeed}
            columnFeedLead={columnFeedLead}
          /> */}
          <br></br>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    availableBuckets: availableBuckets(state),
    dataFeed: state.dashboard.dashboards,
    dataFeedLead: state.dashboard.dashboardLeads,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: (x) => {
      dispatch(getDashboardData(x));
      dispatch(getLeadDashboardData(x));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
