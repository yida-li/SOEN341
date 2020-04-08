import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload, //an array of scream
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      //like_scream and unlike_scream will behave the same, same code
      //if like a scream, add the like to the array of the liker and increase the like for the person liked
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      //check error here, screamId is not found
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload; //update the scream displayed after the action is made
        //problem solved here: clicking the like button in the diaglog does not update the like counted
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      let index1 = state.screams.findIndex(
        scream => scream.screamId === action.payload
      ); //payload is the scream ID from dataAction
      state.screams.splice(index1, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state, //return the state as it was
        screams: [action.payload, ...state.screams] //return all the screams including the new added
      };
    case SET_SCREAM:
      return {
        ...state, //without this, cannot display avatar for the scream.. hmmm
        scream: action.payload
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
