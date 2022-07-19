import './style.scss';

export const PlateItem = () => {
    return (
        <section className="plate-item">
            <div className="plate-wrapper">
                <div className="plate-img">
                    <img src={"https://via.placeholder.com/150x150"} alt=""/>
                </div>
                <div className="plate-name">
                    <h5>
                        Nom du plat
                    </h5>
                </div>
            </div>
        </section>
    );
};
