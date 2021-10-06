/* eslint-disable no-restricted-globals */
import React from 'react';
import {connect} from 'react-redux';

import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

// import './cart-dropdown.styles.scss';
import {CartDropdownContainer,CartItemsContainer,EmptyMessageContainer} from './cart-dropdown.styles';
import {CustomButtonContainer} from '../custom-button/custom-button.styles';

const Cart = ({cartItems,history,dispatch}) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {   
                cartItems.length ? (
                cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem}/>)))
                : (
                    <EmptyMessageContainer>Your Cart is empty</EmptyMessageContainer>
                )
            }
        </CartItemsContainer>
        <CustomButtonContainer onClick={()=> {
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}>Go To Checkout</CustomButtonContainer>
    </CartDropdownContainer>
)
const mapStateToProps = createStructuredSelector({
    cartItems:selectCartItems
})
/*if we don't supply mapDispatchToprops as the second parameter to connect
 will pass the dispatch into our dropdown component as a prop.*/
export default withRouter(connect(mapStateToProps)(Cart));