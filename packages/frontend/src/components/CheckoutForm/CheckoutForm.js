import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Button} from "../Button/Button";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

const CheckoutForm = (opt) => {
    const stripe = useStripe();
    const elements = useElements();

    // Utiliser des toasts pour afficher les messages de succès et d'erreur
    const [isLoading, setIsLoading] = useState(false);

    const clientSecret = opt.clientSecret;

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(( { paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    toast.success('Votre paiement a été effectué avec succès !');
                    break;
                case "processing":
                    toast.info('Votre paiement est en cours de traitement...');
                    break;
                case "requires_payment_method":
                    toast.dark('Veuillez renseigner vos informations bancaires');
                    break;
                default:
                    toast.error('Une erreur est survenue');
                    break;
            }
        });
    }, [stripe])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            return; // TODO : Faire en sorte de désactiver le bouton de paiement tant que Stripe n'est pas chargé.
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href, // TODO : Faire en sorte de ne pas rediriger du tout - Revoir le workflow et rediriger autre part, suivi de commande?
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            toast.error(error.message);
        } else {
            toast.error("Une autre erreur est survenue");
        }
        setIsLoading(false);
    }

        return (
        <form className="m-5">
            {isLoading && <Loading />}
            <PaymentElement id="payment-element" />
            <Button classStyle="m-3" onClick={handleSubmit}>Payer 💸</Button>
        </form>
    )
}

export default CheckoutForm;