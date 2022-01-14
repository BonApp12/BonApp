import React from "react";

const MessagePage = ({ errorMessage }) =>
    (
        <div>
            <h3>Une erreur est survenue :</h3>
            <p>{errorMessage}</p>
            <a href={"/disconnect"}>Se déconnecter</a>
        </div>
    )

export default MessagePage;