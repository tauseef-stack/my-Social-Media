import './sidebarFriends.css'

export const SidebarFriends = ({user}) => {
    return (
        <li className="sidebarFriend">
        <img src={user.profilePicture} alt="pic" className="sidebarImage" />
            <span className="sidebarFriendName">{ user.username }</span>
        </li>
    )
}
