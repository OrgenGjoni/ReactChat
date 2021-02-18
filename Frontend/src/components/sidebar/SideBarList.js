import React,{useState} from 'react';
import {Grid,Tabs,Tab,Badge,makeStyles} from '@material-ui/core';
import _ from 'lodash'
import {useDispatch,useSelector} from 'react-redux';
import {setActiveChat,loadMessages,setMessages,setActiveUser,setConversationsList,clearNotifications,toggleSidebar} from '../../store/actions';
import ConversationItem from './ConversationItem';
import OnlineUsersList from './OnlineUsersList';
import {BsFillPersonFill} from 'react-icons/bs';
import {AiFillMessage} from 'react-icons/ai';

const newStyle = makeStyles({
  convContainer : {
    flex : 1,
    width : '100%',
    overflowY : 'scroll',
    scrollbarWidth : 'none',
  },
  tabs : {
    width : '50%',
    fontSize : 12,
    color : '#fff'
  }
})

const SideBarList = ()=>{

  const SERVER = process.env.REACT_APP_SERVER_ADDRESS;
  const [onlineUsers,conversations,id,newNotifications] = useSelector((state)=>[state.onlineUsers,state.conversations,state.id,state.newMessageNotification]);
  const dispatch = useDispatch();
  const style = newStyle();
  const [value,setValue] = useState(1);


  const setActive = (payload)=>{
    dispatch(setActiveChat(payload))
  };


  const loadMsg = (id)=>{

    dispatch(loadMessages(SERVER + '/messages/' + localStorage.token + '/' + id))
  }


  const selectOnlineUser = (payload)=>{

    //Find if exist any conversation with the seected user as a partecipant and setActive if none found
    const conv = _.find(conversations,(el)=>{
                                              const res = _.find(el.partecipants,(part)=>(part.username === payload.username));
                                              return typeof res !== 'undefined' ? true : false;
                                            });

    if(typeof conv === 'undefined'){
      dispatch(setActiveUser(payload));
      dispatch(setMessages([]));
    }else{
      dispatch(setActiveChat(conv));
      loadMsg(conv.conv_id);
      readConversation(conv);
    }
  }


  const readConversation = (conv)=>{

    //Find the conversation we need to modify
    //Find the index of the conversations
    //Create a copy of the conversations array
    //Set unread_mesages to 0 on out conversations
    //Set the element in the array with convIndex index the value os our modified conversation
    //Dispatch new conversation list

    const theConv = _.find(conversations,(el)=>(el.conv_id === conv.conv_id));
    const convIndex = _.findIndex(conversations,(el)=>(el.conv_id === conv.conv_id));
    const convListCopy = Object.assign([],conversations);

    theConv.unread_mesages = 0;

    convListCopy[convIndex] = theConv;

    dispatch(setConversationsList(convListCopy));
    }



    const closeSlide = ()=>{
      dispatch(toggleSidebar());
    }







  const showConversations = (el)=>{
    return(
      <ConversationItem conversation = {el} closeSlide = {closeSlide} setActiveChat = {setActive} loadMessages = {loadMsg} id ={id} readConversation = {readConversation}/>
    )
  }

  const ConversationContainer = ()=>(
      <Grid className = {style.convContainer}>
        {conversations.map((el)=>(showConversations(el)))}
    </Grid>
  )

  const TheMessageBadge = ()=>{
    if(newNotifications !== 0 && value === 2){
      return <Badge variant = 'dot' color="secondary"><AiFillMessage size =  {14}/></Badge>
    }else{
      return <AiFillMessage size =  {14}/>
    }
  }

  const handleChange = (e,newVal)=>{
    setValue(newVal);
    if(newVal === 1){
      dispatch(clearNotifications());
    }
  }




  return(
    <React.Fragment>
      <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"

          >
          <Tab  value = {1} className = {style.tabs} icon = {<TheMessageBadge />} label = 'Messages' />
          <Tab  value = {2} className = {style.tabs} label = {onlineUsers.length === 1 ? 'Online 0' : 'Online ' + (onlineUsers.length - 1)} icon = {<BsFillPersonFill size =  {14} />} />
        </Tabs>

        {value === 1 ? <ConversationContainer  /> : <OnlineUsersList closeSlide = {closeSlide} onlineUsers = {onlineUsers} id = {id} selectOnlineUser = {selectOnlineUser} loadMessages = {loadMessages} />}

      </React.Fragment>
  );



}


export default SideBarList;
