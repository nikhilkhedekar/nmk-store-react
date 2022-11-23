import { Stack } from "@mui/material"
import { Register, Login, ForgotPassword } from "../../pages"

const AuthPage = ({ bottomNavValue }) => {
    return(
        <Stack>
            <Stack border='1px solid' spacing={2} direction='vertical'>
                {
                    bottomNavValue == 0 && <Register />
                }
            </Stack>
            <Stack border='1px solid' spacing={2} direction='vertical'>
                {
                    bottomNavValue == 1 && <Login />
                }
            </Stack>
            <Stack border='1px solid' spacing={2} direction='vertical'>
                {
                    bottomNavValue == 2 && <ForgotPassword />
                }
            </Stack>
        </Stack>
    )
}

export default AuthPage