import route from "../../router/route";

const generatePdf = (orderId) => {
    fetch(route.generatePdf + '/'+orderId, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        //
    })
        .then(res => res.blob())
        .then(data => {
            const url = window.URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
            window.open(url);
        })
        .catch((err) => {
            console.log(err);
        });
}
export default generatePdf;
