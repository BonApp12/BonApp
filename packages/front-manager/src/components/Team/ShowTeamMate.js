import React, {useEffect, useState} from "react";
import fetchTeamMate from "../../requests/fetchTeamMate";
import ReactPaginate from "react-paginate";
import {toast} from "react-toastify";
import ConfirmToaster from '../Utils/ConfirmToaster';
import deleteUser from '../../requests/deleteUser';
import updateUser from '../../requests/updateUser';
import {BsPencil} from "react-icons/bs";
import {ImCancelCircle} from "react-icons/im";
import roleEnum from "../Enum/RoleEnum";

export default function () {
    const [equipiers, setEquipiers] = useState([]);
    // EditMode
    const [editable, setEditable] = useState({index: null, isEditable: false, updatedEquipier: {}});
    // Pagination
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % equipiers.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(equipiers.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(equipiers.length / itemsPerPage));
    }, [equipiers, itemOffset, itemsPerPage]);

    useEffect(() => {
        //TODO: mettre l'id dynamique en fonction du restaurant connecté
        fetchTeamMate(1).then(async res => res.json()).then(data => setEquipiers(data));
    }, []);


    function getRole(role) {
        if (role === roleEnum.RESTAURANT_KITCHEN) return 'Cuisinier';
        if (role === roleEnum.RESTAURANT_SERVER) return 'Serveur';
        if (role === roleEnum.RESTAURANT_MANAGER) return 'Manager';
    }

    function deleteUserAction(id) {
        toast.warn(<ConfirmToaster confirmCallBack={() => confirm(id)}/>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
        });


    }

    function confirm(id) {
        deleteUser(id).then(res => res.json())
            .then(data => {
                if (data.affected) {
                    toast.success(`l'équipier a bien été supprimé.`);
                    setEquipiers(equipiers.filter(equipier => equipier.id !== id));
                } else {
                    toast.error(data.message);
                }
            });
    }

    function editMode(index) {
        setEditable({index, isEditable: true, updatedEquipier: equipiers[index]});
    }


    function updateEquipier() {
        updateUser(editable.updatedEquipier).then(res => res.json())
            .then(data => {
                setEquipiers(equipiers.map(e => e.id === editable.updatedEquipier.id ? editable.updatedEquipier : e));
                setEditable({index: null, isEditable: false, updatedEquipier: {}});
                if (data.id) return toast.success(`l'équipier a bien été mis à jour.`);
                return toast.error(data.message);
            });

    }

    function cancelUpdate() {
        setEditable({index: null, isEditable: false, updatedEquipier: {}});
    }

    return (
        <>
            <div>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Membres de l'équipe
                </h6>
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>Nom</th>
                        <th>prenom</th>
                        <th>Poste</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems?.map((equipier, index) => (
                        <tr key={equipier.id}>
                            <th>

                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">{index + 1}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        {index === editable.index && editable.isEditable ?
                                            <input type="text" className="w-full" defaultValue={equipier.lastname}
                                                   onInput={e => setEditable({
                                                       ...editable,
                                                       updatedEquipier: {
                                                           ...editable.updatedEquipier,
                                                           lastname: e.target.value
                                                       }
                                                   })}/> :
                                            <div
                                                className="font-bold">{equipier.lastname}</div>
                                        }
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        {index === editable.index && editable.isEditable ?
                                            <input type="text" className="w-full" defaultValue={equipier.firstname}
                                                   onInput={e => setEditable({
                                                       ...editable,
                                                       updatedEquipier: {
                                                           ...editable.updatedEquipier,
                                                           firstname: e.target.value
                                                       }
                                                   })}/> :
                                            <div
                                                className="font-bold">{equipier.firstname}</div>
                                        }
                                    </div>
                                </div>
                            </td>
                            <td>
                                {index === editable.index && editable.isEditable ?
                                    <select className="w-full" defaultValue={equipier.role}
                                            onChange={e => setEditable({
                                                ...editable,
                                                updatedEquipier: {
                                                    ...editable.updatedEquipier,
                                                    role: e.target.value
                                                }
                                            })}>
                                        <option value={roleEnum.RESTAURANT_KITCHEN}>Cuisinier</option>
                                        <option value={roleEnum.RESTAURANT_SERVER}>Serveur</option>
                                        <option value={roleEnum.RESTAURANT_MANAGER}>Manager</option>
                                    </select> :
                                    <div className="font-bold">{getRole(equipier.role)}</div>
                                }
                            </td>
                            <td>
                                {index === editable.index && editable.isEditable ?
                                    <div>
                                        <button className="btn btn-success btn-xs mr-1"
                                                onClick={updateEquipier}>valider
                                        </button>
                                        <button className="btn btn-square btn-xs btn-outline btn-error"
                                                onClick={cancelUpdate}><ImCancelCircle/></button>
                                    </div>

                                    :
                                    <div>

                                        <button className="btn btn-error btn-xs mr-1"
                                                onClick={() => deleteUserAction(equipier.id)}>Supprimer
                                        </button>
                                        <button className="btn btn-square btn-xs btn-outline btn-warning"
                                                onClick={() => editMode(index)}><BsPencil/></button>
                                    </div>

                                }

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-center mt-3">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageLinkClassName={"badge"}
                        pageClassName="inline-block"
                        nextClassName={"badge badge-secondary badge-outline "}
                        previousClassName={"badge badge-secondary badge-outline "}
                        activeLinkClassName={"badge badge-primary badge-accent"}
                    />
                </div>

            </div>
        </>
    );
}
