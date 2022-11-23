import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { deleteReview } from "../../actions/reviewActions";

import { Button } from "@mui/material";

const DeleteReviewButton = ({ deleteReviewBtn, setDeleteReviewBtn, reviewId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickHandler = useCallback(() => {
        setDeleteReviewBtn(true);
        if (deleteReviewBtn) {
            dispatch(deleteReview(reviewId));
            setDeleteReviewBtn(false);
            navigate("/")
        };
    },[]);
    return (
        <>            
            <Button
                size="small"
                variant='contained'
                onClick={onClickHandler}>
                Delete Review
            </Button>
        </>
    )
}

export default DeleteReviewButton