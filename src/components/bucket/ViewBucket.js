import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { viewBucket } from "./../../actions/bucket";
import ErBndry from "../error/ErrorBoundry";
import Table from "../table/index";
import { bucketInitialData } from "./../../selectors/visibleBucket";

const ViewBucket = (props) => {
  const { dataFeed, userList, sendMsg } = props;

  const [buckets, setBuckets] = useState(dataFeed);

  useEffect(() => {
    setBuckets(dataFeed);
  }, [dataFeed]);

  useEffect(() => {
    sendMsg();
  }, []);

  const columnFeed = [
    {
      Header: "Bucket Name",
      accessor: "bucketName",
    },
    {
      Header: "Bucket Owner",
      accessor: "bucketOwner",
    },
    {
      Header: "Description",
      accessor: "bktShrtDesc",
    },
    {
      Header: "Detailed Description",
      accessor: "bktLngDesc",
    },
  ];

  return (
    <ErBndry>
      <div style={{ paddingLeft: "10px" }}>
        <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Buckets</h2>
        <Table
          title={"Bucket"}
          toolbarEnable={"Bucket"}
          columnFeed={columnFeed}
          dataFeed={buckets || []}
          hiddenColumns={[]}
          userList={userList}
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

const mapStateToProps = (state) => {
  return {
    dataFeed: bucketInitialData(state),
    userList: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: () => {
      dispatch(viewBucket());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBucket);
