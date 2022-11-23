import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { cartItemDetails } from "../../actions/cartActions";

import { Box, Card, CardContent, Typography } from "@mui/material";

const CartItemDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const cartItemDetailsState = useSelector(state => state?.cartItemDetails?.cart);

    useEffect(() => {
        dispatch(cartItemDetails(params.id));
    }, [dispatch, cartItemDetails, params]);

    console.log("cartItemDetails", cartItemDetailsState);
    return (
        <>
            <Box width='500px' padding={2} display='flex' >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant='h6' component='div'>
                            {cartItemDetailsState?.product?.name}
                        </Typography>
                        <Typography gutterBottom variant='subtitle1' component='div'>
                            Product Id: {cartItemDetailsState?.product?.product}
                        </Typography>
                        <Typography gutterBottom variant='subtitle1' component='div'>
                            Amount: {cartItemDetailsState?.product?.amount}
                        </Typography>
                        <Typography gutterBottom variant='subtitle1' component='div'>
                            ₹{cartItemDetailsState?.product?.price}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default CartItemDetails