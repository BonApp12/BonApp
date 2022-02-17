const fetchFullPlateById = (idPlate, setPlate, setIsLoaded, setError) => {
    fetch('http://localhost:4000/plate/' + idPlate, {
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