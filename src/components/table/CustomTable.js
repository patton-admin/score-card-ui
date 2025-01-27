import React, { useEffect } from "react";
import _ from "lodash";
import Checkbox from "@material-ui/core/Checkbox";
import MaUTable from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./Toolbar";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { deleteLov, openModal } from "./../../actions/util";
import { deleteCandidate } from "./../../actions/candidate";
import { deleteJob } from "./../../actions/job";
import { deleteClient } from "./../../actions/client";
import { deleteBucket } from "./../../actions/bucket";
import { deleteUser } from "./../../actions/user";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue",
      "Helvetica", "Arial", sans-serif`,
    fontSize: `14px`,
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(0, 38, 88, 0.91)",
      main: "rgba(0, 38, 88, 0.91)",
      // dark: "rgba(225, 110, 28, 0.91)",
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    color: "red",
  },
});

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const EditRecord = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <EditIcon ref={resolvedRef} {...rest} />
    </>
  );
});

const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: "transparent",
};

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      style={inputStyle}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  updateMyData: PropTypes.func.isRequired,
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  // Cell: EditableCell,
};

const EnhancedTable = ({
  columns,
  data,
  filterData,
  setData,
  updateMyData,
  skipPageReset,
  hiddenColumns,
  title,
  toolbarEnable,
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    allColumns,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const [show, setUnHide] = React.useState(false);
  const [dataHub, setDataHub] = React.useState(filterData);

  useEffect(() => {
    setDataHub(filterData);
  }, [filterData]);

  const showHideOptions = () => {
    setUnHide(!show);
  };

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const removeByIndexs = (array, indexs) =>
    array.filter((_, i) => !indexs.includes(i));

  const deleteHandler = (event, props) => {
    let rowId = Object.keys(selectedRowIds);
    let deleteInfo = title;

    if (data !== undefined && deleteInfo !== undefined) {
      let ids = [];
      if (deleteInfo !== "Client" && deleteInfo !== "User") {
        data.filter((e, ind) => {
          if (rowId.join("").includes(ind)) {
            ids.push(e.id);
          }
        });
      }

      if (deleteInfo === "Client") {
        data.filter((e, ind) => {
          if (rowId.join("").includes(ind)) {
            ids.push(e.clientId);
          }
        });
      }

      if (deleteInfo === "User") {
        data.filter((e, ind) => {
          if (rowId.join("").includes(ind)) {
            ids.push(e.userId);
          }
        });
      }

      if (deleteInfo === "List Of Values") {
        ids = [];
        data.filter((e, ind) => {
          if (rowId.join("").includes(ind)) {
            ids.push(e.prAreaid);
          }
        });
      }

      if (deleteInfo === "Lead" || deleteInfo === "Leads") {
        dispatch(deleteCandidate({ candidateId: ids }));
      } else if (deleteInfo === "Job") {
        dispatch(deleteJob({ jobId: ids }));
      } else if (deleteInfo === "Client") {
        dispatch(deleteClient({ clientId: ids }));
      } else if (deleteInfo === "Bucket") {
        dispatch(deleteBucket({ bucketId: ids }));
      } else if (deleteInfo === "User") {
        dispatch(deleteUser({ userId: ids }));
      } else if (deleteInfo === "List Of Values") {
        dispatch(deleteLov({ lovId: ids }));
      }
    }
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map((x) => parseInt(x, 10))
    );
    setData(newData);
  };

  const dispatch = useDispatch();

  const editHandler = (event) => {
    let rowId = Object.keys(selectedRowIds);
    if (rowId.length === 1 && event.isView === true) {
      const newData = data[rowId[0]];
      dispatch(openModal({ initialVal: newData, isOpen: true, isView: true }));
      return { data: newData };
    } else {
      const newData = data[rowId[0]];
      dispatch(openModal({ initialVal: newData, isOpen: true, isView: false }));
      return { data: newData };
    }
  };

  const addHandler = (x, handleProps) => {
    try {
      if (handleProps !== undefined) {
        if (handleProps.forComp === "Lead") {
          let remData = data.filter((e) => e.id !== x.id);
          let allData = remData.concat(x);
          setData(allData);
        } else if (handleProps.forComp === "User") {
          let remData = data.filter((e) => e.userId !== x.userId);
          let allData = remData.concat(x);
          setData(allData);
        } else if (handleProps.forComp === "Bucket") {
          let remData = data.filter((e) => e.id !== x.id);
          let allData = remData.concat(x);
          setData(allData);
        } else if (handleProps.forComp === "Client") {
          let remData = data.filter((e) => e.clientId !== x.clientId);
          let allData = remData.concat(x);
          setData(allData);
        } else if (handleProps.forComp === "Job") {
          let remData = data.filter((e) => e.id !== x.id);
          let allData = remData.concat(x);
          setData(allData);
        } else if (handleProps.forComp === "Lov") {
          let remData = data.filter((e) => e.prAreaid !== x.prAreaid);
          let allData = remData.concat(x);
          setData(allData);
        }
      } else {
        const newData = data.concat([x]);
        setData(newData);
      }
    } catch (e) {}
  };

  //get Active Records
  const getActiveRecords = () => {
    let activeData = filterData;
    if (title === "Job") {
      activeData = filterData.filter((e) => e.jobOrderStatus === "Active");
    } else if (title === "Lead" || title == "Leads") {
      activeData = filterData.filter((e) => e.leadStatus === "Active");
    } else if (title === "Client") {
      activeData = filterData.filter((e) => e.clientStatus === "Active");
    }
    console.log("active data ...", activeData);
    return setData(activeData);
  };

  //get InActive Records
  const getInActiveRecords = () => {
    let activeData = filterData;
    if (title === "Job") {
      activeData = filterData.filter((e) => e.jobOrderStatus === "InActive");
    } else if (title === "Lead" || title == "Leads") {
      activeData = filterData.filter((e) => e.leadStatus === "InActive");
    } else if (title === "Client") {
      activeData = filterData.filter((e) => e.clientStatus === "InActive");
    }
    console.log("Inactive data ...", activeData);
    return setData(activeData);
  };

  const resetRecords = () => {
    return setData(dataHub);
  };

  //on click of row will show the detail view of that record...
  const handleRowClick = (id, value) => {
    //https://github.com/tannerlinsley/react-table/issues/2010
    if (value !== undefined && id !== "") {
      let remData = data.filter((e, acc) => acc == id);
      if (remData.length > 0) {
        dispatch(
          openModal({ initialVal: remData[0], isOpen: true, isView: true })
        );
      }
    }
  };

  const classes = useStyles();

  // Render the UI for your table
  return (
    <TableContainer component={Paper} style={{ backgroundColor: "#d8d8d8" }}>
      {/* {show && (
        <section>
           <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle 
          <h4
            style={{
              paddingLeft: "32px",
              fontFamily: `"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue",
        "Helvetica", "Arial", sans-serif`,
              fontSize: `16px`,
            }}
          >
            {" "}
            Show/Hide columns
          </h4>
        </section>
      )} */}
      {/* {show &&
        allColumns.map((column, acc) => (
          <div
            key={column.id + acc}
            style={{ display: "inline", paddingLeft: "8px" }}
          >
            {" "}
            {column.id !== "selection" ? (
              <MuiThemeProvider theme={THEME}>
                <label>
                  <Checkbox
                    color="secondary"
                    {...column.getToggleHiddenProps()}
                  />{" "}
                  {column.Header}
                </label>
              </MuiThemeProvider>
            ) : null}
          </div>
        ))} */}
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        addHandler={addHandler}
        showHideOptions={showHideOptions}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        getActiveRecords={getActiveRecords}
        getInActiveRecords={getInActiveRecords}
        resetRecords={resetRecords}
        title={title}
        showMore={show}
      />
      <MaUTable {...getTableProps()}>
        <MuiThemeProvider theme={THEME}>
          <TableHead
            style={{
              fontWeight: "bolder",
              fontFamily: `"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue",
            "Helvetica", "Arial", "sans-serif"`,
              color: "#0d0d0d",
              backgroundColor: "#cfd8dc",
            }}
          >
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    // variant="head"
                    // size="small"
                    // align="justify"
                    {...(column.id === "selection"
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render("Header")}
                    {column.id !== "selection" ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
        </MuiThemeProvider>
        <MuiThemeProvider theme={THEME}>
          <TableBody
            style={{
              backgroundColor: "#d8d8d8",
              fontFamily: `"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue",
              "Helvetica", "Arial", "sans-serif"`,
            }}
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  // hover="true"
                  // selected="true"
                  {...row.getRowProps()}
                  style={{ cursor: title !== "" ? "pointer" : "" }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        // align="justify"
                        // size={"small"}
                        // variant="body "
                        {...cell.getCellProps({
                          onClick: (e) => {
                            if (
                              cell.column.id !== "selection" &&
                              title !== ""
                            ) {
                              handleRowClick(row.id, row.values);
                            }
                          },
                        })}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiThemeProvider>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: "All", value: data.length },
              ]}
              colSpan={3}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default EnhancedTable;
