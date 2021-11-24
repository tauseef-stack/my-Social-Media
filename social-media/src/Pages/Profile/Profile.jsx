import './profile.css';

import { Sidebar } from '../../Components/Sidebar/Sidebar';
import { Feed } from '../../Components/Feed/Feed';
import { Rightbar } from '../../Components/Rightbar/Rightbar';
import { Topbar } from "../../Components/Topbar/Topbar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const { username } = useParams();
   // console.log(username)
    useEffect (() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:4444/api/user?username=${username}`);
            setUser(res.data);
           // console.log('from profilepage',user)
        }
        fetchData();
    }, [username])

    return (
        <>
              <Topbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF+user.coverPicture : PF+"noCover.jpg"} alt="pic" className="profileCoverImg" />
                            <img src={user.profilePicture ? PF+user.profilePicture : PF+"noAvatar.png"} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{ user.userName }</h4>
                            <span className="profileInfoDesc">
                                {user.desc}
                            </span>
                        </div>
                     </div>
                    <div className="profileRightBottom">
                      <Feed username={username}/>
                      <Rightbar user={user} />
                     </div>
                </div> 
            </div>
        </>
    )
}
