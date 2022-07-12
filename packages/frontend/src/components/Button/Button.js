import {useMemo} from "react";

export const Button = ({classStyle, onClick, children}) => {
    return useMemo(() => {
        return (<button className={'btn ' + classStyle} onClick={onClick}>{children}</button>);
    }, [classStyle, onClick, children]);
};
