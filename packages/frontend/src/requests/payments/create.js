export function createPayment(totalAmount = 0) {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'payment/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: totalAmount * 100, // En centimes, donc on multiplie par 100.
        })
    });
}
