import React, { useEffect } from "react";
import CustomTable from "./CustomTable";

const TableApp = ({
  title,
  toolbarEnable,
  dataFeed,
  columnFeed,
  hiddenColumns,
  userList,
}) => {
  const columns = React.useMemo(() => [].concat(columnFeed), []);

  const [data, setData] = React.useState(dataFeed);

  useEffect(() => {
    if (dataFeed.length === data.length) {
      setData(dataFeed);
    }
  }, [dataFeed]);

  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div
      style={{
        paddingLeft: "10px",
      }}
    >
      {/* <CssBaseline /> */}
      <CustomTable
        columns={columns}
        data={data}
        filterData={dataFeed}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        hiddenColumns={hiddenColumns}
        title={title}
        toolbarEnable={toolbarEnable}
        userList={userList}
      />
    </div>
  );
};

export default TableApp;
