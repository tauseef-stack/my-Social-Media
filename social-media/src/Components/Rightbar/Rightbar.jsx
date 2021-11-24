import './rightbar.css';
import { users } from '../../DummyData';
import {Online} from '../Online/Online';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../Context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Rightbar = ({ user }) => {
   // console.log("from right bar",user)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friendList, setFriendList] = useState([]);
    const [rightOnline, setRightOnline] = useState([]);
    const { user: currentUser,dispatch } = useContext(AuthContext)
  //  console.log("from Rightbar",currentUser.followings)
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
    useEffect(() => {
        const getOnlineFriends = async() => {
            try {
                const res = await axios.get("http://localhost:4444/api/user/allusers");
                const data = res.data;
                setRightOnline(data.filter((user) => user._id !== currentUser._id));
                console.log(rightOnline,currentUser)
             } catch (err) {
                console.log(err)
         }
        }
        getOnlineFriends();
    },[currentUser])

    // useEffect(() => {
    //     setFollowed(currentUser.followings.includes(user?.id))
    // }, [currentUser, user])

    const handleFollowing = async() => {
        try {
            if (followed) {
                await axios.put("http://localhost:4444/api/user/" + user._id + "/unfollow", { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            }
            else {
                await axios.put("http://localhost:4444/api/user/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
         } catch (err) {
           console.log(err)
        }
        setFollowed(!followed);
    }
    

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`http://localhost:4444/api/user/friends/${user._id}`)
                setFriendList(friendList.data)
                console.log(friendList)
            } catch (err) {
                console.log(err)
            }
        }
        getFriends();
    }, [user]);

    const HomeRightbar = () => {
        return (
            <>
            <div className="birthdayContainer">
                     <img src={PF+"gift.png"} alt="pic" className="birthdayImage" />
                     <span className="birthdayTxt">
                         <b>Shariq Ansari</b> and <b>3 otehrs friends</b> have birthday today
                     </span>
                 </div>
                 <img src={PF+"burgerAdd.jpg"} alt="pic" className="adimage" />
                 <h4 className="RightBarTitle">
                 online Friends
                 </h4>
                 <ul className="rightbarFriendList">
                     {rightOnline.map((item, i) => {
                         return <Online key={i} user={ item }/>
                    })}
                 </ul>
         </>
       ) 
    }

    const ProfileRightbar = () => {
        return (
            <>
                {user.userName !== currentUser.userName && (
                    <button className="rightbarFollowButton" onClick={handleFollowing}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <RemoveIcon/> :  <AddIcon/>}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                <div className="rightBarInfoItem">
                <span className="rightInfoKey">City:</span>
                        <span className="rightInfoValue">{ user.city }</span>
                </div>
                <div className="rightBarInfoItem">
                <span className="rightInfoKey">From:</span>
                <span className="rightInfoValue">{ user.from }</span>
                </div>
                <div className="rightBarInfoItem">
                <span className="rightInfoKey">Relationship:</span>
                <span className="rightInfoValue">{ user.relationship === 1 ? "Single" : user.relationship===2 ? "Married" : "-"}</span>
                </div>
                </div>
              
                
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightBarFollwersCont">
                    {friendList && friendList.map((friend) => (
                     <Link to={"/profile/"+friend.userName} style={{textDecoration:"none", color:"black"}}>
                        <div className="rightBarFollowings">
                         <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"noAvatar.png"} className="rightBarFollowingImg" alt="pic" />
                         <span className="rightBarFollowingUserName">
                             {friend.userName}
                         </span>
                     </div>
                    </Link>
                    ))}
               
                </div>
               
              
            </>
        )
       
    }
    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
             {user ? <ProfileRightbar/> : <HomeRightbar/> }  
            </div>
        </div>
    )
}
