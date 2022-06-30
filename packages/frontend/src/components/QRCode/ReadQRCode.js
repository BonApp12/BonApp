import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Html5Qrcode} from "html5-qrcode";
import Loading from "../Loading/Loading";

export default function ReadQRCode() {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText) => {
            if (decodedText && isValidHttpUrl(decodedText)) {
                let scannedRestaurant = new URL(decodedText);
                setIsLoaded(true);
                setTimeout(() => navigate(scannedRestaurant.pathname), 3000);
                html5QrCode.stop();
            }
        };
        const config = {fps: 10, qrbox: {width: 250, height: 250}};
        html5QrCode.start({facingMode: "environment"}, config, qrCodeSuccessCallback);
        return () => {
            html5QrCode.stop();
        };
    }, []);


    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    if (isLoaded) return <div><Loading/></div>;
    return (

        <section>
            <h2 className="mb-5">Scanner votre QR code</h2>
            <div id="reader"/>

        </section>
    );
}
