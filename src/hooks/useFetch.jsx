import { useState, useEffect } from 'react'

export const useFetch = (url) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setResponse(data);
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    return { response, error, loading, setResponse };
}