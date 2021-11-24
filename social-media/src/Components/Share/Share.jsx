import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from './../../Context/AuthContext';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc: desc.current.value,
        }
        if (file) {
            const data = new FormData();
            const fileName =  file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            console.log(data)
            try {
                await axios.post("http://localhost:4444/api/upload",data)
             } catch (err) {
                console.log(err)
            }
        }
        try {
            await axios.post("http://localhost:4444/api/post", newPost)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='shareContainer'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"noAvatar.png"} alt="pic" className="shareProfileImg" />
                    <input placeholder={"what's in your mind " + user.userName + " ?"} ref={desc} className="shareInput" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="pic" className="shareImg" />
                        <CancelIcon className="shareCancel" onClick={()=>setFile(null) }/>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className='shareIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                            <input type="file" id="file" accept=".png,.jpeg,.jpg" style={{display:"none"}} className="ImageUploadFile" onChange={(e) => {
                                setFile(e.target.files[0]);
                            }} />
                        </label>

                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>

                        <div className="shareOption">
                            <RoomIcon htmlColor="green" className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>

                        <div  className="shareOption">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton">Share</button>
                </form>
           </div>
        </div>
    )
}
