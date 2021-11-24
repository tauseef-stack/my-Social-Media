import React from 'react'
import './sidebar.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import Button from '@mui/material/Button';
import { users } from '../../DummyData';
import {SidebarFriends} from '../sidebarFreinds/SidebarFriends';

export const Sidebar = () => {
    return (
        <div className="sidebarContainer">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeedIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Chats
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoLibraryIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Videos
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Groups
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Bookmarks
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Qusetions
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Jobs
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <EventAvailableIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Events
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <CastForEducationIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Courses
                        </span>
                    </li>
                </ul>
                <Button variant='contained' className="sidebarButton">Show More</Button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendLits">
                    {users.map((item, i) => {
                        return <SidebarFriends user={item} key={ i }/>
                    })}
                  
                </ul>

            </div>
        </div>
    )
}
