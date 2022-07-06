import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
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
