import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "../table/index";
import { getJobData } from "./../../selectors/selectJobOrders";
import { getAllJob } from "../../actions/job";
import ErBndry from "./../error/ErrorBoundry";

const ViewJob = (props) => {
  const { dataFeed, sendMsg } = props;

  const [jobs, setJobs] = useState(dataFeed);

  useEffect(() => {
    setJobs(dataFeed);
  }, [dataFeed]);

  useEffect(() => {
    sendMsg();
  }, []);

  const columnFeed = [
    {
      Header: "Job Id",
      accessor: "id",
    },
    {
      Header: "Job Title",
      accessor: "jobOrderTitle",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "Rate",
      accessor: "rate",
    },
    {
      Header: "Total positions",
      accessor: "noOfPositions",
    },
    {
      Header: "Priority",
      accessor: "priority",
    },
    {
      Header: "Visa",
      accessor: "visaType",
    },
    {
      Header: "Client",
      accessor: "clientTbl.clientName",
    },
    // {
    //   Header: "Status",
    //   accessor: "jobOrderStatus",
    // },
  ];

  return (
    <ErBndry>
      <div
        style={{
          paddingLeft: "21px",
          marginBottom: "250px",
          marginRight: "25px",
        }}
      >
        <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Jobs</h2>
        <Table
          title={"Job"}
          toolbarEnable={"Job"}
          columnFeed={columnFeed}
          dataFeed={jobs || []}
          hiddenColumns={[
            "leadEmpName",
            "leadSecondaryEmail",
            "leadExpectedSalary",
            "leadEmpName",
            "leadPrefLoc",
            "leadPracticeArea",
            "submittedJobId",
            // "leadStatus",
            "leadNotes",
            "bucketId",
          ]}
        />
        <div style={{ float: "right" }}>
          <p> .</p>
          <p> .</p>
          <p> .</p>
        </div>
      </div>
    </ErBndry>
  );
};

// const dataFeed = useSelector((state) => state.jobOrder.jobOrders);

const mapStateToProps = (state) => {
  return {
    dataFeed: getJobData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: () => {
      dispatch(getAllJob());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewJob);
