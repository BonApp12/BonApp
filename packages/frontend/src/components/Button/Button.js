import React from "react";

export const Button = (props) => {
    return (
        <button className={'btn ' + props.classStyle} onClick={props.onClick}>{props.children}</button>
    )
}
