import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllProducts } from "../../actions/productActions"
import OrderButton from "../../components/Order/orderButton"
import { useQuery, useLazyQuery } from "@apollo/client";
import {
    GET_ALL_PRODUCTS,
} from "../../queries/productQueries";
import AddToCartButton from "../../components/Cart/AddToCartButton"
import { currentUserCart } from "../../actions/cartActions";
import UpdateCartButton from "../../components/Cart/UpdateCartButton"
import { StripeProvider } from "../../providers/stripeCheckoutProvider";

import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    CardMedia,
    Rating,
    Stack,
    Grid
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const AllProducts = () => {
    // const dispatch = useDispatch();       
    const orderButtonRef = useRef(null);
    const addToCartRef = useRef(null);
    const updateCartRef = useRef(null);
    const { data, loading } = useQuery(GET_ALL_PRODUCTS);
    const dispatch = useDispatch();
    const currentUserCartState = useSelector(state => state?.currentUserCart);
    // const productData = useSelector((state) => state.products);
    // const { products, loading } = productData;   

    // useEffect(() => {
    //     dispatch(getAllProducts());
    // }, [dispatch, getAllProducts]);

    useEffect(() => {
        dispatch(currentUserCart());
    }, [dispatch, currentUserCart])

    // console.log("products", productData);
    console.log("allProducts", data?.getAllProducts);
    console.log("length", currentUserCartState?.cart?.[0]?.cartItems.length);
    return (
        <Grid container spacing={3} margin={3} >
            {/* fetching from apollo */}
            {
                data && !loading && data?.getAllProducts.map((products) => {
                    return (
                        <Grid key={products._id} item xs={12} sm={6} md={3} >
                            <Box width='300px' >
                                <Card>
                                    <CardMedia
                                        component='img'
                                        height='140'
                                        image=''
                                        alt=''
                                    />
                                    <CardContent>
                                        <Link to={`/products/${products._id}`} >
                                            <Typography gutterBottom variant='h5' component='div'>
                                                {products.name}
                                            </Typography>
                                        </Link>
                                        <Typography gutterBottom variant='subtitle1' component='div'>
                                            Reviews: {products.numOfReviews}
                                        </Typography>
                                        <Stack spacing={2}>
                                            <Rating
                                                value={products.averageRating}
                                                // precision={0.5}
                                                size='medium'
                                                icon={<StarIcon fontSize='inherit' color='yellow' />}
                                                emptyIcon={<StarOutlineIcon fontSize='inherit' />}
                                                readOnly
                                            />
                                        </Stack>
                                        <Typography variant="subtitle1">
                                            {/* <Typography
                                                component="span"
                                                variant="body1"
                                                sx={{
                                                    color: 'text.disabled',
                                                    textDecoration: 'line-through',
                                                }}
                                            >
                                                {products.price ? numeral(products.price).format('₹0,0.00') : ''}
                                            </Typography>
                                            &nbsp; */}
                                            ₹{products.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Stack spacing={2} direction='row' >
                                        <StripeProvider>
                                            <OrderButton ref={orderButtonRef} product={products} />
                                        </StripeProvider>
                                        {
                                            currentUserCartState?.cart?.[0]?.cartItems.length >= 1 ?
                                                <UpdateCartButton ref={updateCartRef} productId={products._id} /> :
                                                <AddToCartButton ref={addToCartRef} productId={products._id} />
                                        }
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Grid>
                    )
                })
            }
            {/* fetching from redux */}
            {/* <div >
                <Link to={`/products/${products._id}`} ><h3> {products.name} </h3></Link>
                <label>Price: <i> {products.price} </i></label><br />
                <label>Description: <span> {products.description} </span></label><br />
                <label>Category: <span> {products.category} </span></label><br />
                <label>Company: <span> {products.company} </span></label><br />
                <label>Average Rating: <span> {products.averageRating} </span></label><br />
                <label>No of Reviews: <span> {products.numOfReviews} </span></label><br />
                <>
                    <>
                        <StripeProvider>
                            <OrderButton ref={orderButtonRef} productId={products._id} />
                        </StripeProvider>
                    </>
                    <>
                        {
                            currentUserCartState?.cart?.[0]?.cartItems.length >= 1 ?
                                <UpdateCartButton ref={updateCartRef} productId={products._id} /> :
                                <AddToCartButton ref={addToCartRef} productId={products._id} />
                        }
                    </>
                </>
            </div> */}
            {/* {products && products.map((products) => {
                return (
                    <div key={products._id} >
                        <Link to={`/products/${products._id}`} ><h3> {products.name} </h3></Link>
                        <label>Price: <i> {products.price} </i></label><br />
                        <label>Description: <span> {products.description} </span></label><br />
                        <label>Category: <span> {products.category} </span></label><br />
                        <label>Company: <span> {products.company} </span></label><br />
                        <label>Average Rating: <span> {products.averageRating} </span></label><br />
                        <label>No of Reviews: <span> {products.numOfReviews} </span></label><br />
                        <>
                            <OrderButton buyBtn={buyBtn} setBuyBtn={setBuyBtn} productId={products._id} />
                            <button>Add to Cart</button>
                        </>                        
                    </div>
                )
            })} */}
        </Grid>
    )
}

export default AllProducts