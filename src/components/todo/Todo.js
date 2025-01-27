import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTodoData } from "../../selectors/selectTodo";
import { viewTodo } from "../../actions/todo";
import Table from "../table/index";

const Todo = (props) => {
  const { dataFeed, sendMsg } = props;

  const [todos, setTodo] = useState(dataFeed);

  useEffect(() => {
    setTodo(dataFeed);
  }, [dataFeed]);

  useEffect(() => {
    sendMsg();
  }, []);

  const columnFeed = [
    {
      Header: "Todo Name",
      accessor: "todoName",
    },
    {
      Header: "User Name",
      accessor: "userName",
    },
    {
      Header: "User Email",
      accessor: "userEmail",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "End Date",
      accessor: "endDate",
    },
    {
      Header: "Short Description",
      accessor: "shortDescription",
    },
    {
      Header: "Long Description",
      accessor: "longDescription",
    },
    {
      Header: "User Comments",
      accessor: "comments",
    },
    {
      Header: "Todo Status",
      accessor: "status",
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
      <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Todo</h2>
      <Table
        title={"Todo"}
        toolbarEnable={"todo"}
        columnFeed={columnFeed}
        dataFeed={todos}
        hiddenColumns={["userName", "longDescription", "comments"]}
      />
      <div>
        <p> </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataFeed: getTodoData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: () => {
      dispatch(viewTodo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
