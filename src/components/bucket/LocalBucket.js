import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { myLeadData } from "../../selectors/visibleBucket";
import { viewCandidate } from "../../actions/candidate";
import "./../../styles/grid.css";
import ErBndry from "../error/ErrorBoundry";
import Table from "../table/index";

const LocalLead = (props) => {
  const { dataFeed, sendMsg } = props;

  const [localLead, setLocalLead] = useState(dataFeed);

  useEffect(() => {
    setLocalLead(dataFeed);
  }, [dataFeed]);

  useEffect(() => {
    sendMsg();
  }, []);

  const columnFeed = [
    {
      Header: "FirstName",
      accessor: "leadFirstName",
    },
    {
      Header: "LastName",
      accessor: "leadLastName",
    },
    {
      Header: "Phone",
      accessor: "leadPhone",
    },
    {
      Header: "Practice Area",
      accessor: "leadPracticeArea",
    },
    {
      Header: "Salary",
      accessor: "leadSalary",
    },
    {
      Header: "Visa",
      accessor: "leadVisaType",
    },
    {
      Header: "State",
      accessor: "leadState",
    },
    {
      Header: "Bucket",
      accessor: "bucket.bucketName",
    },
  ];

  return (
    <ErBndry>
      <div style={{ paddingLeft: "21px", marginBottom: "250px" }}>
        <h2 style={{ fontSize: "17px", paddingLeft: "34px" }}>Local Leads</h2>
        <Table
          columnFeed={columnFeed}
          dataFeed={localLead}
          title={"Leads"}
          toolbarEnable={"Leads"}
          hiddenColumns={[
            // "leadLastName",
            "leadEmpName",
            "leadSecondaryEmail",
            "leadExpectedSalary",
            "leadEmpName",
            "leadPrefLoc",
            // "leadPracticeArea",
            "submittedJobId",
            "leadStatus",
            "leadNotes",
            "bucketId",
          ]}
        />
        <div>
          <p> </p>
        </div>
      </div>
    </ErBndry>
  );
};

const mapStateToProps = (state) => {
  return {
    dataFeed: myLeadData(state).filter((e) => e.leadVisaType === "USC"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: () => {
      dispatch(viewCandidate());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalLead);
