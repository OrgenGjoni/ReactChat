import {SET_ID,
        SET_ONLINE_LIST,
        SET_ACTIVE_CHAT,
        SET_MESSAGES,
        SET_CONVERSATIONS_LIST,
        SET_ACTIVE_USER,
        ADD_CONVERSATION,
        TOGGLE_OPEN_SIDEBAR,
        NEW_MESSAGE_NOTIFICATION,
        CLEAR_NOTIFICATIONS
          } from './constants';

const initialState = {
  id : false,
  onlineUsers : [],
  activeUser : false,
  activeChat : false,
  conversations : [],
  messages : [],
  test : 0,
  sidebarOpen : true,
  newMessageNotification : 0,
}

const rootReducer = (state = initialState, action)=>{

  switch (action.type) {
    case SET_ID :
      return Object.assign({}, state, {
        id : action.payload
      });

    case SET_ONLINE_LIST :

      return Object.assign({}, state, {
        onlineUsers : action.payload
      });

    case SET_ACTIVE_CHAT :

      return Object.assign({}, state, {
        activeChat : action.payload,
        activeUser : false
      });

    case SET_ACTIVE_USER : 
      return Object.assign({}, state, {
        activeUser : action.payload,
        activeChat : false
      });

    case SET_CONVERSATIONS_LIST :

      return Object.assign({},state,{
        conversations : action.payload
      });

    case SET_MESSAGES :

      return Object.assign({},state,{messages : action.payload});

    case ADD_CONVERSATION :
      return Object.assign({},state,{conversations : [action.payload].concat(state.conversations)});

    case TOGGLE_OPEN_SIDEBAR :
      return Object.assign({},state,{sidebarOpen : !state.sidebarOpen});

    case NEW_MESSAGE_NOTIFICATION :
      return Object.assign({},state,{newMessageNotification : ++state.newMessageNotification});

    case CLEAR_NOTIFICATIONS :
      return Object.assign({},state,{newMessageNotification : 0});
    default:
      return state;
  }

}

export default rootReducer;
