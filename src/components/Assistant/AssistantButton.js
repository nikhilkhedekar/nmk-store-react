import { io } from 'socket.io-client';
import { useContext, useEffect, useId, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../contexts/authContext';

let connection;
const AssistantButton = () => {
    const authCtx = useContext(AuthContext);    
    const [room, setRoom] = useState(null);
    let createRoomFlag = false;
    const roomName = useId();
    const navigate = useNavigate()

    const existingRoom = () => {
        connection.on("output-room", (roomData) => {
            setRoom(roomData);
            console.log("output-room", room);
        });
    }

    const createRoom = () => {        
        connection.emit("create-room", roomName, authCtx?.user?.userId);
        console.log("create-room", roomName);
        createRoomFlag = true;
        console.log("createRoomFlag", createRoomFlag);
    }

    const roomCreated = () => {        
        connection.on("room-created", (roomData) => {            
            setRoom(roomData);
            console.log("room-created", room);
            createRoomFlag = false;           
        })
    }

    useEffect(() => {
        connection = io("https://nmk-store-socketio.herokuapp.com");
        connection.on("connection");
        connection.emit("user", authCtx?.user?.userId);
        existingRoom();
        return () => connection.close();
    }, [authCtx]);

    const clickHandler = (e) => {
        e.preventDefault();    
        if (room == [] || room == null || room == undefined) {
            createRoom();
            console.log("creatRoomFlag", createRoomFlag);
            if (createRoomFlag) {
                roomCreated();
                setTimeout(() => {
                    // window.open(`/assistant`);
                    navigate("/assistant", {
                        state: {
                            room,
                        }
                    })
                }, 1000);
            }
           
        } else {
            setTimeout(() => {
                console.log("room exists", room);
                // window.open(`/assistant`);
                navigate("/assistant", {
                    state: {
                        room,
                    }
                })
            }, 1000);
        }
    }

    return (
        <div>
            <button onClick={clickHandler} > Assistant </button>
        </div>
    )
}

export default AssistantButton