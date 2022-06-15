import React, {useEffect, useState} from "react";
import fetchTeamMember from "../../requests/fetchTeamMember";
import ReactPaginate from "react-paginate";
import {toast} from "react-toastify";
import ConfirmToaster from '../Utils/ConfirmToaster';
import deleteUser from '../../requests/deleteUser';
import updateUser from '../../requests/updateUser';
import {BsPencil} from "react-icons/bs";
import {ImCancelCircle} from "react-icons/im";
import roleEnum from "../Enum/RoleEnum";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import resetUserConnected from "../../helpers/resetUserConnected";
import {useHistory} from "react-router-dom";

export default function () {
    const [userState,setUserState] = useRecoilState(userAtom);
    const [teamMembers, setTeamMembers] = useState([]);
    // EditMode
    const [editable, setEditable] = useState({index: null, isEditable: false, updatedTeamMember: {}});
    // Pagination
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;
    const history = useHistory();


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % teamMembers.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(teamMembers.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(teamMembers.length / itemsPerPage));
    }, [teamMembers, itemOffset, itemsPerPage]);

    useEffect(() => {
        fetchTeamMember(userState.restaurant.id).then(async res => {
            if (res.status === 401) resetUserConnected(setUserState,history);
            setTeamMembers(await res.json());
        });
        return function cleanup(){
            setTeamMembers([]);
        }
    }, []);


    function getRole(role) {
        if (role === roleEnum.RESTAURANT_KITCHEN) return 'Cuisinier';
        if (role === roleEnum.RESTAURANT_SERVER) return 'Serveur';
        if (role === roleEnum.RESTAURANT_MANAGER) return 'Manager';
    }

    function deleteUserAction(id) {
        toast.warn(<ConfirmToaster message={"Voulez-vous supprimer cet équipier?"}
                                   confirmCallBack={() => confirm(id)}/>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
        });


    }

    function confirm(id) {
        deleteUser(id).then(res => {
            if (res.status === 401) resetUserConnected(setUserState,history);
            else return res.json();
        })
            .then(rowDeleted => {
                if (rowDeleted.affected) {
                    toast.success(`l'équipier a bien été supprimé.`);
                    setTeamMembers(teamMembers.filter(teamMember => teamMember.id !== id));
                } else {
                    toast.error(rowDeleted.message);
                }
            })
            .catch(() => {
                toast.error('Erreur lors de la suppression de l\'équipier');
            });
    }

    function editMode(index) {
        setEditable({index, isEditable: true, updatedTeamMember: teamMembers[index]});
    }


    function updateTeamMember() {
        updateUser(editable.updatedTeamMember).then(res => {
            if(res.status === 401) resetUserConnected(setUserState,history);
            else return res.json();
        })
            .then(data => {
                setTeamMembers(teamMembers.map(e => e.id === editable.updatedTeamMember.id ? editable.updatedTeamMember : e));
                setEditable({index: null, isEditable: false, updatedTeamMember: {}});
                if (data.id) return toast.success(`l'équipier a bien été mis à jour.`);
                return toast.error(data.message);
            })
            .catch(err => toast.error('Une erreur est survenue lors de la mise à jour de l\'équipier.'));

    }

    function cancelUpdate() {
        setEditable({index: null, isEditable: false, updatedTeamMember: {}});
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
                    {currentItems?.map((teamMember, index) => (
                        <tr key={teamMember.id}>
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
                                            <input type="text" className="w-full" defaultValue={teamMember.lastname}
                                                   onInput={e => setEditable({
                                                       ...editable,
                                                       updatedTeamMember: {
                                                           ...editable.updatedTeamMember,
                                                           lastname: e.target.value
                                                       }
                                                   })}/> :
                                            <div
                                                className="font-bold">{teamMember.lastname}</div>
                                        }
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        {index === editable.index && editable.isEditable ?
                                            <input type="text" className="w-full" defaultValue={teamMember.firstname}
                                                   onInput={e => setEditable({
                                                       ...editable,
                                                       updatedTeamMember: {
                                                           ...editable.updatedTeamMember,
                                                           firstname: e.target.value
                                                       }
                                                   })}/> :
                                            <div
                                                className="font-bold">{teamMember.firstname}</div>
                                        }
                                    </div>
                                </div>
                            </td>
                            <td>
                                {index === editable.index && editable.isEditable ?
                                    <select className="w-full" defaultValue={teamMember.role}
                                            onChange={e => setEditable({
                                                ...editable,
                                                updatedTeamMember: {
                                                    ...editable.updatedTeamMember,
                                                    role: e.target.value
                                                }
                                            })}>
                                        <option value={roleEnum.RESTAURANT_KITCHEN}>Cuisinier</option>
                                        <option value={roleEnum.RESTAURANT_SERVER}>Serveur</option>
                                        <option value={roleEnum.RESTAURANT_MANAGER}>Manager</option>
                                    </select> :
                                    <div className="font-bold">{getRole(teamMember.role)}</div>
                                }
                            </td>
                            <td>
                                {index === editable.index && editable.isEditable ?
                                    <div>
                                        <button className="btn btn-success btn-xs mr-1"
                                                onClick={updateTeamMember}>valider
                                        </button>
                                        <button className="btn btn-square btn-xs btn-outline btn-error"
                                                onClick={cancelUpdate}><ImCancelCircle/></button>
                                    </div>
                                    :
                                    <div>
                                        <button className="btn btn-error btn-xs mr-1"
                                                onClick={() => deleteUserAction(teamMember.id)}>Supprimer
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
        </>
    );
}
