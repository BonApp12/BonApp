import {orders} from '../router/routes';
import axios from "axios";

export default function getReadyOrders(idRestaurant) {
    return axios.get(orders + 'restaurant/' + idRestaurant + '/status/ready', {
        credential: true
    });
}