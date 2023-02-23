import './header.css';
import { Button } from '../button/Button';
import { FiShoppingCart } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

export const Header = () => {

    const { cartItem } = useContext(CartContext);
    const navigate = useNavigate();

    const signOut = () => {
        navigate('/sign-in')
        localStorage.removeItem('user')
    }

    const CurrentUser = localStorage.getItem('user')
    const user = JSON.parse(CurrentUser)

    return (
        <header>


            {user?.isAuthorized ?
                (
                    <>
                        <div className='logo-wrapper'>
                            <Link to='/'>JS BAND STORE</Link>
                            <div className='user-name'>/ Smirnov Oleksii</div>
                        </div>

                        <div className='menu-wrapper'>
                            <div className='user-wrapper'>
                                <div className='shop-basket'>
                                    <Link to='cart'>
                                        <FiShoppingCart className='shopping-cart' />
                                    </Link>
                                    {
                                        cartItem.length ?
                                            (
                                                <div className='cart-badge'>
                                                    <span>{cartItem.length}</span>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                    }

                                </div>
                                <Button onClick={signOut} title="Sign out" />
                            </div>

                            <div className='user-logo-wrapper'>
                                <div className='user-logo'>
                                    <FaUser className='user' />
                                </div>
                                <p>{user?.userName}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='logo-wrapper'>
                        <Link to='sign-in'>JS BAND STORE</Link>
                        <div className='user-name'>/ Smirnov Oleksii</div>
                    </div>
                )
            }

        </header>
    )
} 