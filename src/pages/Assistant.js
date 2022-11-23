import React, { useState, useEffect, useContext } from "react";
import { io } from 'socket.io-client';
import { useLocation } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import Messages from "../components/Assistant/Messages";
import Input from "../components/Assistant/Input";
import "../styles/contactUs/Assistant.css";

let connection;
const Assistant = () => {

    const authCtx = useContext(AuthContext);
    const [room, setRoom] = useState({});
    const [userJoined, setUserJoined] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const location = useLocation();

    console.log("location", location);
    const existingRoom = () => {
        setRoom(location?.state?.room);
        console.log("output-room", room);
    }

    const joinRoom = () => {
        if (room) {
            console.log("join", {
                name: authCtx?.user?.name,
                room_id: room._id,
                user_id: authCtx?.user?.userId
            })
            connection.emit("join", {
                name: authCtx?.user?.name,
                room_id: room._id,
                user_id: authCtx?.user?.userId
            });
            setUserJoined(true);
        }
    }

    const getMessage = () => {
        connection.on("message", message => {
            setMessages([...messages, message])
        });
    }

    const getMessages = () => {
        if (room && userJoined) {
            connection.emit("get-messages-history", room._id);
            setUserJoined(false);
            connection.on('output-messages', messagesData => {
                setMessages(messagesData);
            })
        }
    }

    const sendMessage = e => {
        e.preventDefault();
        if (message) {
            console.log("sendMessage", { message, room_id: room._id })
            connection.emit("sendMessage", message, room._id, () => setMessage(""));
            getMessage();
        }
    }

    useEffect(() => {
        connection = io("https://nmk-store-socketio.herokuapp.com");
        connection.on("connection");
        // connection.emit("user", authCtx?.user);
        existingRoom();
        joinRoom();
        getMessages();
        return () => connection.close()
    }, [authCtx]);

    return (
        <div className="outerContainer">
            <div className="container">
                <Messages messages={messages} user_id={authCtx?.user?.userId} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    )
}

export default Assistant