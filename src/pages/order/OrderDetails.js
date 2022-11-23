import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleOrder } from "../../actions/orderActions";

import {
    Box, Card, CardContent, Typography, Stack, Divider,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";

const OrderDetails = () => {
    const [updateOrderButton, setUpdateOrderbutton] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const orderData = useSelector(state => state?.singleOrder);

    useEffect(() => {
        dispatch(getSingleOrder(params.id));
    }, []);

    console.log("orderData", orderData);
    return (
        <>
            <Box width='500px' padding={2} display='flex' >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant='h6' component='div'>
                            Order Id: {orderData?.order?.order?._id}
                        </Typography>
                        <Typography variant='subtitle1' component='div' >Order Details: </Typography>
                        <Divider />
                        {
                            orderData?.order?.order?.cartItems.length != 0 ? (
                                <>
                                    <>
                                        <TableContainer sx={{ maxHeight: '300px' }} component='div'>
                                            <Table stickyHeader aria-label='simple table'>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Sr No</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell align='center'>Quantity</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        orderData && orderData?.order?.order?.cartItems.map((cartItem, i) => {
                                                            return (
                                                                <>
                                                                    <TableRow
                                                                        key={cartItem._id}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                        <TableCell>{i + 1}</TableCell>
                                                                        <TableCell>{cartItem.name}</TableCell>
                                                                        <TableCell>{cartItem.price}</TableCell>
                                                                        <TableCell align='center'>{cartItem.amount}</TableCell>
                                                                    </TableRow>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                    <Divider />
                                    <>
                                        <Typography gutterBottom variant='subtitle1' component='div'>
                                            Total Quantity: {orderData?.order?.order?.cartQty}
                                        </Typography>
                                    </>
                                    <Divider />
                                </>
                            ) :
                                orderData?.order?.order?.orderItems && (
                                    <>
                                        <Typography gutterBottom variant='subtitle1' component='div'>
                                            Name: {orderData?.order?.order?.orderItems.name}
                                        </Typography>
                                        <Typography gutterBottom variant='subtitle1' component='div'>
                                            product Price: ₹{orderData?.order?.order?.orderItems.price}
                                        </Typography>
                                        <Typography gutterBottom variant='subtitle1' component='div'>
                                            Quantity: {orderData?.order?.order?.orderItems.amount}
                                        </Typography>
                                        <Divider />
                                    </>
                                )
                        }
                        <Typography gutterBottom variant='subtitle1' component='div'>
                            Shipping Charges: ₹{orderData?.order?.order?.shippingFee}
                        </Typography>
                        <Divider />
                        <Typography gutterBottom variant='subtitle1' component='div'>
                            Tax: ₹{orderData?.order?.order?.tax}
                        </Typography>
                        <Divider />
                        <Typography gutterBottom variant='subtitle1' component='div'>
                            Subtotal: ₹{orderData?.order?.order?.subtotal}
                        </Typography>
                        <Divider />
                        <Typography gutterBottom variant='subtitle1' component='div'>
                            Total: ₹{orderData?.order?.order?.total}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>


            {/* <h5>Order Id: {orderData?.order?.order?._id}</h5><br />
            <>
                {
                    orderData?.order?.order?.orderItems && (
                        <>
                            <span>Oder Details:
                                <span>Name: {orderData?.order?.order?.orderItems.name}</span><br />
                                <span>Price: {orderData?.order?.order?.orderItems.price}</span><br />
                                <span>Quantity: {orderData?.order?.order?.orderItems.amount}</span>
                            </span>
                        </>
                    )
                }
            </><br />
            <>
                {
                    orderData && orderData?.order?.order?.cartItems && (
                        <>
                            <>
                                {
                                    orderData?.order?.order?.cartItems.map((cartItem, i) => {
                                        return (
                                            <div key={cartItem._id} >
                                                <span>Name: {cartItem.name}</span><br />
                                                <span>Price: {cartItem.price}</span><br />
                                                <span>Quantity: {cartItem.amount}</span>
                                            </div>
                                        )
                                    })
                                }
                            </>
                            <>
                                <span>Cart Quantity: {orderData?.order?.order?.cartQty}</span>
                            </>
                        </>
                    )
                }
            </><br />
            <span>Shipping Charges: {orderData?.order?.order?.shippingFee}</span><br />
            <span>Tax: {orderData?.order?.order?.tax}</span><br />
            <span>Subtotal: {orderData?.order?.order?.subtotal}</span><br />
            <span>Total: {orderData?.order?.order?.total}</span><br /> */}
        </>
    )
}

export default OrderDetails