import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { currentUserOrders } from "../../actions/orderActions";

import { Card, Typography, CardHeader, CardContent, Box } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
import AlanContext from "../../contexts/alanContext";

const CurrentUserOrders = () => {
    const alanCtx = useContext(AlanContext);
    const dispatch = useDispatch();
    const userOrders = useSelector(state => state?.userOrders);

    alanCtx.alanBtn.setVisualState({screen: "orders"});

    useEffect(() => {
        dispatch(currentUserOrders());
    }, [dispatch, currentUserOrders]);

    const fDateTime = (dateData) => {
        const date = new Date(dateData);
        const year = date.getFullYear();
        const month = date.getMonth();
        const dateDay = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${dateDay}/${month}/${year} ${hours}:${minutes}`
    }

    console.log("orders", userOrders);
    return (
        <>
            {
                userOrders && (
                    <Box width='900px' padding={2} >
                        <Card >
                            <CardHeader title={`Total Orders: ${userOrders?.orders?.count}`} />
                            <CardContent>
                                <Timeline position="alternate" >
                                    {userOrders?.orders?.orders.map((orders, i) => (
                                        <TimelineItem key={orders._id} >
                                            <TimelineSeparator>
                                                <TimelineDot color="primary" />
                                                <TimelineConnector />
                                            </TimelineSeparator>

                                            <TimelineContent>
                                                <Link to={`/orders/${orders._id}`} >
                                                    <Typography variant="subtitle1">Order Id: {orders._id}</Typography>
                                                </Link>
                                                <Typography variant="body1">Shipping Charges: {orders.shippingFee}</Typography>
                                                <Typography variant="body1">Tax: {orders.tax}</Typography>
                                                <Typography variant="body1">Subotal: {orders.subtotal}</Typography>
                                                <Typography variant="body1">Total: {orders.total}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    {fDateTime(orders.createdAt)}
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </CardContent>
                        </Card>
                    </Box>
                )
            }
            {/* <h4>Total Orders: {userOrders?.orders?.count}</h4><br />
            <>
                {
                    userOrders && userOrders?.orders?.orders.map((orders, i) => {
                        return (
                            <div key={orders._id}>
                                <Link to={`/orders/${orders._id}`} ><h5>Order Id: {orders._id}</h5></Link><br />
                                <span>Shipping Charges: {orders.shippingFee}</span><br />
                                <span>Tax: {orders.tax}</span><br />
                                <span>Subotal: {orders.subtotal}</span><br />
                                <span>Total: {orders.total}</span><br />
                            </div>
                        )
                    })
                }
            </> */}
        </>
    )
}

export default CurrentUserOrders