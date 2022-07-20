import './style.scss';

export const PlateItem = ({plate, children}) => {
    return (
        <section className="plate-item">
            <div className="plate-wrapper">
                <div className="plate-img">
                    <img src={`${process.env.REACT_APP_URL_BACKEND}plate/uploads/${plate.photo ?? 'img.png'}`} alt=""/>
                </div>
                <div className="plate-name">
                    <h5>
                        {plate.name}
                        {children}
                    </h5>
                </div>
            </div>
        </section>
    );
};
