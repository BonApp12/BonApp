import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../states/user";
import createTable from "../../requests/createTable";
import fetchTablesByRestaurants from "../../requests/fetchTablesByRestaurants";
import {toast} from "react-toastify";
import deleteTableRequest from "../../requests/deleteTable";

export default function ShowTable() {
    const [tables, setTables] = useState([]);
    const userState = useRecoilValue(userAtom);


    // Pagination
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % tables.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(tables.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(tables.length / itemsPerPage));
    }, [tables, itemOffset, itemsPerPage]);


    useEffect(() => {
        setTables([{name: 'test', id: 1}]);
        fetchTablesByRestaurants(userState.restaurant.id).then(res => res.json()).then(platesFromRequest => {
            setTables(platesFromRequest);
        });
    }, []);

    function generateTable() {
        const newTable = {libelle: 'tables ' + (tables.length+1), restaurant: userState.restaurant.id};
        setTables([...tables]);
        createTable(newTable).then(res => res.json()).then(resTables => {
            if (resTables.id) {
                setTables([...tables, resTables]);
                toast.success("La nouvelle table a bien été ajouté 🥄");
            } else {
                toast.error("Une erreur est survenue 😢");
            }
        });


    }

    function deleteTable(table) {
        deleteTableRequest(table.id).then(res => res.json()).then((res) => {
            if (res?.affected) {
                const newTables = tables.filter(t => t.id !== table.id);
                setTables(newTables);
                toast.success("La table a bien été supprimée 🥄");
            } else {
                toast.error("Une erreur est survenue 😢");
            }
        });
    }

    return (
        <>
            <div>
                <button onClick={generateTable} className="btn btn-outline btn-info mb-5 mt-5">Générer une nouvelle
                    table
                </button>
            </div>
            <div>
                <table className="table w-full">
                    <thead>
                    <tr className="text-center">
                        <th>
                        </th>
                        <th>Nom de la table</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems?.map(table => (
                        <tr key={table.id} className="text-center">
                            <th>
                            </th>
                            <td>
                                {table.libelle}
                            </td>
                            <td>
                                <a className={"btn btn-error btn-xs"}
                                   onClick={() => deleteTable(table)}>supprimer</a>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                    <tfoot>
                    <tr className="text-center">
                        <th>
                        </th>
                        <th>Nom de la table</th>
                        <th>Actions</th>
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
        </>)
        ;
}

