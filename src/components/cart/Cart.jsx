import './cart.css';
import { Button } from '../button/Button';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { CartItem } from '../cart-item/CartItem';

export const Cart = () => {

    const [disabled, setDisabled] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false)
    const { cartItem, setCartItem } = useContext(CartContext);

    const totalPrice = cartItem.map(item => item.quantity * item.cost)
        .reduce((acc, curr) => acc + curr, 0).toFixed(2)

    const clearCart = () => {
        localStorage.setItem('goods', JSON.stringify([]));
        setCartItem([]);
        setIsPurchase(true);
    }

    useEffect(() => {
        const goods = JSON.parse(localStorage.getItem('goods')) || [];
        if (goods) {
            setCartItem(goods)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!cartItem.length) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [cartItem])

    return (
        <section className='cart-section'>

            <div className='goods-container'>
                <div className='goods-header'>
                    <div className='goods-description'>
                        <p>Title</p>
                        <p>Count</p>
                        <p>Price</p>
                    </div>
                </div>
                <div className='goods-body'>
                    {
                        cartItem.length ?
                            (
                                cartItem.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                    />
                                ))
                            ) : isPurchase ?

                                (
                                    <div className='success-purchase'>
                                        <div className='success-purchase-img'></div>
                                        <h1>Good choice</h1>
                                        <p>We are waiting for you again :)</p>
                                    </div>
                                ) : (
                                    <div className='cart-section-empty'>
                                        <div className='empty-cart-img'></div>
                                        <h1>Your cart is empty</h1>
                                        <p>But it's never too late to fix it :)</p>
                                    </div>
                                )
                    }
                </div>

                <div className='goods-footer'>
                    <div className='goods-footer-content'>
                        {
                            cartItem.length > 0 &&
                            <span className='total-price'>Total price: ${totalPrice}</span>
                        }
                        <Button onClick={clearCart} disabled={disabled} title='Purchase' />
                    </div>
                </div>
            </div>
        </section>
    )
}
