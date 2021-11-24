import './topbar.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export const Topbar = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   // console.log("from Top bar",user)
   
    return (
        <div>
            <div className='topbarContainer'>
                <div className="topBarleft">
                    <Link to="/" style={{textDecoration:"none"}}> <span className="topbarlogo">
                    MySocialMedia
                </span></Link>
               
            </div>
            <div className="topBarcenter">
                <div className="topbarSearch">
                    <SearchIcon className="serachIcon"/>
                    <input placeholder="Search for friends,post,video" className="searchInput"></input>
                </div>
            </div>
                <div className="topBarright">
                <div className="topbarLinks">
                    <span className="topbarLink">Home</span>
                    <span className="topbarLink">Timeline</span>
                    </div>
                    
                    <div className="topbarIconsCont">
                    <div className="topbarIconItem">
                    <PersonIcon />
                    <span className="topbariconBudge">1</span>
                </div>
                    <div className="topbarIconItem">
                            <Link to="/messenger" style={{color:"#fff"}}>
                            <ChatIcon />
                            </Link>
                    <span className="topbariconBudge">2</span>
                </div>
                <div className="topbarIconItem">
                    <NotificationsIcon />
                    <span className="topbariconBudge">1</span>
                    </div>
                    </div>
              

                    <div>
                    <Link to={`/profile/${user.userName}`}>
                    <img src={ user.profilePicture ?  PF+user.profilePicture : PF+"noAvatar.png"} alt="pic" className="topbarprofile" />
                    </Link>
                   </div>
            </div>
            
        </div>
        </div>
       
    )
}
