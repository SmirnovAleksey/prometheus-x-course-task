import './specific-book.css';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FcImageFile } from 'react-icons/fc';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { BooksContext } from '../../contexts/BooksContext';
import { useParams } from 'react-router-dom';


export const SpecificBook = () => {
    const book = JSON.parse(localStorage.getItem('book'));
    const { response } = useContext(BooksContext);
    const { bookId } = useParams();

    const [count, setCount] = useState(1);
    const [specificBook, setSpecificBook] = useState(book);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isInitial, setIsInitial] = useState(false);

    const { cartItem, setCartItem } = useContext(CartContext);

    const incrementCount = () => {
        count < 42 && setCount(count + 1);
    }
    const decrementCount = () => {
        count > 1 && setCount(count - 1);
    };

    const inputValidate = (e) => {
        const regex = /^[1-9]{1}$|^[1-3]{1}[0-9]{1}$|^[1-4]{1}[0-2]{1}$/;
        const value = e.target.value;
        value > 42 ? setCount(42) : value < 1 ? setCount(1) :
            regex.test(value) ? setCount(e.target.value) : setCount((p) => p);
    }

    const addToCart = () => {
        if (specificBook) {
            const goods = {
                id: specificBook.id,
                img: specificBook.image,
                title: specificBook.title,
                quantity: count,
                cost: specificBook.price,
                amount: +totalPrice
            }

            const cartFilter = () => {
                if (!!cartItem.find(item => item.id === goods.id)) {

                    return cartItem.map((item) => {
                        if (item.id === goods.id) {
                            return { ...item, quantity: item.quantity + goods.quantity }
                        } else {
                            return item;
                        }
                    })
                } else {
                    return cartItem.concat(goods);
                }
            }
            setCartItem(cartFilter());
        }
    }

    useEffect(() => {
        const prevGoods = JSON.parse(localStorage.getItem('goods')) || [];
        setCartItem(prevGoods)
        setIsInitial(true);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setTotalPrice((specificBook?.price * count || 0).toFixed(2));
    }, [count, specificBook])

    useEffect(() => {
        if (isInitial) {
            localStorage.setItem('goods', JSON.stringify(cartItem));
        }
    }, [cartItem, isInitial])


    useEffect(() => {
        const temp = response?.books.find(e => e.id == bookId)
        const regex = /^[0-9]{1,}$/
        if (!bookId) {
            setSpecificBook(book)
        } else if (bookId < 1 || bookId > response?.books.length || !regex.test(bookId)) {
            throw new Error('Page not found')
        } else if (temp) {
            setSpecificBook(temp);
            localStorage.setItem('book', JSON.stringify(temp))
        }
    }, [response, bookId])

    return (
        <section className="book-section__container">
            <div className="book-section">
                <article className="book-description">
                    <div className="book-description__image">
                        {
                            specificBook.image ?
                                <img className="book-img"
                                    src={specificBook.image}
                                    alt={specificBook.title} /> :
                                <FcImageFile className="book-img" />
                        }
                    </div>
                    <div className="book-description__wrapper">
                        <div className="book-description__text">
                            <p>Book name:</p>
                            <p className='book-description-title'>
                                {
                                    specificBook &&
                                        specificBook?.title.length < 24 ?
                                        specificBook?.title :
                                        specificBook?.title.slice(0, 24) + '...'
                                }
                            </p>
                        </div>
                        <div className="book-description__text">
                            <p>Book author:</p>
                            <p>{specificBook.author}</p>
                        </div>
                        <div className="book-description__text">
                            <p>Book level:</p>
                            <p>{specificBook.id}</p>
                        </div>
                        <div className="book-description__text">
                            <p>Book tags:</p>
                            <p><i>Empty</i></p>
                        </div>
                    </div>
                </article>

                <form onSubmit={(e) => e.preventDefault()} autoComplete="off" className="book-form" name="bookForm">
                    <div className="price">
                        <p>Price $:</p>
                        <p data-testid="price" id="bookPrice">{specificBook.price}</p>
                    </div>
                    <div className="book-form__input">
                        <div>
                            <label htmlFor="bookCount">Count: </label>
                        </div>
                        <div className="book-count-section">
                            <Button data-testid="decrementButton" onClick={decrementCount} type="button">
                                <FaMinus className='minus' />
                            </Button>
                            <Input onChange={inputValidate} value={count} styleMod="small" id="bookCount" name="bookCount" />
                            <Button data-testid="incrementButton" onClick={incrementCount} type="button" styleMod="noborder">
                                <FaPlus className='plus' />
                            </Button>
                        </div>
                    </div>
                    <div className="price">
                        <p>Total price $:</p>
                        <p data-testid="totalPrice">{totalPrice}</p>
                    </div>
                    <div className='button-wrapper'>
                        <Button onClick={addToCart} styleMod="noborder" type="button" title="Add to cart" />
                    </div>
                </form>
            </div>
            <p>Description:</p>
            <p>{specificBook.description}</p>
        </section>
    )
}
