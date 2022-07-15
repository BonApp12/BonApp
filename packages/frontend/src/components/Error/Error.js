import ErrorIcon from '../../img/error.gif';

const Error = () => {
    return (
        <div className="loading">
            <img src={ErrorIcon} alt="chargement"/>
            <h2>Ah mince, quelques chose s'est mal passé, si on réessayait ? 😰</h2>
        </div>
    );
};

export default Error;
