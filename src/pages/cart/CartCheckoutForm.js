import { Button, Stack, Box, Card, CardActions, CardContent } from "@mui/material";
import {
    PaymentElement,
    useStripe,
    useElements, TextField
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartCheckout } from "../../actions/cartActions";
import AuthContext from "../../contexts/authContext";
import GPayCheckoutButton from "../../components/Order/gPayCheckoutButton";
import AxiosInstance from "../../axiosinstance";

const CartCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    let getPaymentIntent;    
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!stripe && !authCtx?.clientSecret) {
            return;
        }
        const getOtpFunc = async () => {
            const getOtp = await AxiosInstance.patch("/api/v1/users/otp/create");
            setToken(getOtp?.data?.token);
            console.log("otpRes", getOtp);
        }
        const getPaymentIntentFunc = async () => {
            getPaymentIntent = await stripe.retrievePaymentIntent(authCtx?.clientSecret);
            console.log("paymentIntent", getPaymentIntent);
        }
        getOtpFunc();
        getPaymentIntentFunc();
    }, []);

    const submitHandler = async () => {
        if (!token) return;
        try {
            dispatch(cartCheckout());
            const paymentSuccess = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: "http://localhost:3000/stripe/success",
                },
            });
            console.log("paymentSuccess", paymentSuccess);

        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <>
            <Box width='500px' padding={2} display='flex' >
                <Card>
                    <CardContent>
                        <PaymentElement />

                    </CardContent>
                    <CardActions>
                        <Stack spacing={2} direction='row' >
                            <Button onClick={submitHandler}
                                size="small" variant='contained' type="submit" disabled={!token} > Checkout </Button>
                            <GPayCheckoutButton token={token} />
                        </Stack>
                    </CardActions>
                </Card>
            </Box>
        </>

    )
}

export default CartCheckoutForm