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
                                                        src={process.env.REACT_APP_URL_BACKEND + '/plate/uploads/' + plate.photo}
                                                        alt={plate.name}/>
                                                    :
                                                    <img
                                                        src={process.env.REACT_APP_URL_BACKEND + '/plate/uploads/' + 'img.png'}
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
                                    {plate.category?.name}
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
                <h3 className="font-bold text-lg mb-5">{modalInfo.name}</h3>
                <div dangerouslySetInnerHTML={{__html: modalInfo.description}}>
                </div>
                <div>
                    <div className="">
                        <h3 className="font-bold text-lg mb-5 w-full">Ingrédients</h3>
                        <div className="w-full">
                            {modalInfo.ingredients?.map(ingredient => (
                                <>
                                    <div key={ingredient.id} className="w-6/12"> {ingredient.name}</div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div className=" modal-action">
                    <a href="#" className="btn">Fermer
                    </a>
                    <a href="#" className="btn btn-warning">Modifier</a>
                </div>
            </Modal>
        </>)
        ;
}

