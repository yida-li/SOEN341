import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EditIcon from "@material-ui/icons/Edit";
import ImageIcon from "@material-ui/icons/Image";
// Redux stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import { uploadImageForScream } from "../../redux/actions/userActions";

const styles = theme => ({
  //dont use ...theme, troublesome
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%"
  },
  picturePosting: {
    marginLeft: 10
  },
  ImageUploaded:{
    width:"300px"
  }
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
    screamImageUrl:"",
    pictureUploaded:false,
    formSubmitted:false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading&& this.state.formSubmitted) {
      this.setState({ body: '', open: false, errors: {},pictureUploaded:false,formSubmitted:false });
    }
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value,screamImageUrl:this.props.tempURL });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({formSubmitted:true,pictureUploaded:false})
    this.props.postScream({ body: this.state.body, screamImageUrl:this.state.screamImageUrl });
  };

  //  FOR UPLOADING
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImageForScream(formData);
    this.setState({pictureUploaded:true})
  };
  

  render() {
    console.log(this.state.screamImageUrl)
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
      tempURL
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="What's the vibe?">
          <PostAddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post your vibe</DialogTitle>
          
          <DialogContent>
          <div className="image-wrapper">
              {this.state.pictureUploaded?<img src={tempURL} 
              alt="Hello" className={classes.ImageUploaded}
               />
              :<h2>Submit something</h2>}
              <input
                type="file"
                id="imageUpload"
                
                onChange={this.handleImageChange}
              />
            </div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Description"
                multiline
                rows="3"
                placeholder="litty lyf"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="Upload"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  tempURL:state.user.tempURL
});


export default connect(mapStateToProps, { postScream, clearErrors, uploadImageForScream })(
  withStyles(styles)(PostScream)
);
