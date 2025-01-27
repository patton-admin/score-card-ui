import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllUser } from "./../../actions/user";
import Table from "../table/index";
import ErBndry from "./../error/ErrorBoundry";

const ViewUser = (props) => {
  const { dataFeed, sendMsg } = props;

  const [users, setUsers] = useState(dataFeed);

  useEffect(() => {
    setUsers(dataFeed);
  }, [dataFeed]);

  useEffect(() => {
    sendMsg();
  }, []);

  const columnFeed = [
    {
      Header: "First Name",
      accessor: "userFirstName",
      aggregate: "count",
      Aggregated: ({ value }) => `${value} Names`,
    },
    {
      Header: "Last Name",
      accessor: "userLastName",
      aggregate: "count",
      Aggregated: ({ value }) => `${value} Names`,
    },
    {
      Header: "User Id",
      accessor: "userLoginId",
      filter: "fuzzyText",
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} Unique Names`,
    },
    {
      Header: "User Role",
      accessor: "userRole",
      filter: "fuzzyText",
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} (based on userRoles)`,
    },
    {
      Header: "Primary Contact",
      accessor: "userPrimaryPhone",
      filter: "fuzzyText",
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} (userPrimaryPhone)`,
    },
    {
      Header: "Location",
      accessor: "userLocation",
      filter: "fuzzyText",
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} (userLocationl)`,
    },
  ];

  const title = "User";
  return (
    <ErBndry>
      <div>
        <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Users</h2>
        {/* <UserContext.Provider value={{ title }}> */}
        <Table
          toolbarEnable={"User"}
          columnFeed={columnFeed}
          dataFeed={users || []}
          hiddenColumns={["userPassword"]}
          title={"User"}
        />
        <div style={{ float: "right" }}>
          <p> .</p>
          <p> .</p>
          <p> .</p>
        </div>
        {/* </UserContext.Provider> */}
      </div>
    </ErBndry>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: (x) => {
      dispatch(getAllUser());
    },
  };
};

// const dataFeed = useSelector((state) => state.user.users);
const mapStateToProps = (state) => {
  return {
    dataFeed: state.user.users,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);
