import '../../css/overlayInformaiton.css';
import React from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";

export function Information({displayModal, setDisplayModal, children}) {
    return (
        <div>
            <div className={`Modal ${displayModal?.isOpen ? 'Show' : ''}`}>
                <button className="p-4 float-right text-2xl hover:text-rose-500 ease-in duration-300"
                        onClick={() => setDisplayModal(!displayModal)}>
                    <AiOutlineCloseCircle/>
                </button>
                {children}
            </div>
            <div className={`Overlay ${displayModal?.isOpen ? 'Show' : ''}`} onClick={() => setDisplayModal(!displayModal)}/>
        </div>

    );
}

