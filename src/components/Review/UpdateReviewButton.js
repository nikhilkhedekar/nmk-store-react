import { useDispatch } from "react-redux";
import { forwardRef, useImperativeHandle, useState } from "react";
import { updateReview } from "../../actions/reviewActions";
import { useNavigate } from "react-router-dom";

import {
    Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    InputAdornment,
    Grid, Stack, Rating
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const UpdateReviewButton = forwardRef(({ review }, ref) => {
    const [buttonState, setButtonState] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateDetails, setUpdateDetails] = useState({
        rating: review?.getSingleReview?.rating,
        title: review?.getSingleReview?.title,
        comment: review?.getSingleReview?.comment,
    });

    const clickHandler = () => {
        setButtonState(!buttonState);
    }

    useImperativeHandle(ref, () => {
        return {
            clickHandler: clickHandler,
        }
    })

    const changeHandler = (e) => {
        setUpdateDetails(() => {
            if (e.target.name == "rating") {
                return {
                    ...updateDetails,
                    [e.target.name]: Number(e.target.value)
                }
            }
            return {
                ...updateDetails,
                [e.target.name]: e.target.value
            }
        });
    };

    const submitHandler = () => {
        dispatch(updateReview(review?.getSingleReview?._id, updateDetails));
        setUpdateDetails({
            rating: 0,
            title: "",
            comment: "",
        });
        setButtonState(!buttonState);
        navigate("/");
    }

    return (
        <>
            {
                review && (
                    <>
                        <Button
                            size="small"
                            variant='contained'
                            onClick={clickHandler}>
                            Update Review
                        </Button>
                        <Dialog
                            open={buttonState}
                            onClose={clickHandler}
                            aria-labelledby='dialog-title'
                            aria-describedby='dialog-description'>
                            <DialogTitle id='dialog-title'>Update Review</DialogTitle>
                            <DialogContent >
                                <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label='Title'
                                            required
                                            helperText={
                                                !updateDetails.title && 'Required'
                                            }
                                            name="title"
                                            type='text'
                                            error={!updateDetails.title}
                                            value={updateDetails.title}
                                            onChange={changeHandler}
                                            size='small'
                                        /></Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label='Comment'
                                            required
                                            helperText={
                                                !updateDetails.comment && 'Required'
                                            }
                                            name="comment"
                                            type='text'
                                            error={!updateDetails.comment}
                                            value={updateDetails.comment}
                                            onChange={changeHandler}
                                            size='small'
                                        /></Grid>
                                    <Grid item xs={6}>
                                        <Rating
                                            name="rating"
                                            value={updateDetails.rating}
                                            onChange={changeHandler}
                                            // precision={0.5}
                                            size='large'
                                            icon={<StarIcon fontSize='inherit' color='error' />}
                                            emptyIcon={<StarOutlineIcon fontSize='inherit' />}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitHandler} size="small" type="submit" variant="contained"  >
                                    Update Review
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )
            }
            {/* <button onClick={clickHandler} >Update Review</button>
            <>
                {
                    buttonState && (
                        <form onSubmit={submitHandler} >
                            <label htmlFor="rating" >Rating:
                                <input id="rating" name="rating" value={updateDetails.rating} onChange={changeHandler} type="number" step="1" min="0" max="5" />
                            </label><br />
                            <label htmlFor="title" >Title:
                                <input id="title" name="title" value={updateDetails.title} onChange={changeHandler} type="text" />
                            </label><br />
                            <label htmlFor="comment" >Comment:
                                <input id="comment" name="comment" value={updateDetails.comment} onChange={changeHandler} type="text" />
                            </label><br />
                            <button type='submit'> Update </button>
                        </form>
                    )
                }
            </> */}
        </>
    )
})

export default UpdateReviewButton