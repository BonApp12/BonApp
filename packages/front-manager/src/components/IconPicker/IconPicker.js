import {BiCategoryAlt} from "react-icons/bi";
import './style.scss';
import {useEffect, useMemo, useState} from "react";

export const IconPicker = ({setCategory}) => {
    const [icons, setIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(undefined);

    useEffect(async () => {
        try {
            const iconsName = await fetch(process.env.REACT_APP_URL_BACKEND + 'plate-category/icones')
                .then(res => res.json());

            setIcons(iconsName.map(icon => {
                return {name: icon, selected: false};
            }));
        } catch (e) {
            console.log(e);
        }
    }, []);

    function setSelected(icon) {
        setCategory({...icon, selected: true});
        setIcons(icons.map(i => i.name === icon.name ? {...i, selected: true} : {
            ...i,
            selected: false
        }));
        setSelectedIcon(icon);
    }

    return (


        <div className="inline-block">
            <label htmlFor="my-modal" className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-5">
                <div className="mb-2">
                    Séléctionner une icone
                </div>
                <div className="icon-select">
                    {selectedIcon ? <ImgIcon icon={selectedIcon.name}/> : <BiCategoryAlt/>}
                </div>
            </label>


            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3>Séléctionné un icone</h3>
                    <div className="icon-select-container">
                        {icons.map((icon, index) => (
                            <div className="icon-select-wrapper" key={index}>
                                <div className={"icon-select" + (icon?.selected ? ' selected' : '')}
                                     onClick={() => setSelected(icon)}>
                                    <ImgIcon icon={icon?.name}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Valider!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ImgIcon = ({icon}) => {
    return useMemo(() => {

        return (
            <img className={'icon-images'}
                 src={`${process.env.REACT_APP_URL_BACKEND}plate-category/icones/${icon}`}
                 alt=""/>
        );
    }, [icon]);
};
