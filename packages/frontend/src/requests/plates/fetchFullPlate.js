const fetchFullPlateById = (idPlate, setPlate, setIsLoaded, setError) => {
    fetch(process.env.REACT_APP_URL_BACKEND + '/plate/' + idPlate, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(
            (result) => {
                setPlate(result);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}

export default fetchFullPlateById;
