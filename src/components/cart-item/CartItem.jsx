import './cart-item.css';
import { FcImageFile } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { BooksContext } from '../../contexts/BooksContext';

export const CartItem = ({ item }) => {

    const navigate = useNavigate()
    const { response } = useContext(BooksContext)

    const redirect = () => {
        response.books.filter(e => e.id === item.id).forEach(e => {
            localStorage.setItem('book', JSON.stringify(e))
            navigate(`/specific-book/${e.title.split('').filter(e => e !== ' ').join('')}`);
        })
    }

    return (
        <div className='single-good'>
            <div className='image-wrapper'>
                {
                    item.img ?
                        <img src={item.img} alt={item.title} className="cart-img" /> :
                        <FcImageFile className="cart-img" style={{ border: '1px solid #dddada' }} />
                }
            </div>
            <div className='item-info'>
                <div className='item-title'>
                    <span onClick={redirect}>{item.title}</span>
                </div>
                <span>{item.quantity}</span>
                <span>{item.cost}</span>

            </div>
        </div>
    )
}
