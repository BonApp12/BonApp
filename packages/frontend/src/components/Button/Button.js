export const Button = ({classStyle,onClick,children}) => {
    return (
        <button className={'btn ' + classStyle} onClick={onClick}>{children}</button>
    )
};
