import {useEffect, useState} from "react";
import findAllUserRestaurant from "../requests/findAllUserRestaurant";
import RoleEnum from "../enum/RoleEnum";
import ReactPaginate from "react-paginate";
import resetUserConnected from "../helpers/resetUserConnected";
import {useRecoilState} from "recoil";
import {userAtom} from "../states/user";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function Dashboard(){
    const [usersRestaurant,setUsersRestaurant] = useState([]);
    const [userRecoil, setUserRecoil] = useRecoilState(userAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if(userRecoil === null){
            navigate('/login');
            toast.error('Vous devez être connecté pour accéder à cette page');
        }
    }, [userRecoil, navigate]);

    //paginate
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % usersRestaurant.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        findAllUserRestaurant()
            .then(res => {
                if(res.status === 401){
                    resetUserConnected(setUserRecoil, navigate);
                }
                return res.json();
            })
            .then(data => {
                setUsersRestaurant(data);
            });

        return () => {
            setUsersRestaurant([]);
        }
    },[]);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(usersRestaurant.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(usersRestaurant.length / itemsPerPage));

        return () => {
            setCurrentItems([]);
        }
    }, [usersRestaurant, itemOffset, itemsPerPage]);

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <h1 className="font-bold text-xl mb-2">Restaurants</h1>
                <table className="table w-full bg-white">
                    <thead>
                    <tr>
                        <th></th>
                        <th>#Id</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Nom du restaurant</th>
                    </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td></td>
                                    <td>{user.id}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.email}</td>
                                    <td>{RoleEnum[user.role]}</td>
                                    <td>{user.restaurant.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-5">
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
    )
}