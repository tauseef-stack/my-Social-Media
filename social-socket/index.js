const io = require("socket.io")(5555, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
          users.push({ userId, socketId });
         //console.log(users)
  };
  
  const removeUser = (socketId) => {
      users = users.filter((user) => user.socketId !== socketId);
      //console.log(users)
  };
  
const getReciever = (recieverId) => {
    const myUser = users.find((user) => user.userId === recieverId);
    //console.log(myUser, recieverId);
    return myUser;
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    
    //take userId and socketId from user
      socket.on("addUser", (userId) => {
        console.log(userId)
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const reciever = getReciever(receiverId);
        //console.log(reciever);
      io.to(reciever.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });