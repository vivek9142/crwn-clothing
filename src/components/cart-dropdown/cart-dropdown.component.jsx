/* eslint-disable no-restricted-globals */
import React from 'react';
import {connect} from 'react-redux';
import CustomButton from '../custom-button/custom-button.component'; 
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

const Cart = ({cartItems,history,dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {   
                cartItems.length ? (
                cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem}/>)))
                : (
                    <span className="empty-message">Your Cart is empty</span>
                )
            }
        </div>
        <CustomButton onClick={()=> {
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}>Go To Checkout</CustomButton>
    </div>
)
const mapStateToProps = createStructuredSelector({
    cartItems:selectCartItems
})
/*if we don't supply mapDispatchToprops as the second parameter to connect
 will pass the dispatch into our dropdown component as a prop.*/
export default withRouter(connect(mapStateToProps)(Cart));