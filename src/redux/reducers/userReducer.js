import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_VIBEZ,
  UNLIKE_VIBEZ,
  MARK_NOTIFICATIONS_READ,
  SUBMIT_SEARCH,
  UPLOAD_VIBEZ_PIC,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  search_result: [], //ken added
  tempURL: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        search_result: [],
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_VIBEZ:
      return {
        ...state, //return the state as it is ... a bit unclear
        likes: [
          //an array of likes from the database
          ...state.likes,
          {
            userHandle: state.credentials.handle, //handle from user profile
            vibezId: action.payload.vibezId, //id from the payload AKA from the database
          },
        ], //a bit unclear why using square bracket..
      };
    case UNLIKE_VIBEZ:
      return {
        ...state, //retrieve the state
        likes: state.likes.filter(
          (like) => like.vibezId !== action.payload.vibezId // retrieve the id of the removed vibez.
          // This id will be used to update local vibezs defined in dataAction.js
        ),
      }; //done in this file

    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    case SUBMIT_SEARCH: //KEN ADDED
      state.search_result = action.payload;
      console.log(state.search_result); //for testing
      return {
        ...state,
      };
    case UPLOAD_VIBEZ_PIC:
      state.tempURL = action.payload; //put the URL
      console.log(state.tempURL);
      return {
        ...state,
      };
    default:
      return state;
  }
}
