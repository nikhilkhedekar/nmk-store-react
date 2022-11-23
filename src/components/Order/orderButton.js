import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { createOrder, createUpiOrder } from "../../actions/orderActions";
import GooglePayButton from '@google-pay/button-react';
import { v4 as uuidv4 } from 'uuid';

import {
    Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    InputAdornment,
    Grid
} from "@mui/material";
import GPayButton from "./gPayButton";
import AxiosInstance from "../../axiosinstance";

const OrderButton = forwardRef(({ product }, ref) => {

    const [buttonState, setButtonState] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        tax: 0,
        shippingFee: 0,
        amount: 0
    });
    const dispatch = useDispatch();
    const stripe = useStripe();
    const payment = useSelector(state => state?.createOrder);
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");

    const clickHandler = async () => {
        setButtonState(!buttonState);
        const getOtp = await AxiosInstance.patch("/api/v1/users/otp/create");
        setToken(getOtp.data.token);
        console.log("otpRes", getOtp);
    }

    useImperativeHandle(ref, () => {
        return {
            clickHandler: clickHandler,
        }
    });

    const changeHandler = (e) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value,
        });
    }

    const submitHandler = () => {        
        console.log("otp", { token, otp })
        if (otp != token) return;
        try {
            let sessionId;
            const order = {
                tax: orderDetails.tax,
                shippingFee: orderDetails.shippingFee,
                orderItems: {
                    amount: orderDetails.amount,
                    product: product._id
                }
            }
            dispatch(createOrder(order));
            setOrderDetails({
                tax: 0,
                shippingFee: 0,
                amount: 0
            });
            sessionId = payment?.order?.session?.id;
            console.log("sessionId", payment?.order?.session?.id);
            setButtonState(!buttonState);
            if (sessionId) {
                stripe.redirectToCheckout({ sessionId });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button
                size="small"
                variant='contained'
                onClick={clickHandler}>
                Buy Now
            </Button>
            <Dialog
                open={buttonState}
                onClose={clickHandler}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>
                <DialogTitle id='dialog-title'>Buy Now</DialogTitle>
                <DialogContent >
                    {/* <DialogContentText id='dialog-description'>
                        Nice Choice
                    </DialogContentText> */}
                    <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                        <Grid item xs={6}>
                            <TextField
                                label='OTP'
                                required
                                helperText={
                                    !otp && 'Required'
                                }
                                maxLength="6"
                                type='text'
                                error={!otp}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                size='small'
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Tax'
                                required
                                helperText={
                                    !orderDetails.tax && 'Required'
                                }
                                name="tax"
                                type='number'
                                error={!orderDetails.tax}
                                value={orderDetails.tax}
                                onChange={changeHandler}
                                InputProps={{
                                    startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                                }}
                                size='small'
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Shipping Charges'
                                required
                                helperText={
                                    !orderDetails.shippingFee && 'Required'
                                }
                                name="shippingFee"
                                type='number'
                                error={!orderDetails.shippingFee}
                                value={orderDetails.shippingFee}
                                onChange={changeHandler}
                                InputProps={{
                                    startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                                }}
                                size='small'
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Quantity'
                                required
                                helperText={
                                    !orderDetails.amount && 'Required'
                                }
                                name="amount"
                                type='number'
                                error={!orderDetails.amount}
                                value={orderDetails.amount}
                                onChange={changeHandler}
                                size='small'
                            /></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitHandler} size="small" type="submit" variant="contained" disabled={otp.length != 6}  >
                        Buy
                    </Button>
                    <GPayButton otp={otp} token={token} product={product} amount={Number(orderDetails.amount)} shippingFee={Number(orderDetails.shippingFee)} tax={Number(orderDetails.tax)} />
                </DialogActions>

            </Dialog>
        </>
    )
});

export default OrderButton      