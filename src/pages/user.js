import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Vibez from '../components/vibez/Vibez';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import VibezSkeleton from '../util/VibezBase';
import ProfileSkeleton from '../util/ProfileBase';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    vibezIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const vibezId = this.props.match.params.vibezId;

    if (vibezId) this.setState({ vibezIdParam: vibezId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { vibezs, loading } = this.props.data;
    const { vibezIdParam } = this.state;

    const vibezsMarkup = loading ? (
      <VibezSkeleton />
    ) : vibezs === null ? (
      <p>No vibezs from this user</p>
    ) : !vibezIdParam ? (
      vibezs.map((vibez) => <Vibez key={vibez.vibezId} vibez={vibez} />)
    ) : (
      vibezs.map((vibez) => {
        if (vibez.vibezId !== vibezIdParam)
          return <Vibez key={vibez.vibezId} vibez={vibez} />;
        else return <Vibez key={vibez.vibezId} vibez={vibez} openDialog />;
      })
    );

    return (
      <Grid container spacing={2}>
        {' '}
        {/* 16 doesn't work, using spacing={2} instead */}
        <Grid item sm={8} xs={12}>
          {vibezsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
