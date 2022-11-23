import { StripeProvider } from "../../providers/stripePaymentIntentProvider"
import CartCheckoutForm from "./CartCheckoutForm"

const CartCheckoutFormEnc = () => {
    return(
        <StripeProvider>
            <CartCheckoutForm />
        </StripeProvider>
    )
}

export default CartCheckoutFormEnc