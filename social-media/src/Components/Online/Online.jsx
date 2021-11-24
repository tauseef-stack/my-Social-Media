import './online.css';
export const Online = ({ user }) => {
  const  PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
        <div className="rightBarProfileImageContainer">
            <img src={user?.profilePicture ? PF+user.profilePicture : PF+"noAvatar.png"} alt="pic" className="rightBarProfileImage" />
            <span className="rightbarOnline"></span>
        </div>
            <span className="rightbarUsername">{ user?.userName }</span>
        </li>
    )
}
