import { useContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { getSingleReview } from "../../actions/reviewActions";
import DeleteReviewButton from "../../components/Review/DeleteReviewButton";
import UpdateReviewButton from "../../components/Review/UpdateReviewButton";
import AuthContext from "../../contexts/authContext";
import { GET_SINGLE_REVIEW } from "../../queries/reviewQueries";

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

const GetSingleReview = () => {
    const authCtx = useContext(AuthContext);
    const params = useParams();
    // const dipatch = useDispatch();
    const updateReviewRef = useRef(null);
    const [deleteReviewBtn, setDeleteReviewBtn] = useState(false);
    // const review = useSelector(state => state.review);
    const [getReview, { data }] = useLazyQuery(GET_SINGLE_REVIEW);

    // useEffect(() => {
    //     dipatch(getSingleReview(params.id));
    // }, [dipatch, getSingleReview, params]);

    useEffect(() => {
        getReview({
            variables: {
                reviewId: params.id
            }
        })
    }, [getReview, params]);

    console.log("review", data?.getSingleReview);
    return (
        <>
            {/* fetching data from graphql */}
            {
                data && (
                    <Box width='500px' padding={2} display='flex' >
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant='h3' component='div'>
                                    {data?.getSingleReview?.title}
                                </Typography>
                                <Typography gutterBottom variant='h6' component='div'>
                                    User: {data?.getSingleReview?.user}
                                </Typography>
                                <Typography gutterBottom variant='body1' component='div'>
                                    Comment: {data?.getSingleReview?.comment}
                                </Typography>
                                <Typography gutterBottom variant='subtitle1' component='div'>
                                    Product: {data?.getSingleReview?.product[0].name}
                                </Typography>
                                <Typography gutterBottom variant='body1' component='div'>
                                    Product Id: {data?.getSingleReview?.product[0]._id}
                                </Typography>
                                <Typography gutterBottom variant='body1' component='div'>
                                    Product Price: ₹{data?.getSingleReview?.product[0].price}
                                </Typography>
                                <Typography gutterBottom variant='body1' component='div'>
                                    Company: {data?.getSingleReview?.product[0].company}
                                </Typography>
                                <Rating
                                    value={data?.getSingleReview?.rating}
                                    // precision={0.5}
                                    size='medium'
                                    icon={<StarIcon fontSize='inherit' color='yellow' />}
                                    emptyIcon={<StarOutlineIcon fontSize='inherit' />}
                                    readOnly
                                />
                            </CardContent>
                            <CardActions>
                                <Stack spacing={2} direction='row' >
                                    {
                                        authCtx.isLoggedIn && (
                                            <>
                                                <UpdateReviewButton ref={updateReviewRef} review={data} />
                                                <DeleteReviewButton deleteReviewBtn={deleteReviewBtn} setDeleteReviewBtn={setDeleteReviewBtn} reviewId={params.id} />
                                            </>
                                        )
                                    }
                                </Stack>
                            </CardActions>
                        </Card>
                    </Box>
                )
            }

            {/* <h3>{data?.getSingleReview?.title}</h3><br />
            <span>User: {data?.getSingleReview?.user}</span><br />
            <span>Product: {data?.getSingleReview?.product[0]._id}</span><br />
            <span>Rating: {data?.getSingleReview?.rating}</span><br />
            <span>Comment: {data?.getSingleReview?.comment}</span><br />

            <>{
                authCtx.isLoggedIn && (
                    <>
                        <UpdateReviewButton ref={updateReviewRef} review={data} />
                        <DeleteReviewButton deleteReviewBtn={deleteReviewBtn} setDeleteReviewBtn={setDeleteReviewBtn} reviewId={params.id} />
                    </>
                )
            }</> */}

            {/* fetching data from redux */}
            {/* <h3>{review?.review?.title}</h3><br />
            <span>User: {review?.review?.user}</span><br />
            <span>Product: {review?.review?.product}</span><br />
            <span>Reting: {review?.review?.rating}</span><br />
            <span>Comment: {review?.review?.comment}</span><br />

            <>{
                authCtx.isLoggedIn && (
                    <>
                        <UpdateReviewButton updateReviewBtn={updateReviewBtn} setUpdateReviewBtn={setUpdateReviewBtn} review={review} />
                        <DeleteReviewButton deleteReviewBtn={deleteReviewBtn} setDeleteReviewBtn={setDeleteReviewBtn} reviewId={params.id} />
                    </>
                )
            }</> */}
        </>
    )
}

export default GetSingleReview