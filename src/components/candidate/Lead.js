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
    {
      Header: "RecruiterName",
      accessor: "recruiterName",
    },
    {
      Header: "Team",
      accessor: "team",
    },
    {
      Header: "day",
      accessor: "leadPhone",
    },
    {
      Header: "Expected Interviews",
      accessor: "expectedInterviews",
    },
    {
      Header: "Achieved Interviews",
      accessor: "achievedInterviews",
    },
    {
      Header: "Comments",
      accessor: "comments",
    },
    {
      Header: "PK",
      accessor: "PK",
    },
    {
      Header: "SK",
      accessor: "SK",
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
      <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Score Card</h2>
      <Table
        title={"Score Card"}
        toolbarEnable={"Score Card"}
        columnFeed={columnFeed}
        dataFeed={candidates}
        hiddenColumns={["PK", "SK"]}
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
