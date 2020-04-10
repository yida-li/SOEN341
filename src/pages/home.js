import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Vibez from "../components/vibez/Vibez";
import Profile from "../components/profile/Profile";
import VibezSkeleton from "../util/VibezBase";

import { connect } from "react-redux";
import { getVibezs } from "../redux/actions/dataActions";
class home extends Component {
  //no more state, get it from the props from redux
  componentDidMount() {
    this.props.getVibezs();
  }
  render() {
    const { vibezs, loading } = this.props.data;
    let recentVibezsMarkup = !loading ? (
      vibezs.map((vibez) => <Vibez key={vibez.vibezId} vibez={vibez} />)
    ) : (
      <VibezSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        {/* 16 doesn't work, using spacing={2} instead */}
        <Grid item sm={8} xs={12}>
          {recentVibezsMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getVibezs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getVibezs })(home);
