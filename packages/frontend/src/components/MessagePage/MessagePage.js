import React from "react";
import {Link} from "react-router-dom";

const MessagePage = ({ errorMessage }) =>
    (
        <div>
            <h3>Une erreur est survenue :</h3>
            <p>{errorMessage}</p>
            <Link to={"/disconnect"}>Se déconnecter</Link>
            <br/>
            <Link to={"/is-connected"}>Revérifier (oublie pas de retirer ça)</Link>
        </div>
    )

export default MessagePage;