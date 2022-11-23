import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useLazyQuery } from "@apollo/client";
import AxiosInstance from "../../axiosinstance";
import CreateReviewsButton from "../../components/Review/CreateReviewsButton";
import { getSingleProduct } from "../../actions/productActions";
import OrderButton from "../../components/Order/orderButton";
import SingleProductReviews from "../../components/Review/SingleProductReview";
import { GET_SINGLE_PRODUCT } from "../../queries/productQueries";
import AddToCartButton from "../../components/Cart/AddToCartButton";
import { currentUserCart } from "../../actions/cartActions";
import UpdateCartButton from "../../components/Cart/UpdateCartButton";
import StripeProvider from "../../providers/stripeCheckoutProvider";

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
    ImageListItem,
    Grid,
    Paper
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ProductDetails = () => {
    const params = useParams();
    // const dispatch = useDispatch();    
    const addReviewRef = useRef(null);
    const reviewRef = useRef(null);
    const orderButtonRef = useRef(null);
    const addToCartRef = useRef(null);
    const updateCartRef = useRef(null);
    const dispatch = useDispatch();
    // const productData = useSelector(state => state?.product);
    // const { product, loading } = productData;
    const [
        getProduct,
        { data },
    ] = useLazyQuery(GET_SINGLE_PRODUCT);    

    const currentUserCartState = useSelector(state => state?.currentUserCart);

    // useEffect(() => {
    //     dispatch(getSingleProduct(params.id));
    // }, [dispatch, getSingleProduct]);
    // console.log("productData", product)

    useEffect(() => {
        getProduct({
            variables: {
                productId: params.id
            }
        });
        dispatch(currentUserCart());
    }, [getProduct, params, dispatch, currentUserCart]);

    console.log("data", data?.getSingleProduct);
    console.log("length", currentUserCartState?.cart?.[0]?.cartItems.length);    
    return (
        <Paper sx={{ padding: '32px' }} elevation={2}>
            <Stack border='1px solid' spacing={2} >
                <ImageListItem>
                    <img
                        width="900px"
                        height="500px"
                        src={``}
                        alt={""}
                        loading='lazy'
                    />
                </ImageListItem>
                <Stack margin={3} alignSelf="center" >
                    <Typography variant="h4" >{data?.getSingleProduct?.name}</Typography>
                    <Typography variant="h6" > ₹{data?.getSingleProduct?.price} </Typography>
                    <Typography variant="h6" >Company: {data?.getSingleProduct?.company} </Typography>
                    <Typography variant="h6" >Category: {data?.getSingleProduct?.category} </Typography>
                    <Typography variant="subtitle1" >Description: {data?.getSingleProduct?.description}</Typography>
                    <Typography variant="h6"  >No of Reviews: {data?.getSingleProduct?.numOfReviews}</Typography>
                    <Stack spacing={2}>
                        <Rating
                            value={data?.getSingleProduct?.averageRating}
                            // precision={0.5}
                            size='medium'
                            icon={<StarIcon fontSize='inherit' color='yellow' />}
                            emptyIcon={<StarOutlineIcon fontSize='inherit' />}
                            readOnly
                        />
                    </Stack>
                </Stack>
                <Stack spacing={2} direction="row" >
                    <CreateReviewsButton ref={addReviewRef} productId={params.id} />
                    <SingleProductReviews ref={reviewRef} productReviews={data?.getSingleProduct?.reviews} />
                    {
                        currentUserCartState?.cart?.[0]?.cartItems.length >= 1 ?
                            <UpdateCartButton ref={updateCartRef} productId={params.id} /> :
                            <AddToCartButton ref={addToCartRef} productId={params.id} />
                    }
                    <StripeProvider>
                        <OrderButton ref={orderButtonRef} product={{
                            amount: 0,
                            name: data?.getSingleProduct?.name,
                            price: data?.getSingleProduct?.price,
                            image: data?.getSingleProduct?.image,
                            _id: data?.getSingleProduct?._id
                        }} />
                    </StripeProvider>
                </Stack>


                {/* fetching from apollo server */}
                {/* <div>
                    <h3>{data?.getSingleProduct?.name}</h3><br />
                    <i>Price: {data?.getSingleProduct?.price}</i><br />
                    <span>Company: {data?.getSingleProduct?.company}</span><br />
                    <p>Description: {data?.getSingleProduct?.description}</p><br />
                    <span>Category: {data?.getSingleProduct?.category}</span><br />
                    <span>Average Rating: {data?.getSingleProduct?.averageRating}</span><br />
                    <span>No of Reviews: {data?.getSingleProduct?.numOfReviews}</span><br />
                    <>
                        <CreateReviewsButton ref={addReviewRef} productId={params.id} />
                        <SingleProductReviews ref={reviewRef} productReviews={data?.getSingleProduct?.reviews} />
                        {
                            currentUserCartState?.cart?.[0]?.cartItems.length >= 1 ?
                                <UpdateCartButton ref={updateCartRef} productId={params.id} /> :
                                <AddToCartButton ref={addToCartRef} productId={params.id} />
                        }
                        <StripeProvider>
                            <OrderButton ref={orderButtonRef} productId={params.id} />
                        </StripeProvider>
                    </>
                </div> */}

                {/* fetching from redux */}
                {/* <h3>{product?.name}</h3><br />
                <i>Price: {product?.price}</i><br />
                <span>Company: {product?.company}</span><br />
                <p>Description: {product?.description}</p><br />
                <span>Category: {product?.category}</span><br />
                <>Colors: {product && product?.colors.map((color, i) => {
                    <div key={i}>
                        <span>{color}</span>
                    </div>
                })}</><br />
                <span>Average Rating: {product?.averageRating}</span><br />
                <span>No of Reviews: {product?.numOfReviews}</span><br />
                <>
                    <CreateReviewsButton addReviewBtn={addReviewBtn} setAddReviewBtn={setAddReviewBtn} productId={params.id} />
                    <SingleProductReviews reviewBtn={reviewBtn} setReviewBtn={setReviewBtn} productReviews={product?.reviews} />
                    <OrderButton buyBtn={buyBtn} setBuyBtn={setBuyBtn} productId={params.id} />
                </> */}

            </Stack>
        </Paper>
    )
}

export default ProductDetails