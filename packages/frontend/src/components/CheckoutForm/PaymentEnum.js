export const PaymentEnum = Object.freeze({
    PAYMENT_SUCCESS: "Votre paiement a été effectué avec succès",
    PAYMENT_PROCESSING: "Votre paiement est en cours de traitement...",
    PAYMENT_REQUIRES_PAYMENT_METHOD: "Veuillez renseigner vos informations bancaires",
    ERROR: {
        TYPE: {
            PAYMENT: "Une erreur est survenue lors du paiement",
            CARD: "card_error",
            VALIDATION: "validation_error",
        },
    },
});