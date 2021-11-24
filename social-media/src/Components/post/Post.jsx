import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './post.css';
//import { users } from '../../DummyData.js' //dummy data
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {format} from 'timeago.js'
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
console.log(PF)

export const Post = ({ post }) => {
   // console.log(post)
   // const user = users.filter(item => item.id === 1) //return array of single element ==>
   // console.log(user[0].username) get username ==>
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({}) //for single User
   // console.log(post.userId);
    const { user:currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:4444/api/user?userId=${post.userId}`);
            setUser(res.data);
            //console.log(user)
        }
        fetchData();
    }, [post.userId]);

    //if Post alredy been liked in DB ==>
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id)) //return true or false;
    },[currentUser._id,post.likes])

    const clickHandler = () => {
        try {
           axios.put(`http://localhost:4444/api/post/${post._id}/likes`,{userId:currentUser._id}) 
        } catch (err) {
            console.log(err)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked);
    }
    return ( 
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {/* <img src={users.filter((item)=> item.id===post?.userId)[0].profilePicture} alt="pic" className="postProfileImage" /> from dummyData */}
                        <Link to={`/profile/${user.userName}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture :  PF+"noAvatar.png"} alt="pic" className="postProfileImage" />
                        </Link>
                        <span className="postUserName">{user.userName }</span>
                        <span className="postTime">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon className='postIcon'/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                 {(post.img && post.img!=="" && post.img!=="image.png") ?  <img src={PF+post.img} alt="pic" className="postImage" /> : null}  
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUpIcon className={isLiked ? "likePostIcon2" : "likePostIcon"}  onClick={ clickHandler }/>
                        <FavoriteIcon className={isLiked ? "heartPostIcon2" : "heartPostIcon"}   onClick={ clickHandler }/> 
                        <span className="postLikesCounter">{like} {like>1 ? "Peoples likes it" : "People like it" }</span>
                        
                    </div>
                    <div className="postBottomRight">
                        <span className="postComments">Comments  { post?.comments}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
