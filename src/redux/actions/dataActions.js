import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";
//get all screams
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  //from here, can start using axios, suspecting that dispatch is from redux
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

//like a screams
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data //payload is the data returned from the sever/API
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//unlike a scream
export const unlikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`) //send a request to this url built in backend step
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data //payload is the data returned from the sever/API
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Submit a comment
export const submitComment = (screamId, commentData) => dispatch => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

//delete a scream noted that only the ones that were commented by the user will show the button
export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId }); //get the screamId removed, then used to update the local screams array
      //problem solved here using payload: after deleting, though being removed from the database, the info still appears on local newsfeed
    })
    .catch(err => console.log(err));
};
//clearing eeror when adding a scream
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
// Post a scream
export const postScream = newScream => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/scream", newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
//get inside the dialog of a single scream
export const getScream = screamId => dispatch => {
  dispatch({ type: LOADING_UI }); //link to the type loading_ui
  axios
    .get(`/scream/${screamId}`) //sending a get request
    .then(res => {
      //defining what to do with the response/callback function
      dispatch({
        type: SET_SCREAM, //connect to type set_scream
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI }); //after load the returned data to the payload, link to stop_loading_ui
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};
