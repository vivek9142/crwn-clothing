import React from "react";

import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

// import './cart-icon.styles.scss';
import {CartIconContainer,ShoppingIconContainer,ItemCountContainer} from './cart-icon.styles';

import { connect} from "react-redux";
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({toggleCartHidden,itemCount}) => (
    <CartIconContainer onClick={toggleCartHidden}> 
        <ShoppingIconContainer/>
        <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
);
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);