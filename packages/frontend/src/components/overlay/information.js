import '../../css/overlay-information.css';
import React from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";

export function Information({displayModal, setDisplayModal, children}) {
    return (
        <div>
            <div className={`modal-swipe ${displayModal?.isOpen ? 'show' : ''}`}>
                <button className="p-4 float-right text-2xl hover:text-rose-500 ease-in duration-300"
                        onClick={() => setDisplayModal(!displayModal)}>
                    <AiOutlineCloseCircle/>
                </button>
                {children}
            </div>
            <div className={`overlay ${displayModal?.isOpen ? 'show' : ''}`} onClick={() => setDisplayModal(!displayModal)}/>
        </div>

    );
}

