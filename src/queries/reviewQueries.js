import { gql } from "@apollo/client"

export const GET_ALL_REVIEWS = gql`
    query {
        getAllReviews {
            _id
            rating
            title
            comment
            user
            product {
                _id
                name
                company
                price
            }
        }
    }
`

export const GET_SINGLE_REVIEW = gql`
    query getReview($reviewId: ID!){
        getSingleReview(id: $reviewId) {
            _id
            rating
            title
            comment
            user
            product {
                _id
                name
                company
                price
            }
        }
    }
`