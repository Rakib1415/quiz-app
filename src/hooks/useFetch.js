import { useEffect, useState } from 'react';

const useFetch = (url, method, headers) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [result , setResult] = useState([]);
    
    useEffect(() => {
        const fetchResult = async() => {
            try{
                setLoading(true);
                setError(false);
                const response = await fetch(url, {
                    method : method || 'GET',
                    headers : headers
                });
                const data = await response.json();
                setLoading(false);
                setResult(data);
            }catch(err){
                setLoading(false);
                setError(true);
                console.log(err);
            }

        };

        fetchResult();

    }, []);

    return {
        loading,
        error,
        result
    }

};

export default useFetch;