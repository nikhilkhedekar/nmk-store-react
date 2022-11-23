import { useEffect, useState } from "react"
import AxiosInstance from "../../axiosinstance";
import { Grid, TextField, Stack } from "@mui/material"
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import { LoadingButton } from '@mui/lab';

const UpdateMobile = () => {
    const [mobileNo, setMobileNo] = useState("");
    const [verficationCode, setVerificationCode] = useState("");
    let getVerificationCode;

    const onBlurHandler = async () => {
        getVerificationCode = await AxiosInstance.patch("/api/v1/users/mobile/verify", { number: mobileNo });
        console.log("getVerificationCode", getVerificationCode);
    }

    const submitHandler = async () => {
        const mobileVerfied = await AxiosInstance.patch("/api/v1/users/mobile/validate", {
            code: verficationCode,
        });
        console.log("numberVerfied", mobileVerfied);
    }

    return (
        <Grid rowSpacing={2} columnSpacing={1} container my={4} >
            <Grid item xs={6}>
                <TextField
                    label='Mobile Number'
                    fullWidth
                    type='text'
                    maxLength="12"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    onBlur={onBlurHandler}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label={`OTP`}
                    fullWidth
                    helperText="Valid for 5 minutes"
                    type='text'
                    maxLength="4"
                    value={verficationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                /></Grid>
            <Stack spacing={2} direction='row' margin={2} >
                <LoadingButton fullWidth size="large" type="submit" variant="contained"
                    onClick={submitHandler}
                    startIcon={<MobileFriendlyIcon />} >
                    Update Mobile Number
                </LoadingButton>
            </Stack>
        </Grid>

    )
}

export default UpdateMobile