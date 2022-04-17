import React, {useEffect, useState} from "react";
import Modal from "../Modal/Modal";
import fetchPlatesByRestaurants from "../../requests/fetchPlatesByRestaurants";
import ReactPaginate from "react-paginate";

export default function ShowPlates() {
    const [plates, setPlates] = useState([]);
    const [modalInfo, setModalInfo] = useState({});
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
        fetchPlatesByRestaurants(1).then(res => res.json()).then(platesFromRequest => {
            setPlates(platesFromRequest);
        });
    }, []);

    function deletePlate(plate) {
        console.log("let's delete this plate: ", plate);
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
                                            <img src="/tailwind-css-component-profile-2@56w.png"
                                                 alt="Avatar Tailwind CSS Component"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{plate.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {plate.description.replace(/(<([^>]+)>)/gi, "").slice(0, 20)}
                            </td>
                            <td>{plate.price} €</td>
                            <th>
                                {plate.category?.name}
                            </th>
                            <td>
                                <a href="#my-modal-2" className={"btn btn-primary btn-xs mr-1"}
                                   onClick={() => setModalInfo(plate)}>Détail</a>
                                <a className={"btn btn-error btn-xs"}
                                   onClick={() => deletePlate(plate)}>supprimer</a>
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

