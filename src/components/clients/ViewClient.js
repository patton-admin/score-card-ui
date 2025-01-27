import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { getClientData } from "../../selectors/selectClients";
import { viewClient } from "../../actions/client";
import Table from "../table/index";

const Client = (props) => {
  const { dataFeed, sendMsg } = props;

  const [clients, setClients] = useState(dataFeed);

  useEffect(() => {
    setClients(dataFeed);
  }, [dataFeed]);

  useEffect(() => {
    sendMsg();
  }, []);

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
      Header: "Client Name",
      accessor: "clientName",
    },
    // {
    //   Header: "Client Status",
    //   accessor: "clientStatus",
    // },
    {
      Header: "Contact Person",
      accessor: "contactPerson",
    },
    {
      Header: "Client Email",
      accessor: "clientEmail",
    },
    {
      Header: "Vendor Name",
      accessor: "vendorName",
    },
    {
      Header: "Client Vendor",
      accessor: "vendorEmail",
    },
    {
      Header: "Vendor Contact",
      accessor: "vendorContactPerson",
    },
    {
      Header: "Bucket",
      accessor: "bcktClients.bucketName",
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
      <h2 style={{ fontSize: "17px", paddingLeft: "11px" }}>Clients</h2>
      <Table
        title={"Client"}
        toolbarEnable={"Client"}
        columnFeed={columnFeed}
        dataFeed={clients}
        hiddenColumns={["vendorContactPerson"]}
      />
      <div style={{ float: "right" }}>
        <p> .</p>
        <p> .</p>
        <p> .</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataFeed: getClientData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: () => {
      dispatch(viewClient());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Client);
