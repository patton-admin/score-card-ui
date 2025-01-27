import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { myLeadData } from "../../selectors/visibleBucket";
import { viewCandidate } from "./../../actions/candidate";
import "./../../styles/grid.css";
import ErBndry from "./../error/ErrorBoundry";
import Table from "./../table/index";

const MyLead = (props) => {
  const { dataFeed, sendMsg } = props;

  const [myLead, setMyLead] = useState(dataFeed);

  useEffect(() => {
    setMyLead(dataFeed);
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
    <ErBndry>
      <div
        style={{
          paddingLeft: "21px",
          marginBottom: "250px",
          marginRight: "25px",
        }}
      >
        <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>My Leads</h2>
        <Table
          title={"Leads"}
          toolbarEnable={"Lead"}
          columnFeed={columnFeed}
          dataFeed={myLead}
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
    dataFeed: myLeadData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: () => {
      dispatch(viewCandidate());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLead);
