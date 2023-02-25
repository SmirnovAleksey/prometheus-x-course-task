import './cart-item.css';
import { FcImageFile } from 'react-icons/fc';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BooksContext } from '../../contexts/BooksContext';
import { CartContext } from '../../contexts/CartContext'

export const CartItem = ({ item }) => {

    const navigate = useNavigate();
    const { response } = useContext(BooksContext);
    const { cartItem, setCartItem } = useContext(CartContext);

    const redirect = () => {
        response.books.filter(e => e.id === item.id).forEach(e => {
            localStorage.setItem('book', JSON.stringify(e))
            navigate(`/specific-book/${e.id}`);
        })
    }

    const removeItem = () => {
        const goods = cartItem.filter(e => e.id !== item.id);
        localStorage.setItem('goods', JSON.stringify(goods));
        setCartItem(goods)
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
            <AiOutlineDelete onClick={removeItem} className='delete-button' />
        </div>
    )
}
