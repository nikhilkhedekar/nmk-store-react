import React from 'react';
import '../../styles/contactUs/Message.css';

const Message = ({ uniqueKey, message: { userName, user, text }, current_uid }) => {
    let isCurrentUser = false;
    if (user === current_uid) {
        isCurrentUser = true;
    }
    return (
        isCurrentUser ? (<div key={uniqueKey} className="row right-align">
            <div className="col s12 m8 16 right">
                <p className="sentbyme"> {userName}: {text}</p>
            </div>
        </div>) : (<div className="row left-align">
            <div className="col s12 m8 16 left">
                <p className="opponent"> {userName}: {text}</p>
            </div>

        </div>)

    )
}

export default Message