import { forwardRef, useImperativeHandle, useState } from "react"
import { Link } from "react-router-dom"

import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Divider,
    ListItemAvatar,
    Avatar, Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography, Rating
} from '@mui/material'
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const SingleProductReviews = forwardRef(({ reviewBtn, setReviewBtn, productReviews }, ref) => {
    const [buttonState, setButtonState] = useState(false);

    const clickHandler = () => {
        setButtonState(!buttonState);
    }

    useImperativeHandle(ref, () => {
        return {
            clickHandler: clickHandler
        }
    })

    console.log(productReviews)
    return (
        <>
            <Button
                size="small"
                variant='contained'
                onClick={clickHandler}>
                Reviews
            </Button>
            <Dialog
                open={buttonState}
                onClose={clickHandler}
                scroll="paper"
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'>
                <DialogTitle id='dialog-title'>Reviews</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: '400px', bgcolor: '#efefef' }}>
                        <List>
                            {productReviews && productReviews.map((reviews, i) => {
                                return (
                                    <>
                                        <ListItem key={i} >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ReviewsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={<Link to={`/reviews/${reviews._id}`} >{reviews.title}</Link>}
                                                secondary={(
                                                    <>
                                                        <> User: {reviews.user} </>
                                                        <> Comment: {reviews.comment} </>
                                                        <Rating
                                                            value={reviews.rating}
                                                            precision={0.5}
                                                            size='medium'
                                                            icon={<StarIcon fontSize='inherit' color='yellow' />}
                                                            emptyIcon={<StarOutlineIcon fontSize='inherit' />}
                                                            readOnly
                                                        /></>
                                                )} />
                                        </ListItem>
                                        <Divider />
                                    </>
                                )
                            })}

                        </List>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button size="small" variant='contained' onClick={clickHandler} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* {buttonState && productReviews && productReviews.map((reviews, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/reviews/${reviews._id}`} >{reviews.title}</Link><br />
                            <span>User: {reviews.user}</span><br />
                            <span>Rating: {reviews.rating}</span><br />
                            <p>Comment: {reviews.comment}</p>
                        </div>
                    )
                })} */}
        </>
    )
})

export default SingleProductReviews 