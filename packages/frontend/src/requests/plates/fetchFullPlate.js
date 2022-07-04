const fetchFullPlateById = (idPlate, setPlate, setIsLoaded, setError, navigate) => {
    fetch(process.env.REACT_APP_URL_BACKEND + 'plate/' + idPlate, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.hasOwnProperty('statusCode') && result.statusCode === 401){
                    navigate('/');
                }else{
                    setPlate(result);
                    setIsLoaded(true);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}

export default fetchFullPlateById;
