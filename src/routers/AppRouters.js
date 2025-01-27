import { createBrowserHistory } from "history";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import { Route, Router, Switch } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { userLogout } from "./../actions/login";
import Tooltip from "@material-ui/core/Tooltip";
import ViewJob from "../components/job/ViewJob";
import MyLead from "./../components/bucket/MyLead";
import Lead from "./../components/candidate/Lead";
import NotFound from "./../components/error/NotFound";
import Header from "./../components/Header";
import Home from "./../components/Home";
import Login from "./../components/login/Login";
import Help from "./../components/support/Help";
import Support from "./../components/support/Support";
import AdminUserPage from "./../components/user/AdminUserPage";
import Footer from "./../components/Footer";
import AlertDialogSlide from "./../components/login/IdleModal";
import ErBndry from "./../components/error/ErrorBoundry";
import Dashboard from "./../components/dashboard/Dashboard";
import IdleTimer from "react-idle-timer";
import "./../styles/Footer.css";
import { ServerStyleSheet } from "styled-components";
import Client from "../components/clients/ViewClient";
import Logout from "../components/login/Logout";
import LocalBucket from "../components/bucket/LocalBucket";

export const history = createBrowserHistory();

const scrollupHandler = (e) => {
  scroll.scrollToTop();
  // https://www.digitalocean.com/community/tutorials/how-to-implement-smooth-scrolling-in-react
};

export const AppRouters = (props) => {
  const { userIdleLogout, isLoggedIn } = props;

  const [timeOutDuration, setTimeOutDuration] = useState(300000);
  const [isVisible, setisVisible] = useState(false);
  const [isTimedOut, setIsTimeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //to perform the smooth scrolling...
  const checkScrollTop = () => {
    if (!isVisible && window.pageYOffset > 400) {
      setisVisible(true);
    } else if (isVisible && window.pageYOffset <= 400) {
      setisVisible(false);
    }
  };

  window.addEventListener("scroll", checkScrollTop);

  const onAction = (e) => {
    setIsTimeOut(false);
  };

  const onActive = (e) => {
    setIsTimeOut(false);
  };

  let idleTimer = null;

  //to validate the time if the user is idle...
  const onIdle = (e) => {
    console.log("user is idle", e);
    if (isLoggedIn && isTimedOut) {
      userIdleLogout();
      history.push("/");
      setShowModal(false);
    } else if (isLoggedIn) {
      setShowModal(true);
      idleTimer.reset();
      setIsTimeOut(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    setShowModal(false);
    history.push("/");
    userIdleLogout();
  };

  return (
    <Router history={history}>
      <>
        <IdleTimer
          ref={(ref) => {
            idleTimer = ref;
          }}
          element={document}
          onIdle={onIdle}
          debounce={250}
          timeout={timeOutDuration}
          onActive={onActive}
          onAction={onAction}
        />

        {isLoggedIn && <Header user={props.user} handleLogout={handleLogout} />}
        <ErBndry>
          <Switch>
            <Route path="/" exact component={Login} />
            {isLoggedIn && <Route path="/home" component={Home} />}
            {isLoggedIn && props.role === "Sadmin" && (
              <Route path="/usrMngmt" component={AdminUserPage} />
            )}
            {isLoggedIn && <Route path="/joborders" component={ViewJob} />}
            {isLoggedIn && <Route path="/mybucket" component={MyLead} />}
            {isLoggedIn && <Route path="/globalBucket" component={Lead} />}
            {isLoggedIn && <Route path="/local" component={LocalBucket} />}
            {isLoggedIn && <Route path="/client" component={Client} />}
            {isLoggedIn && <Route path="/help" component={Help} />}
            {isLoggedIn && <Route path="/support" component={Support} />}
            {isLoggedIn && <Route path="/dashboard" component={Dashboard} />}
            {isLoggedIn && <Route component={NotFound} />}
            {<Route component={Logout} />}
          </Switch>
        </ErBndry>
        {isLoggedIn && showModal && (
          <AlertDialogSlide
            showModal={showModal}
            handleClose={handleClose}
            handleLogout={handleLogout}
          />
        )}

        {isLoggedIn && isVisible === true && (
          <button className="scoller-footer-btn">
            {" "}
            <Tooltip title="Scroll up">
              <ArrowUpwardIcon onClick={scrollupHandler}></ArrowUpwardIcon>
            </Tooltip>
          </button>
        )}
        {isLoggedIn && (
          <footer>
            <Footer />
          </footer>
        )}
      </>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.loginSuccess,
    user: state.login.firstName,
    role: state.login.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userIdleLogout: () => {
      dispatch(userLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouters);
