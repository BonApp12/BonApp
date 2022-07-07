import {orders} from "../router/routes";
import axios from "axios";

export default function setOrderToCompleted(idOrder) {
    return axios.patch(orders + idOrder, {
        status: 'completed',
        credential: true,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}