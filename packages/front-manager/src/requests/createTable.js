const createTable = (body) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/restaurant/add-table';
    return fetch(url, {
        // crossDomain: true,
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        //,
    });
};

export default createTable;
