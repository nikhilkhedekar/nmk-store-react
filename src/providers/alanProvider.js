import alanBtn from "@alan-ai/alan-sdk-web"
import { useContext, useEffect, useState } from "react"
import AlanContext from "../contexts/alanContext"
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const AlanProvider = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken");
    const authToken = { token: accessToken };
    const authCtx = useContext(AuthContext);
    const userName = authCtx?.user?.name;
    const navigate = useNavigate();

    const alanButton = alanBtn({
        key: "e010d8b5bf73c4cf91f380a650d3bd1e2e956eca572e1d8b807a3e2338fdd0dc/stage",
        authData: authToken,
        onCommand: (commandData) => {
            console.log("command", commandData);
            switch (commandData.command) {    
                case "home":                                 
                    navigate(commandData.route);
                    break;
                case "orders":
                    navigate(commandData.route);
                    break;
                case "cart":
                    navigate(commandData.route);
                    break;
                default:
                    return;
            }    
        },

    });
    useEffect(() => {
        alanButton.activate();
        // Calling the project API method on button click
        alanButton.callProjectApi("setToken", {
            token: authToken.token
        }, function (error, result) {
            console.log("token", result);
        });
        alanButton.callProjectApi("greetUser", {
            user: userName
        }, function (error, result) {

        });
    }, []);
    return (
        <AlanContext.Provider value={{
            alanBtn: alanButton
        }} >
            {children}
        </AlanContext.Provider>
    )
}

export default AlanProvider