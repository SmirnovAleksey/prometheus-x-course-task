import './book-list.css';
import { Input } from '../input/Input';
import { BsSearch } from 'react-icons/bs';
import { Book } from '../single-book/Book';
import { useEffect, useState, useContext } from 'react';
import { BooksContext } from '../../contexts/BooksContext';



export const BookList = () => {
    const { response, error, loading } = useContext(BooksContext);
    const [filteredValue, setFilteredValue] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [filterParam, setFilterParam] = useState('All');

    const search = (items) => {
        return items?.books.filter(book => {
            const search = book.title.toLowerCase().includes(searchValue.toLowerCase())
            if (searchValue && filterParam !== 'All') {
                if (filterParam === '15') {
                    return book.price <= 15 && search;
                } else if (filterParam === '15-30') {
                    return (book.price <= 30 && book.price >= 15) && search;
                } else if (filterParam === '30') {
                    return book.price >= 30 && search;
                }
            } else if (searchValue) {
                return search
            } else if (filterParam === '15') {
                return book.price <= 15;
            } else if (filterParam === '15-30') {
                return book.price <= 30 && book.price >= 15;
            } else if (filterParam === '30') {
                return book.price >= 30;
            } else {
                return book;
            }
        })
    }

    useEffect(() => {
        setFilteredValue(response)
    }, [response])



    return (
        <>
            <section className="search-book">
                <form onSubmit={(e) => e.preventDefault()} className="search-book-form" name="searchBookForm">
                    <div className="search-book-input-wrapper">
                        <label htmlFor="search-book-input">
                            <Input
                                onChange={(e) => setSearchValue(e.target.value)}
                                id="search-book-input"
                                placeholder="Search book by name"
                            />
                        </label>
                        <BsSearch className="search-book-input__icon" />
                    </div>
                    <select
                        onChange={(e) => setFilterParam(e.target.value)}
                        className="book-filter"
                        name="select" id="select"
                        aria-label='Filter by price'
                    >
                        <option value="All">All</option>
                        <option value="15">Books up to $15</option>
                        <option value="15-30">Books from $15 to $30</option>
                        <option value="30">Books from $30</option>
                    </select>
                </form>
            </section>

            <section className="book-list">
                <div className="book-list-container">
                    {
                        loading && <span>Loading...</span>
                    }
                    {
                        error && <h1>Oops... something went wrong</h1>
                    }
                    {
                        search(filteredValue)?.length === 0 ? <h1>Book not found :(</h1> :
                            filteredValue && search(filteredValue).map(item => <Book key={item.id} book={item} />)
                    }
                </div>
            </section>

        </>
    )
}
