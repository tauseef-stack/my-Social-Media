import './messenger.css';
import { Topbar } from './../../Components/Topbar/Topbar';
import { Conversation } from './../../Components/Conversation/Conversation';
import { Message } from './../../Components/Message/Message';
import { ChatOnline } from './../../Components/ChatOnline/ChatOnline';
import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { io } from "socket.io-client";

export const Messenger = () => {
    const [conversation, setConversation] = useState([]);
    const { user } = useContext(AuthContext);
    const [currentChat, setCurrentChat] = useState(null);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollRef = useRef();
    
    //socket ===>
    const socket = useRef()
  
    useEffect(() => {
        socket.current = io("ws://localhost:5555");
        socket.current.on("getMessage", (data) => {
          setArrivalMessage({
            senderId: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
        });
      }, []);
    
      useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.senderId) &&
          setMessage((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);
    
 
     useEffect(() => {
        socket.current.emit("addUser", user._id) //sending to server ==>
        socket.current.on("getUsers", (users) => { //recieving from server ==>
            //console.log(users)
            setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
        })
     }, [user]);
     
   

   
    useEffect(() => {
        const getConversation = async() => {
            try {
                const res = await axios.get("http://localhost:4444/api/conversation/"+user._id);
                setConversation(res.data);
             } catch (err) {
                console.log(err)
            }
        }
        getConversation();
    }, [user])

    
    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get("http://localhost:4444/api/message/" + currentChat?._id);
                setMessage(res.data)
                console.log(res.data);
            } catch (err) {
               
                console.log(err)
            }
       
        }
        getMessage();
    }, [currentChat])
    // console.log(currentChat)
     console.log(message)
    const handleNewMessage = async (e) => {
        e.preventDefault();
        const messageNewData = {
            senderId: user._id,
            conversationId: currentChat._id,
            text:newMessage,
        }

        //sending message through Socket ==>
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
          );
      
          socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
          });
        //end socket 
        try {
            const res = await axios.post("http://localhost:4444/api/message", messageNewData);
            setMessage([...message, res.data]);
            setNewMessage("")
            
        } catch (err) {
            console.log(err)
        }
    }

  

    //Scroll UseEffect ==>
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])
    

    
    return (
        <>
            <Topbar/>
         <div className="messengerContainer">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for friends!" className="chatMenuInput" />
                        {conversation.map((conv,i) => (
                            <div onClick={()=>setCurrentChat(conv)}>
                                    <Conversation key={i} conversation={conv} currentUser={user} />
                            </div>
                        ))}
                       
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                        <div className="chatBoxTop">
                                    {message.map((message,i) =>
                                    (
                                        <div ref={scrollRef} key={i}>
                                                <Message key={i} message={message} own={message.senderId === user._id} />
                                        </div>
                                     ))
                                        }
                            
                        </div>
                        <div className="chatBoxBottom">
                            <textarea onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} placeholder="write something" className="chatMessageInput"></textarea>
                            <button className="chatSubmitButton" onClick={handleNewMessage}>Send</button>
                                </div> </>)
                            :
                            (<span className="noCoversationText">Open Conversation to start a Chat!</span>)
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentUserId={user._id} setCurrentChat={ setCurrentChat }/>
                    
                    </div>
               </div>
        </div>
        </>
       
    )
}
