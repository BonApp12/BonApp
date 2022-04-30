import {useEffect, useState} from "react";

export default function usePositionX(){
    const [dimension, setDimension] = useState(window.innerWidth);

    const handleResize = () => {
        setDimension(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [dimension]);

    return dimension;
}