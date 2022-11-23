import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { upatePassword } from "../../actions/userActions";
import AuthContext from "../../contexts/authContext";

const UpdatePassword = () => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const changeHandler = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(upatePassword(passwords));
        setPasswords({
            oldPassword: "",
            newPassword: ""
        })
    }
    return (
        <div>
            <h3> Hi! {authCtx.user.name || authCtx.user.role} </h3>
            <span>Change your password</span>
            <form onSubmit={submitHandler} >
                <label htmlFor="oldPassword" >Old Password:
                    <input id="oldPassword" name="oldPassword" value={passwords.oldPassword} onChange={changeHandler} type="password" />
                </label><br />

                <label htmlFor="newPassword" >New Password:
                    <input id="newPassword" name="newPassword" value={passwords.newPassword} onChange={changeHandler} type="password" />
                </label><br />

                <button type="submit"> Update Password </button>
            </form>
        </div>
    )
}

export default UpdatePassword