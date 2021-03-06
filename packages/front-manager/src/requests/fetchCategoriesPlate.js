const fetchCategoriesPlate = () => {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'plate/plateCategories', {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default fetchCategoriesPlate;
