import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
//import the new js file MyButton.js
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
import SearchBar from "../../util/searchBar"
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//Icon
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Avatar from "@material-ui/core/Avatar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import TestField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  }
}));

class Navbar extends Component {
  render() {
    const { authenticated, userHandle,avatar } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <SearchBar/>
              <PostScream />
              <Link to={`/users/${userHandle}`}>
              <MyButton tip="Your profile">
                <AccountCircleIcon />
              </MyButton>
              </Link>
              <Link to="/">
                <MyButton tip="dashboard boiii">
                  <DashboardIcon color="primary" />
                </MyButton>
              </Link>
              <Link to={`/users/follower`}>
              <MyButton tip="Your follower">
                <PeopleIcon />
              </MyButton>
              </Link>
              <Notifications color="primary" />
              <Avatar src={avatar}/>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propsTypes = {
  authenticated: PropsTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated, //from userReducer
  userHandle: state.user.credentials.handle,
  avatar: state.user.credentials.imageUrl
});

export default connect(mapStateToProps)(Navbar);
