import {PlateItem} from "../PlateItem/PlateItem";

export const Column = ({titleColumn}) => {
    return (
        <>
            <section className="column-wrapper">
                <section className="title-category">
                    <h5>
                        {titleColumn}
                    </h5>
                </section>
                <section className="category-drop">
                    <PlateItem/>
                    <PlateItem/>
                    <PlateItem/>
                    <PlateItem/>
                </section>
            </section>
        </>

    );
};
