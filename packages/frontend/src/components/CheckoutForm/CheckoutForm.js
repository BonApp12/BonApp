import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Button} from "../Button/Button";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import {PaymentEnum} from "./PaymentEnum";

const CheckoutForm = (opt) => {
    const stripe = useStripe();
    const elements = useElements();

    // Utiliser des toasts pour afficher les messages de succès et d'erreur
    const [isLoading, setIsLoading] = useState(false);
    const [button, setButton] = useState(false);

    const clientSecret = opt.clientSecret;

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }
        setButton(true);

        stripe.retrievePaymentIntent(clientSecret).then(( { paymentIntent }) => {
            if (paymentIntent.status === "succeeded") return toast.success(PaymentEnum.PAYMENT_SUCCESS);
            if (paymentIntent.status === "processing") return toast.info(PaymentEnum.PAYMENT_PROCESSING);
            if (paymentIntent.status === "requires_payment_method") return toast.dark(PaymentEnum.PAYMENT_REQUIRES_PAYMENT_METHOD);
            return toast.error(PaymentEnum.ERROR.TYPE.PAYMENT)
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href, // Redirection obligatoire
            },
        });

        if (error.type === PaymentEnum.ERROR.TYPE.CARD || error.type === PaymentEnum.ERROR.TYPE.VALIDATION) {
            toast.error(error.message);
        } else {
            toast.error("Une erreur est survenue");
        }
        setIsLoading(false);
    }

        return (
        <form className="m-5">
            {isLoading && <Loading />}
            <PaymentElement id="payment-element" />
            {button && <Button classStyle="m-3" onClick={handleSubmit}>Payer 💸</Button>}
        </form>
    )
}

export default CheckoutForm;