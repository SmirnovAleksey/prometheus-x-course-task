import { createContext } from 'react'
import { useFetch } from '../hooks/useFetch'

export const BooksContext = createContext()


export const BooksProvider = ({ children }) => {

    const url = 'https://run.mocky.io/v3/9fab3e30-9ba9-474a-a6ee-ffeb30d4221f';
    const { response, error, loading, setResponse } = useFetch(url);

    const value = {
        response,
        error,
        loading,
        setResponse
    }

    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    )
}