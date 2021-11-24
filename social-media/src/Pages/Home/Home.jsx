import './home.css';
import { Sidebar } from '../../Components/Sidebar/Sidebar';
import { Feed } from '../../Components/Feed/Feed';
import { Rightbar } from '../../Components/Rightbar/Rightbar';
import { Topbar } from "../../Components/Topbar/Topbar";

export const Home = () => {

    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed/>
                <Rightbar/>
            </div>
        </>
    )
}
