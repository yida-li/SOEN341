import {
  SET_VIBEZS,
  LOADING_DATA,
  LIKE_VIBEZ,
  UNLIKE_VIBEZ,
  DELETE_VIBEZ,
  LOADING_UI,
  POST_VIBEZ,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SET_VIBEZ,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

export const getVibezs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  //from here, can start using axios, suspecting that dispatch is from redux
  axios
    .get('/vibezs')
    .then((res) => {
      dispatch({
        type: SET_VIBEZS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_VIBEZS,
        payload: [],
      });
    });
};

//like a vibezs
export const likeVibez = (vibezId) => (dispatch) => {
  axios
    .get(`/vibez/${vibezId}/like`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LIKE_VIBEZ,
        payload: res.data, //payload is the data returned from the sever/API
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//unlike a vibez
export const unlikeVibez = (vibezId) => (dispatch) => {
  axios
    .get(`/vibez/${vibezId}/unlike`) //send a request to this url built in backend step
    .then((res) => {
      dispatch({
        type: UNLIKE_VIBEZ,
        payload: res.data, //payload is the data returned from the sever/API
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Submit a comment
export const submitComment = (vibezId, commentData) => (dispatch) => {
  axios
    .post(`/vibez/${vibezId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//delete a vibez noted that only the ones that were commented by the user will show the button
export const deleteVibez = (vibezId) => (dispatch) => {
  axios
    .delete(`/vibez/${vibezId}`)
    .then(() => {
      dispatch({ type: DELETE_VIBEZ, payload: vibezId }); //get the vibezId removed, then used to update the local vibezs array
      //problem solved here using payload: after deleting, though being removed from the database, the info still appears on local newsfeed
    })
    .catch((err) => console.log(err));
};
//clearing eeror when adding a vibez
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
// Post a vibez
export const postVibez = (newVibez) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/vibez', newVibez)
    .then((res) => {
      dispatch({
        type: POST_VIBEZ,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//get inside the dialog of a single vibez
export const getVibez = (vibezId) => (dispatch) => {
  dispatch({ type: LOADING_UI }); //link to the type loading_ui
  axios
    .get(`/vibez/${vibezId}`) //sending a get request
    .then((res) => {
      //defining what to do with the response/callback function
      dispatch({
        type: SET_VIBEZ, //connect to type set_vibez
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI }); //after load the returned data to the payload, link to stop_loading_ui
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_VIBEZS,
        payload: res.data.vibezs,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_VIBEZS,
        payload: null,
      });
    });
};
