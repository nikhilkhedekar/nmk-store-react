import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

export const StripeProvider = ({ children }) => {
    const stripePromise = loadStripe("pk_test_51Lq9DaSCO1V2z2OIIAcnXAZsqQsWBD6wfyWNT0HRa4fDdryVfl72QEIgqhO71o5fRXauvmHB46obuSyohBUF11Ly00BwQQbpan");    
    const authCtx = useContext(AuthContext);

     return(
        <div>
            <>
            {
                authCtx?.isLoggedIn && (
                    <Elements stripe={stripePromise} >
                        {children}
                    </Elements>
                )
            }
        </>
        </div>
     )
}

export default StripeProvider