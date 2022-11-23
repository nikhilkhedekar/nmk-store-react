import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

export const StripeProvider = ({ children }) => {
    const stripePromise = loadStripe("pk_test_51Lq9DaSCO1V2z2OIIAcnXAZsqQsWBD6wfyWNT0HRa4fDdryVfl72QEIgqhO71o5fRXauvmHB46obuSyohBUF11Ly00BwQQbpan");    
    const authCtx = useContext(AuthContext);
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: authCtx?.clientSecret,
        appearance,
    };

    return (
        <>
            {
                authCtx?.isLoggedIn && (
                    <Elements options={options} stripe={stripePromise} >
                        {children}
                    </Elements>
                )
            }
        </>
    )
}