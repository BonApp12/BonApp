import Loader from '../../img/loader.gif';

const Loading = () => {
    return (
        <div className="loading">
            <img src={Loader} alt="chargement"/>
            <h2>Un instant on préchauffe nos fours 🔥</h2>
        </div>
    );
};

export default Loading;
