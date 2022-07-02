import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button} from "../Button/Button";
import {useEffect, useState} from "react";
import {LoadingPayment} from "../Loading/Loading";
import {toast} from "react-toastify";
import {PAYMENTENUM} from "./PaymentEnum";
import {MdOutlinePayment} from "react-icons/md";

const CheckoutForm = (opt) => {
    const stripe = useStripe();
    const elements = useElements();

    // Utiliser des toasts pour afficher les messages de succès et d'erreur
    const [isLoading, setIsLoading] = useState(true);
    const [button, setButton] = useState(false);

    const clientSecret = opt.clientSecret;

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }
        setButton(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            if (paymentIntent.status === PAYMENTENUM.STATUS.SUCCEEDED) return toast.success(PAYMENTENUM.PAYMENT_SUCCESS);
            if (paymentIntent.status === PAYMENTENUM.STATUS.PROCESSING) return toast.info(PAYMENTENUM.PAYMENT_PROCESSING);
            if (paymentIntent.status === PAYMENTENUM.STATUS.REQUIRES_PAYMENT_METHOD) return toast.info(PAYMENTENUM.PAYMENT_REQUIRES_PAYMENT_METHOD);
            return toast.error(PAYMENTENUM.ERROR.TYPE.PAYMENT);
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!stripe || !elements) {
            return;
        }
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href, // Redirection obligatoire
            },
        });

        if (error.type === PAYMENTENUM.ERROR.TYPE.CARD ||
            error.type === PAYMENTENUM.ERROR.TYPE.VALIDATION) toast.error(error.message);
        toast.error(PAYMENTENUM.ERROR.TYPE.GENERAL);
        setIsLoading(false);
    };

    return (
        <form className="m-5">
            {isLoading && <LoadingPayment/>}
            <PaymentElement id="payment-element"/>
            {(!isLoading && button) && <>
                <Button classStyle={'mt-3 btn-payment'}
                        onClick={handleSubmit}>
                    <MdOutlinePayment/>
                    <span className="ml-2">
                        Payer
                    </span>
                </Button>
            </>
            }

        </form>
    );
};

export default CheckoutForm;
