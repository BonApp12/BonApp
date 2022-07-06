import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL_API = 'https://apiv2.bonapp.ninja';
const email = 'akeem.stanton@gmail.com';
const password = '123';

export default () => {
    const loginRes = http.post(`${BASE_URL_API}/auth/login/`, {
        email: email,
        password: password,
        requestFrom: 'CLIENT',
    });

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('set-cookie') !== '',
    });


    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('set-cookie')}`,
        },
    };

    const myObjects = http.get(`${BASE_URL_API}/plate/restaurant/1`, authHeaders).json();
    check(myObjects, { 'retrieved plates': (obj) => obj.length > 0 });

    sleep(1);
};
