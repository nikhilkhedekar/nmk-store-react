import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../actions/reviewActions"

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

const CreateReviewsButton = forwardRef((props, ref) => {
    const [buttonState, setButtonState] = useState(false);
    const dispatch = useDispatch();
    const [addReview, setAddReview] = useState({
        rating: 0,
        title: "",
        comment: "",
    });

    const clickHanlder = () => {
        setButtonState(!buttonState);
    }

    useImperativeHandle(ref, () => {
        return {
            clickHanlder: clickHanlder
        }
    })

    const changeHandler = (e) => {
        setAddReview(() => {
            if (e.target.name == "rating") {
                return {
                    ...addReview,
                    [e.target.name]: Number(e.target.value)
                }
            }
            return {
                ...addReview,
                [e.target.name]: e.target.value
            }
        });
    };

    const submitHandler = () => {
        const review = {
            rating: addReview.rating, title: addReview.title, comment: addReview.comment, product: props.productId
        }
        dispatch(postReview(review));
        setAddReview({
            rating: 0,
            title: "",
            comment: "",
        });
        setButtonState(!buttonState);
    }

    return (
        <>
            <Button
                size="small"
                variant='contained'
                onClick={clickHanlder}>
                Add Review
            </Button>
            <Dialog
                open={buttonState}
                onClose={clickHanlder}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>
                <DialogTitle id='dialog-title'>Add Review</DialogTitle>
                <DialogContent >
                    {/* <DialogContentText id='dialog-description'>
                        Nice Choice
                    </DialogContentText> */}
                    <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                        <Grid item xs={6}>
                            <TextField
                                label='Title'
                                required
                                helperText={
                                    !addReview.title && 'Required'
                                }
                                name="title"
                                type='text'
                                error={!addReview.title}
                                value={addReview.title}
                                onChange={changeHandler}
                                size='small'
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Comment'
                                required
                                helperText={
                                    !addReview.comment && 'Required'
                                }
                                name="comment"
                                type='text'
                                error={!addReview.comment}
                                value={addReview.comment}
                                onChange={changeHandler}
                                size='small'
                            /></Grid>
                        <Grid item xs={6}>
                            <Rating
                                name="rating"
                                value={addReview.rating}
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
                        Add Review
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

export default CreateReviewsButton