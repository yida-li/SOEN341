import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ClearIcon from "@material-ui/icons/Clear";

import { connect } from "react-redux";
import { deleteVibez } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "0%",
  },
};

class DeleteVibez extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteVibez = () => {
    this.props.deleteVibez(this.props.vibezId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Vibez"
          onClick={this.handleOpen}
          btmClassName={classes.deleteButton}
        >
          <ClearIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Bad vibez? Delete?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Keep
            </Button>
            <Button onClick={this.deleteVibez} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteVibez.propTypes = {
  deleteVibez: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  vibezId: PropTypes.string.isRequired,
};

export default connect(null, { deleteVibez })(withStyles(styles)(DeleteVibez));
