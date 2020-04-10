import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
//redux
import { connect } from "react-redux";
import { likeVibez, unlikeVibez } from "../../redux/actions/dataActions";
class LikeButton extends Component {
  likedVibez = () => {
    //first, check if there is a like in the user object
    //if there is something, return true, else return false
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.vibezId === this.props.vibezId)
    )
      return true;
    else return false;
  };

  likeVibez = () => {
    this.props.likeVibez(this.props.vibezId);
  };
  unlikeVibez = () => {
    this.props.unlikeVibez(this.props.vibezId);
  };
  render() {
    const { authenticated } = this.props.user;
    //defining the likeButton, doing this way since it requires if,else
    const likeButton = !authenticated ? ( //favoriteborder is the transparent heart icon
      <Link to="/login">
        <MyButton tip="like">
          <CheckCircleOutlineIcon color="primary" />
        </MyButton>
      </Link>
    ) : //after loging in
    this.likedVibez() ? ( //have you liked it? Yes, show the heart
      <MyButton tip="undo like" onClick={this.unlikeVibez}>
        <CheckCircleIcon color="primary" />
      </MyButton>
    ) : (
      //havent liked ? Show the transparent heart
      <MyButton tip="like" onClick={this.likeVibez}>
        <CheckCircleOutlineIcon color="primary" />
      </MyButton>
    );
    //finish defining likeButton
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  vibezId: PropTypes.string.isRequired,
  likeVibez: PropTypes.func.isRequired,
  unlikeVibez: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeVibez,
  unlikeVibez,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
