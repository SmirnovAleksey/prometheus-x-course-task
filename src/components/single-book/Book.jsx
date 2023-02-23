import './book.css'
import { Button } from '../button/Button';
import { FcImageFile } from 'react-icons/fc';
import { Transition } from 'react-transition-group';
import { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const duration = 500;

const defaultStyle = {
    transition: `all ${duration}ms`,
    opacity: 0,
    transform: 'scale(0.9)'
}

const transitionStyles = {
    entering: { opacity: 1, transform: 'scale(1)' },
    entered: { opacity: 1, transform: 'scale(1)' },
    exiting: { opacity: 0, transform: 'scale(0.9)' },
    exited: { opacity: 0, transform: 'scale(0.9)' },
};

export const Book = ({ book }) => {

    const [transition, setTransition] = useState(false);
    const navigate = useNavigate();
    const nodeRef = useRef(null);

    useEffect(() => {
        setTransition(true);
    }, [transition]);

    const redirect = () => {
        localStorage.setItem('book', JSON.stringify(book))
        navigate(`/specific-book/${book.id}`);
    }

    return (
        <Transition nodeRef={nodeRef} in={transition} timeout={duration}>
            {state => (
                <div
                    className="single-book"
                    ref={nodeRef} style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                    <div className="image-wrapper">
                        {
                            book.image ?
                                <img className="book-img"
                                    src={book.image}
                                    alt={book.title} /> :
                                <FcImageFile className="book-img" />
                        }

                        <p className="book-title">{book.title}</p>
                        <p className="book-author">Author: {book.author}</p>
                    </div>
                    <div className="wrapper">
                        <p className="book-price">{book.price}</p>
                        <Button onClick={redirect} title="View" />
                    </div>
                </div>
            )}
        </Transition>
    )
}