import React from "react";
import {Link} from "react-router-dom";

const MessagePage = ({message}) => {
    const getMessageParse = JSON.parse(message);
    return (
        <div>
            {
                getMessageParse.code === 200 ? (
                    <h3>{getMessageParse.message}</h3>
                ) : (
                    <>
                        <h3>Une erreur est survenue :</h3>
                        <p>{getMessageParse.message}</p>
                    </>
                )
            }
            <Link to={"/disconnect"}>Se déconnecter</Link>
            <br/>
            <Link to={"/is-connected"}>Revérifier (oublie pas de retirer ça)</Link>
        </div>
    )
}

export default MessagePage;