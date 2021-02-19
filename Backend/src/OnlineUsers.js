class OnlineUsers {


  constructor(){
    this.usersArray = [];
    this.toDisconnect = [];
    this.clientUsersArray = [];
  }

  get users(){
    return this.usersArray;
  }

  get disconnected(){
    return this.toDisconnect;
  }

  get clientUsers(){

    return this.usersArray.map((el)=>({
      user_id : el._id,
      username : el.name
    }));
  }

  add(newUser){
    const existUser = this.usersArray.find((el)=>(el._id === newUser._id));
    const filteredUsers = this.usersArray.filter((el)=>(el._id !== newUser._id));

    if(typeof existUser !== 'undefined'){
      this.usersArray = filteredUsers.concat(newUser);
      this.toDisconnect.push(existUser);
    }else{
      this.usersArray.push(newUser);
    }
  }


  remove(user){
    const filteredUsers = this.usersArray.filter((el)=>(el._id !== user._id));
    this.usersArray = filteredUsers;
  }

  clearDisconnect(){
    this.toDisconnect = [];
  }


}

module.exports = OnlineUsers;
