import {useMemo} from "react";

export const ImgIcon = ({icon}) => {
    return useMemo(() => {

        return (
            <img className={'icon-images'}
                 src={`${process.env.REACT_APP_URL_BACKEND}plate-category/icones/${icon}`}
                 alt=""/>
        );
    }, [icon]);
};
