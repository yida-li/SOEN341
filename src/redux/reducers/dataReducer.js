import {
  SET_VIBEZS,
  LIKE_VIBEZ,
  UNLIKE_VIBEZ,
  LOADING_DATA,
  DELETE_VIBEZ,
  POST_VIBEZ,
  SET_VIBEZ,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  vibezs: [],
  vibez: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_VIBEZS:
      return {
        ...state,
        vibezs: action.payload, //an array of vibez
        loading: false,
      };
    case LIKE_VIBEZ:
    case UNLIKE_VIBEZ:
      //like_vibez and unlike_vibez will behave the same, same code
      //if like a vibez, add the like to the array of the liker and increase the like for the person liked
      let index = state.vibezs.findIndex(
        (vibez) => vibez.vibezId === action.payload.vibezId
      );
      //check error here, vibezId is not found
      state.vibezs[index] = action.payload;
      if (state.vibez.vibezId === action.payload.vibezId) {
        state.vibez = action.payload; //update the vibez displayed after the action is made
        //problem solved here: clicking the like button in the diaglog does not update the like counted
      }
      return {
        ...state,
      };
    case DELETE_VIBEZ:
      let index1 = state.vibezs.findIndex(
        (vibez) => vibez.vibezId === action.payload
      ); //payload is the vibez ID from dataAction
      state.vibezs.splice(index1, 1);
      return {
        ...state,
      };
    case POST_VIBEZ:
      return {
        ...state, //return the state as it was
        vibezs: [action.payload, ...state.vibezs], //return all the vibezs including the new added
      };
    case SET_VIBEZ:
      return {
        ...state, //without this, cannot display avatar for the vibez.. hmmm
        vibez: action.payload,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        vibez: {
          ...state.vibez,
          comments: [action.payload, ...state.vibez.comments],
        },
      };
    default:
      return state;
  }
}
