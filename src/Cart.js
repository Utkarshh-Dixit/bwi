import React from 'react';
import './Cart.css';

function Cart({ cart , removeFromCart}) {
    console.log(cart); // Log the cart state
    return (
        <div className='cart-container'>
            <h2>Cart</h2>
            <div className="cart-items">
                {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <h3 className='item-name'>{item.title}</h3>
                        <p className='item-price'>Price: ${item.price}</p>
                        <p className='item-details'>Description: {item.description}</p>
                        <img className='item-img' src={item.images[0]} alt={item.title} />
                        <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
