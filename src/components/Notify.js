import { Snackbar } from "@mui/material";

const Notify = ({ open, handleClose, message }) => {
    console.log("onfo", {open, message});
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    )
}

export default Notify;