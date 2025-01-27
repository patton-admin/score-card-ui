import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getLeadData } from "../../selectors/visibleBucket";
import { viewCandidate } from "./../../actions/candidate";
import Table from "./../table/index";

const Lead = (props) => {
  const { dataFeed, sendMsg } = props;

  const [candidates, setCandidates] = useState(dataFeed);

  useEffect(() => {
    setCandidates(dataFeed);
  }, [dataFeed]);

  useEffect(() => {
    sendMsg();
  }, []);

  const columnFeed = [
    // {
    //   Header: "Lead Id",
    //   accessor: "id",
    // },
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
    <div
      style={{
        paddingLeft: "21px",
        marginBottom: "250px",
        marginRight: "25px",
      }}
    >
      <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Global Leads</h2>
      <Table
        title={"Lead"}
        toolbarEnable={"Lead"}
        columnFeed={columnFeed}
        dataFeed={candidates}
        hiddenColumns={[
          "leadEmpName",
          "leadSecondaryEmail",
          "leadExpectedSalary",
          "leadEmpName",
          "leadPrefLoc",
          // "leadLastName",
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
  );
};

const mapStateToProps = (state) => {
  return {
    dataFeed: getLeadData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: () => {
      dispatch(viewCandidate());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
