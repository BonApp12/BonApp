import {useEffect, useState} from 'react';

export default function useFetch(url, options = {
    crossDomain: true,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    header: 'Application/json'
}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    console.error(response);
                    setError('Une erreur est survenue');
                    setLoading(false);
                    setLoading(false);
                    return;
                }

                const posts = await response.json();
                console.log(posts);
                setData(posts);
            } catch (error) {
                setError(error);
                console.log(error);
                setLoading(false);
            }
        }

        loadData();
    }, [url]);
    return {
        data,
        loading,
        error
    };
}
