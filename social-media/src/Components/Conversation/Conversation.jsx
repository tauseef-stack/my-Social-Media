import './conversation.css';
import { useState, useEffect } from 'react';
import  axios  from 'axios';

export const Conversation = ({conversation,currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friend, setFriend] = useState(null)
    //console.log(conversation)
    
    useEffect(() => {
        const friendId = conversation.members.find(Id => Id !== currentUser._id);
        const getFriend = async () => {
            try {
                const res = await axios.get("http://localhost:4444/api/user?userId=" + friendId);
                setFriend(res.data)
             } catch (err) {
                console.log(err)
            }
        }
        getFriend();
       
    },[currentUser,conversation])

    return (
         <div className="conversationContainer">
         <img src={friend?.profilePicture ? PF+friend.profilePicture : PF+"noAvatar.png"} alt="pic" className="conversationImg" />
            <span className="conversationName">{friend?.userName }</span>
        </div>
    )
}
