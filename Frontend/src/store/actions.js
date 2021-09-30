import {SET_ID,
  SET_ONLINE_LIST,
  SET_ACTIVE_CHAT,
  ADD_MESSAGE,
  SET_CONVERSATIONS_LIST,
  SET_MESSAGES,
  SET_ACTIVE_USER,
  TOGGLE_OPEN_SIDEBAR,
  ADD_CONVERSATION,
  NEW_MESSAGE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from './constants';

export const setId = (payload)=>{
  return {type : SET_ID,payload}
};

export const setOnlineList = (payload)=>{
  return {type : SET_ONLINE_LIST,payload}
};

export const setActiveChat = (payload)=>{
  return {type : SET_ACTIVE_CHAT,payload}
};

export const setActiveUser = (payload)=>{
  return {type : SET_ACTIVE_USER,payload}
};

export const addMessage = (payload)=>{
  return {type : ADD_MESSAGE,payload }
};

export const setConversationsList = (payload)=>{
  return {type : SET_CONVERSATIONS_LIST,payload }
};

export const setMessages = (payload)=>{
  return {type : SET_MESSAGES,payload}
}


export const addConversation = (payload)=>{
  return {type : ADD_CONVERSATION,payload}
}

export const toggleSidebar = ()=>{
  return {type : TOGGLE_OPEN_SIDEBAR}
}

export const newMsgNotification = ()=>{
  return {type : NEW_MESSAGE_NOTIFICATION }
}

export const clearNotifications = ()=>{
  return {type : CLEAR_NOTIFICATIONS }
}

export const fetchConversations = (payload)=>{
  return (dispatch)=>{
    fetch(payload)
      .then((res)=>(res.json()))
      .then((res)=>{dispatch(setConversationsList(res))})
      .catch((err)=>{console.log(err)});
  }
}

export const loadMessages = (payload)=>{
  return (dispatch)=>{
    fetch(payload)
      .then((res)=>(res.json()))
      .then((res)=>(dispatch(setMessages(res))))
      .catch((err)=>{console.log(err)});
  }
}
