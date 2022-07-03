const deleteTableRequest = (idTable) => {
    let url = process.env.REACT_APP_URL_BACKEND + 'restaurant/table/' + idTable;
    return fetch(url, {
        crossDomain: true,
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
    });
};

export default deleteTableRequest;
