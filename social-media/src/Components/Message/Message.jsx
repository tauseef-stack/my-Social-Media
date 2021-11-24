import './message.css';
import { format } from "timeago.js";
export const Message = ({ message, own }) => {
  
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "messageContainer own" : "messageContainer"}>
            <div className="messageTop">
                <img src={PF + "tauseef.jpg"} alt="pic" className="messageImg" />
                <p className="messageText">{ message.text }</p>
            </div>
            <div className="messageBottom">{ format(message.createdAt) }</div>
        </div>
    )
}
