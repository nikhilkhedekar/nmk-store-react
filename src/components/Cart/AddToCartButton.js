import { forwardRef, useImperativeHandle, useState } from "react"
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";

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

const AddToCartButton = forwardRef(({ productId }, ref) => {
    const [buttonState, setButtonState] = useState(false);
    const [cartDetails, setCartDetails] = useState({
        tax: 0,
        shippingFee: 0,
        amount: 0
    });
    const dispatch = useDispatch();

    const clickHandler = () => {
        setButtonState(!buttonState);
    };

    useImperativeHandle(ref, () => {
        console.log("Add to cart clicked");
        return {
            clickHandler: clickHandler,
        }
    });

    const changeHandler = (e) => {
        setCartDetails({
            ...cartDetails,
            [e.target.name]: e.target.value,
        });
    }

    const submitHandler = () => {
        try {
            const cart = {
                tax: cartDetails.tax,
                shippingFee: cartDetails.shippingFee,
                cartItems: {
                    amount: cartDetails.amount,
                    product: productId
                }
            }
            dispatch(addToCart(cart));
            setCartDetails({
                tax: 0,
                shippingFee: 0,
                amount: 0
            });
            setButtonState(false);            
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
                Add To Cart
            </Button>
            <Dialog
                open={buttonState}
                onClose={clickHandler}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>
                <DialogTitle id='dialog-title'>Add To Cart</DialogTitle>
                <DialogContent >
                    {/* <DialogContentText id='dialog-description'>
                        Nice Choice
                    </DialogContentText> */}
                    <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                        <Grid item xs={6}>
                            <TextField
                                label='Tax'
                                required
                                helperText={
                                    !cartDetails.tax && 'Required'
                                }
                                name="tax"
                                type='number'
                                error={!cartDetails.tax}
                                value={cartDetails.tax}
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
                                    !cartDetails.shippingFee && 'Required'
                                }
                                name="shippingFee"
                                type='number'
                                error={!cartDetails.shippingFee}
                                value={cartDetails.shippingFee}
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
                                    !cartDetails.amount && 'Required'
                                }
                                name="amount"
                                type='number'
                                error={!cartDetails.amount}
                                value={cartDetails.amount}
                                onChange={changeHandler}
                                size='small'
                            /></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitHandler} size="small" type="submit" variant="contained"  >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

export default AddToCartButton