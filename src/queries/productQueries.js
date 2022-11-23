import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
    query {
        getAllProducts {
            _id
            name
            price
            description
            image
            category
            company    
            featured
            freeShipping
            inventory
            averageRating
            numOfReviews
            user
            prod_id
            prod_price_id            
        }
    }
`
export const GET_SINGLE_PRODUCT = gql`
    query getProduct($productId: ID!){
        getSingleProduct(id: $productId) {
            _id
            name
            price
            description
            image
            category
            company
            featured
            freeShipping
            inventory
            averageRating
            numOfReviews
            user
            prod_id
            prod_price_id
            reviews {
                _id
                rating
                title
                comment
                user
                product {
                    _id
                }
            }
        }
    }
`
