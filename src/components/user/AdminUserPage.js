import Box from "@material-ui/core/Box";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React from "react";
import ViewBucket from "./../bucket/ViewBucket";
import ViewUser from "./ViewUser";
import ViewLov from "./ViewLov";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue",
      "Helvetica", "Arial", sans-serif`,
    fontSize: `10px`,
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Montserrat",
    width: "100%",
    height: "1%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminUserPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <MuiThemeProvider theme={THEME}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="secondary"
          size="small"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Users"
            textColor="secondary"
            style={{ fontSize: "14px" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Buckets"
            textColor="secondary"
            style={{ fontSize: "14px" }}
            {...a11yProps(1)}
          />
          <Tab
            label="Manage Practice Area"
            textColor="secondary"
            style={{ fontSize: "14px" }}
            {...a11yProps(2)}
          />
        </Tabs>
      </MuiThemeProvider>
      <TabPanel value={value} index={0}>
        <ViewUser />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ViewBucket />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ViewLov />
        {/* Coming Soon... */}
      </TabPanel>
    </div>
  );
};

export default AdminUserPage;
