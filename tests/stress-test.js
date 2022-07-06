import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // around the breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
};

export default function () {
    const BASE_URL_API = 'http://localhost:4000'; // make sure this is not production

    const responses = http.batch([
        ['GET', `${BASE_URL_API}/plate/restaurant/1/`, null, { tags: { name: 'PublicPlates' } }],
        ['GET', `${BASE_URL_API}/plate/restaurant/2/`, null, { tags: { name: 'PublicPlates' } }],
        ['GET', `${BASE_URL_API}/plate/restaurant/3/`, null, { tags: { name: 'PublicPlates' } }],
        ['GET', `${BASE_URL_API}/plate/restaurant/4/`, null, { tags: { name: 'PublicPlates' } }],
    ]);

    sleep(1);
}
