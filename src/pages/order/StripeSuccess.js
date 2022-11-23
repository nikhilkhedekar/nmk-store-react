import { useNavigate } from "react-router-dom";

const StripeSuccess = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/orders/user-orders");
    }, 1000);
    return(
        <div>
            <h3>Success</h3>
        </div>
    )
}

export default StripeSuccess