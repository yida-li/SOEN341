import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
// MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//Icon
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import LikeButton from "./LikeButton";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

//stuff
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 400
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  root: {
    maxWidth: 600,
    position: "relative",
    //display: "flex",
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  buttonPosition: {
    flex: 1,
    flexDirection: "row"
  }
});

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime); //what does ths line do
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
        screamImageUrl
      },
      user: {
        authenticated,
        credentials: { handle },
      }
    } = this.props; //distructuing ? defactoring
    //start defining deleteButton
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={userImage}
              className={classes.avatar}
              component={Link}
              to={`/users/${userHandle}`}
            >
              <Typography
                variant="h5"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
              >
                {userImage}
              </Typography>
            </Avatar>
          }
          action={deleteButton}
          //action={<IconButton>{deleteButton}</IconButton>}
          title={
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}{" "}
              {/* in order to get rid of errors, change all Date to string type */}
            </Typography>
          }
        />
       {screamImageUrl? <CardMedia
          image={screamImageUrl}
          title="Profile image"
          className={classes.media}
        />: <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.media}
      />}
        <CardContent className={classes.content}>
          <Typography variant="body1">
            <b>{userHandle} </b>
            {body}
          </Typography>
          <hr className={classes.visibleSeparator} />
          <LikeButton screamId={screamId}>{deleteButton}</LikeButton>
          <span>{likeCount} vibez</span>
          <hr className={classes.visibleSeparator} />
          <MyButton tip="comments">
            <ChatBubbleOutlineIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
