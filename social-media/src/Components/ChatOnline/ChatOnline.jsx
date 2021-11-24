import './chatOnline.css'
import { useState, useEffect } from 'react';
import  axios  from 'axios';

export const ChatOnline = ({currentUserId,setCurrentChat,onlineUsers}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get("http://localhost:4444/api/user/friends/" + currentUserId);
                setFriends(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getFriends();
        
    }, [currentUserId]);
    console.log(friends)

    useEffect(() => {
        setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers]);
    const clickToShowChatOfOnlineFriends = async(user) => {
        try {
            const res = await axios.get(`http://localhost:4444/api/conversation/find/${currentUserId}/${user._id}`);
            setCurrentChat(res.data);
         } catch (err) {
            console.log(err)
        }
    }
    return (
       
        <div className="chatOnlineContainer">
             { onlineFriends.map((o)=> (
            <div className="chatOnlineFriends" onClick={()=>clickToShowChatOfOnlineFriends(o)}>
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src={o?.profilePicture ? PF+o.profilePicture : PF+"noAvatar.png"}alt="pic" />
                <div className="chatOnlineBadge">
                    
                 </div>
            </div>
                     <span className="chatOnlineName">{ o.userName }</span>
        </div>   
        ))}
        </div>
    )
}
