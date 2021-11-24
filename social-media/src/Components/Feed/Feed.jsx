import './feed.css';
import { Share } from '../Share/Share';
import { Post } from '../post/Post';
//import { posts } from '../../DummyData.js'; //dummy data
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import  axios  from 'axios';
import { AuthContext } from '../../Context/AuthContext';



export const Feed = ({username}) => {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext);
   // console.log("from feed Kindly come bro", user,isFetching,error,dispatch);
    useEffect(() => {
        const fetchData = async () => {
            const res = username
                ? await axios.get('http://localhost:4444/api/post/profile/' + username)
                : await axios.get(`http://localhost:4444/api/post/timeline/${user._id}`);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
           // console.log(posts)
        }
        fetchData();
    },[username,user._id])
    return (
        <div className="feedContainer">
            <div className="feedwrapper">
              {(!username||username === user.userName) &&  <Share />}
                {posts && posts.map((item, i) => {
                    return <Post key={i} post={item}/>
                })}
                
            </div>
        </div>
    )
}
