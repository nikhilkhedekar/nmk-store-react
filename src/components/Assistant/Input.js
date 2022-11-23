import React from 'react';
import '../../styles/contactUs/Input.css';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form onSubmit={sendMessage} className="form">
            <input type="text" className="input"
                placeholder="Type a message"
                value={message}
                onChange={e => setMessage(e.target.value)}            
                onKeyPress={e => e.key == 'Enter' ? sendMessage(e) : null}
            />
            <button type="submit" className="sendButton">Send Message</button>
        </form>
    )
}

export default Input
