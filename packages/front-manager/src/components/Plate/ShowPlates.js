import React, {useEffect, useState} from "react";
import Modal from "../Modal/Modal";
import fetchPlatesByRestaurants from "../../requests/fetchPlatesByRestaurants";
import ReactPaginate from "react-paginate";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import deletePlateRequest from "../../requests/deletePlate";
import resetUserConnected from "../../helpers/resetUserConnected";
import {useHistory} from "react-router-dom";

export default function ShowPlates() {
    const history = useHistory();
    const [plates, setPlates] = useState([]);
    const [modalInfo, setModalInfo] = useState({});
    const [userState,setUserState] = useRecoilState(userAtom);


    // Pagination
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % plates.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(plates.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(plates.length / itemsPerPage));
    }, [plates, itemOffset, itemsPerPage]);


    useEffect(() => {
        fetchPlatesByRestaurants(userState.restaurant.id).then(async platesFromRequest => {
            if(platesFromRequest.status === 401) resetUserConnected(setUserState,history);
            setPlates(await platesFromRequest.json());
        });

        return function cleanup() {
            setPlates([]);
        }
    }, []);

    function generateHexaColor(){
        return Math.floor(Math.random()*16777215).toString(16);
    }

    function deletePlate(plate) {
        deletePlateRequest(plate.id).then(async(res) => {
            if(res.status === 401) resetUserConnected(setUserState,history);
            const newPlates = plates.filter(p => p.id !== plate.id);
            setPlates(newPlates);
        });
    }

    return (
        <>
            <div>
                <table className="table w-full">
                    <thead>
                    <tr className="text-center">
                        <th>
                        </th>
                        <th>Nom du plat</th>
                        <th>Description</th>
                        <th>Prix (en €)</th>
                        <th>Catégorie</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems?.map(plate => (
                            <tr key={plate.id} className="text-center">
                                <th>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                {plate.photo ?
                                                    <img
                                                        src={process.env.REACT_APP_URL_BACKEND + 'plate/uploads/' + plate.photo}
                                                        alt={plate.name}/>
                                                    :
                                                    <img
                                                        src={process.env.REACT_APP_URL_BACKEND + 'plate/uploads/' + 'img.png'}
                                                        alt={plate.name}/>}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{plate.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {
                                        plate.description?.length ?
                                            plate.description.replace(/(<([^>]+)>)/gi, "").slice(0, 20) + "..." :
                                            <span className="tooltip"
                                                  data-tip="Modifier ce plat pour avoir une description">
                                        <span className="badge badge-primary cursor-pointer">
                                        Aucune description
                                    </span>
                                        </span>
                                    }
                                </td>
                                <td>{plate.price} €</td>
                                <th>
                                    {plate.type}
                                </th>
                                <td>
                                    <a href="#my-modal-2" className={"btn btn-primary btn-xs mr-1"}
                                       onClick={() => setModalInfo(plate)}>Détail</a>
                                    <span className="tooltip" data-tip="Supprimer ce plat">
                                <a className={"btn btn-error btn-xs"}
                                   onClick={() => deletePlate(plate)}>supprimer</a>
                                </span>
                                </td>
                            </tr>
                    ))}

                    </tbody>
                    <tfoot>
                    <tr>
                        <th>
                        </th>
                        <th>Nom du plat</th>
                        <th>Description</th>
                        <th>Prix (en €)</th>
                        <th>Catégorie</th>
                        <th>Action</th>
                    </tr>
                    </tfoot>

                </table>
                <div className="flex items-center justify-center mt-3">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        className={'btn-group'}
                        previousLabel="<"
                        breakClassName={'btn rounded-none'}
                        pageLinkClassName={"btn rounded-none"}
                        nextLinkClassName={"btn rounded-none"}
                        previousLinkClassName={"btn rounded-none"}
                        activeLinkClassName={"btn-primary"}
                    />
                </div>
            </div>


            <Modal idModal={modalInfo.id} buttonClass={"btn-primary"}>
                <div className="flex mt-2 px-5 mb-5">
                    <h2 className="ml-auto mr-auto font-bold text-lg">{modalInfo.type}</h2>
                </div>
                <div className="mask mask-circle w-32 h-32 ml-auto mr-auto">
                        {modalInfo.photo ?
                            <img
                                src={process.env.REACT_APP_URL_BACKEND + 'plate/uploads/' + modalInfo.photo}
                                alt={modalInfo.name}/>
                            :
                            <img
                                src={process.env.REACT_APP_URL_BACKEND + 'plate/uploads/' + 'img.png'}
                                alt={modalInfo.name}/>}
                </div>
                <div className="flex mt-2 mb-5 px-5">
                    <h2 className="ml-auto mr-auto font-bold text-lg">{modalInfo.name} : {modalInfo.price}€</h2>
                </div>

                <div className="px-5 mb-5">
                    <h3 className="font-bold">Description : </h3>
                    <div className="px-5 text-justify" dangerouslySetInnerHTML={{__html: modalInfo.description}}>
                    </div>
                </div>
                <div className="px-5">
                    <div className="">
                        <h3 className="font-bold text-lg mb-1 w-full">Ingrédients</h3>
                        <div className="w-full px-5">
                            {modalInfo.ingredients?.length === 0 ? (
                                    <>
                                        <span className={'btn btn-primary btn-xs mr-2 rounded-full text-white '} style={{backgroundColor: '#' + generateHexaColor()}}>Aucun ingrédients renseignés</span>
                                    </>

                                ):
                            modalInfo.ingredients?.map(ingredient => (
                                <>
                                        <span key={ingredient.id} className={'btn btn-primary btn-xs mr-2 rounded-full text-white '} style={{backgroundColor: '#' + generateHexaColor()}}> {ingredient.name}</span>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="px-5 mt-2">
                    <div className="">
                        <h3 className="font-bold text-lg mb-1 w-full">Catégories</h3>
                        <div className="w-full px-5">
                            {modalInfo.categories?.length === 0 ? (
                                <>
                                    <span className={'btn btn-primary btn-xs mr-2 rounded-full text-white '} style={{backgroundColor: '#' + generateHexaColor()}}>Aucunes catégories</span>
                                </>

                            ):
                            modalInfo.categories?.map(category => (
                                <>
                                    <span key={category.id} className={'btn btn-primary btn-xs mr-2 rounded-full text-white '} style={{backgroundColor: '#' + generateHexaColor()}}> {category.name}</span>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div className=" modal-action">
                    <a href="#" className="btn">Fermer
                    </a>
                    <a href="#" onClick={() => deletePlate(modalInfo)} className="btn btn-error">Supprimer</a>
                </div>
            </Modal>
        </>)
        ;
}

