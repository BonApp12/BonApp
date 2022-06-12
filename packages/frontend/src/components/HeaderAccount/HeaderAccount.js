import {Link} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";
import React from "react";

export default function HeaderAccount({url,title}){
    return (
        <>
            <Link to={`${url}`}>
                <BiArrowBack size={30}/>
            </Link>
            <h1 className="my-5">{title}</h1>
        </>
    )
}