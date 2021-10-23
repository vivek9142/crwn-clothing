/* eslint-disable no-restricted-globals */
import React from 'react';
import {useSelector,useDispatch} from 'react-redux';

import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
//useParams gives access to params inside the url,
//useHistory give access to history object in reac-router
import {useHistory} from 'react-router-dom';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

import {CartDropdownContainer,CartItemsContainer,EmptyMessageContainer} from './cart-dropdown.styles';
import {CustomButtonContainer} from '../custom-button/custom-button.styles';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();
    return(
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
}

export default CartDropdown;