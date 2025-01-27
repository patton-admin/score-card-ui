import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { viewLov } from "../../actions/util";
import { getAvailablePracticeArea } from "./../../selectors/selectUtils";
import Table from "../table/index";
import ErBndry from "../error/ErrorBoundry";

const ViewLov = ({ dataFeed }) => {
  const [lovs, setLovs] = useState(dataFeed);

  useEffect(() => {
    setLovs(dataFeed);
  }, [dataFeed]);

  const columnFeed = [
    {
      Header: "Practice Area Id",
      accessor: "prAreaid",
    },
    {
      Header: "Practice Area",
      accessor: "practiceArea",
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    // },
    {
      Header: "Lov Status",
      accessor: "displayStatusLov",
    },
  ];

  const title = "LOV";
  return (
    <ErBndry>
      <div>
        <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Practice Area</h2>
        <Table
          toolbarEnable={"User"}
          columnFeed={columnFeed}
          dataFeed={dataFeed || []}
          hiddenColumns={["status"]}
          title={"List Of Values"}
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
    dataFeed: state.util.lovs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: (x) => {
      dispatch(viewLov());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewLov);
