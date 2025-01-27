import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Table from "./../table/index";

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
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Montserrat",
    width: "100%",
    height: "1%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const DashboardTabs = ({
  chartData,
  chartLeadData,
  columnFeed,
  columnFeedLead,
}) => {
  const classes = useStyles1();
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
            label="Job Info"
            textColor="secondary"
            style={{ fontSize: "12px" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Lead Info"
            textColor="secondary"
            style={{ fontSize: "12px" }}
            {...a11yProps(1)}
          />
        </Tabs>
      </MuiThemeProvider>
      <TabPanel value={value} index={0}>
        <div>
          {chartData.length > 0 ? (
            <>
              <p style={{ paddingLeft: "400px", fontWeight: "bold" }}>
                {`Total JobOrders found for the given search Filter: ${chartData.length}`}
              </p>
              <Table
                title={""}
                toolbarEnable={""}
                columnFeed={columnFeed}
                dataFeed={chartData || []}
                hiddenColumns={[]}
              />
              <p>...</p>
            </>
          ) : (
            <p style={{ paddingLeft: "400px" }}>
              {"No JobOrders found for the given search Filter"}
            </p>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {chartLeadData.length > 0 ? (
          <>
            <p style={{ paddingLeft: "400px", fontWeight: "bold" }}>
              {`Total Leads found for the given search Filter: ${chartLeadData.length}`}
            </p>
            <Table
              title={""}
              toolbarEnable={""}
              columnFeed={columnFeedLead}
              dataFeed={chartLeadData || []}
              hiddenColumns={[]}
            />
            <p>...</p>
          </>
        ) : (
          <p style={{ paddingLeft: "400px" }}>
            {"No Leads found for the given search Filter"}
          </p>
        )}
      </TabPanel>
    </div>
  );
};

export default DashboardTabs;
