import React, { useEffect } from "react";
import AddLeadDialog from "../candidate/AddLeadDialog";
import AddUserDialog from "../user/AddUserDialog";
import AddLovDialog from "../user/AddLovDialog";
import AddJobDialog from "../job/AddJobDialog";
import AddBucketDialog from "../bucket/AddBucketDialog";
import AddClientDialog from "../clients/AddClientDialog";
import AddTodoDialog from "../todo/AddTodoDialog";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Info from "@material-ui/icons/Info";
import GlobalFilter from "./Filter";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import CancelIcon from "@material-ui/icons/Cancel";
import CachedIcon from "@material-ui/icons/Cached";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { lighten, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue",
      "Helvetica", "Arial", sans-serif`,
    fontSize: `16px`,
  },
});

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    addHandler,
    deleteHandler,
    editHandler,
    showHideOptions,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    title,
    getActiveRecords,
    getInActiveRecords,
    resetRecords,
    showMore,
  } = props;

  let deleteInfo = {};
  deleteInfo.title = title;
  let detailInfo = {};
  detailInfo.isView = true;

  return (
    <MuiThemeProvider theme={THEME}>
      <Toolbar
      // className={clsx(classes.root, {
      //   [classes.highlight]: numSelected > 0,
      // })}
      >
        {/* <Tooltip - you can enable it later...
          title={showMore === false ? "Show Hidden Columns" : "Hide Columns"}
        >
          <IconButton onClick={showHideOptions} style={{ float: "left" }}>
            {showMore === false && <ArrowDropUpIcon fontSize="large" />}
            {showMore === true && <ArrowDropDownIcon fontSize="large" />}
          </IconButton>
        </Tooltip> */}

        {title !== "" && title !== "List Of Values" && (
          <Tooltip title="Active Filter">
            <IconButton
              onClick={() => getActiveRecords()}
              style={{ float: "left" }}
            >
              <PlaylistAddCheckIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {title !== "" && title !== "List Of Values" && (
          <Tooltip title="InActive Filter">
            <IconButton
              onClick={() => getInActiveRecords()}
              style={{ float: "left" }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {title !== "" && title !== "List Of Values" && (
          <Tooltip title="Clear Filter">
            <IconButton
              onClick={() => resetRecords()}
              style={{ float: "left" }}
            >
              <CachedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {title === "Score Card" && (
          <AddLeadDialog addHandler={addHandler} title={title} />
        )}
        {title === "User" && (
          <AddUserDialog addHandler={addHandler} title={title} />
        )}
        {title === "Job" && (
          <AddJobDialog addHandler={addHandler} title={title} />
        )}
        {title === "Bucket" && (
          <AddBucketDialog addHandler={addHandler} title={title} />
        )}
        {title === "Client" && (
          <AddClientDialog addHandler={addHandler} title={title} />
        )}
        {title === "Todo" && (
          <AddTodoDialog addHandler={addHandler} title={title} />
        )}
        {title === "List Of Values" && (
          <AddLovDialog addHandler={addHandler} title={title} />
        )}

        {numSelected > 0 && title !== "" ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component={"span"}
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component={"span"}
            style={{
              fontFamily: `"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue",
            "Helvetica", "Arial", sans-serif`,
              fontSize: `16px`,
              fontWeight: "bold",
            }}
          >
            {props.title !== "" ? `New ${props.title}` : ""}
          </Typography>
        )}

        {numSelected > 0 &&
        title !== "Lead" &&
        title !== "" &&
        title !== "List Of Values" ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => {
                deleteHandler(deleteInfo);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}

        {numSelected === 1 && title !== "" ? (
          <Tooltip title="Edit">
            <IconButton aria-label="delete" onClick={editHandler}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}

        {numSelected === 1 && title !== "" ? (
          <Tooltip title="Detail Info">
            <IconButton
              aria-label="delete"
              onClick={() => editHandler(detailInfo)}
            >
              <Info />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </Toolbar>
    </MuiThemeProvider>
  );
};

// TableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   addHandler: PropTypes.func.isRequired,
//   deleteHandler: PropTypes.func.isRequired,
//   editHandler: PropTypes.func.isRequired,
//   setGlobalFilter: PropTypes.func.isRequired,
//   preGlobalFilteredRows: PropTypes.array.isRequired,
//   // globalFilter: PropTypes.string.isRequired,
// };

export default TableToolbar;
