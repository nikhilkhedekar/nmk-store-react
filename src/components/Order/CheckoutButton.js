import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { cartCheckout } from "../../actions/cartActions";
import AuthContext from "../../contexts/authContext";
import AxiosInstance from "../../axiosinstance";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

const CheckoutButton = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        setTimeout(() => {
            navigate("/cart/checkout");
        }, 300);
    }

    useImperativeHandle(ref, () => {
        return {
            clickHandler: clickHandler,
        }
    })
    return (
        <>
            <Button
                size="small"
                variant='contained'
                onClick={clickHandler}>
                Checkout
            </Button>
        </>
    )
})

export default CheckoutButton;