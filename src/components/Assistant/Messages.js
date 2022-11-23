import React from 'react'
import Message from './Message';
import STB from 'react-scroll-to-bottom';
import '../../styles/contactUs/Messages.css';

const Messages = ({ messages, user_id }) => {
    return (
        <STB className="messages">

            {messages.map((message, i) => (
                <Message uniqueKey={message._id} message={message} current_uid={user_id} />
            ))}

        </STB>
    )
}

export default Messages