import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllReviews } from "../../actions/reviewActions";
import { GET_ALL_REVIEWS } from "../../queries/reviewQueries";

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

const AllReviews = () => {
    // const dispatch = useDispatch();
    // const reviewsData = useSelector(state => state.reviews);
    // const { reviews, loading } = reviewsData;
    const { data } = useQuery(GET_ALL_REVIEWS);

    // useEffect(() => {
    //     dispatch(getAllReviews());
    // }, [dispatch, getAllReviews]);

    console.log("data", data?.getAllReviews);
    return (
        <Grid container spacing={3} margin={3} >
            {/* fetching from apollo */}
            {
                data && data?.getAllReviews.map((review) => {
                    return (
                        <Grid key={review._id} item xs={12} sm={6} md={3} >
                            <Box width='300px' >
                                <Card>
                                    <CardContent>
                                        <Link to={`/reviews/${review._id}`} >
                                            <Typography gutterBottom variant='h5' component='div'>
                                                {review.title}
                                            </Typography>
                                        </Link>
                                        <Typography gutterBottom variant='subtitle1' component='div'>
                                            User: {review.user}
                                        </Typography>
                                        <Typography gutterBottom variant='body1' component='div'>
                                            Product: {review.product[0].name}
                                        </Typography>
                                        <Typography gutterBottom variant='body1' component='div'>
                                            Comment: {review.comment}
                                        </Typography>
                                        <Rating
                                            value={review.rating}
                                            // precision={0.5}
                                            size='medium'
                                            icon={<StarIcon fontSize='inherit' color='yellow' />}
                                            emptyIcon={<StarOutlineIcon fontSize='inherit' />}
                                            readOnly
                                        />
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    )
                })
            }
            {/* fetching data from graphql */}
            {/* {data && data?.getAllReviews.map((review) => {
                return (
                    <div key={review._id} >
                        <Link to={`/reviews/${review._id}`} >{review.title}</Link><br />
                        <span>User: {review.user}</span><br />
                        <span>Product: {review.product[0]._id}</span>
                        <span>Rating: {review.rating}</span><br />
                        <span>Product Name: {review.product[0].name}</span><br />
                        <span>Product Price: {review.product[0].price}</span><br />
                        <span>Product Company: {review.product[0].company}</span><br />
                        <span>Comment: {review.comment}</span><br /><br /><br />
                    </div>
                )
            })} */}

            {/* fetching data from redux */}
            {/* {reviews && reviews.map((review) => {
                return (
                    <div key={review._id} >
                        <Link to={`/reviews/${review._id}`} >{review.title}</Link><br />
                        <span>User: {review.user}</span><br />
                        <span>Product: {review.product._id}</span>
                        <span>Rating: {review.rating}</span><br />
                        <span>Product Name: {review.product.name}</span><br />
                        <span>Product Price: {review.product.price}</span><br />
                        <span>Product Company: {review.product.company}</span><br />
                        <span>Comment: {review.comment}</span><br /><br /><br />
                    </div>
                )
            })} */}
        </Grid>
    )
}

export default AllReviews