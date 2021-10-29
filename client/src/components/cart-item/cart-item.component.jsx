import React from "react";

// import './cart-item.styles.scss';
import {CartItemContainer,CartImgContainer,ItemDetailsContainer} from './cart-item.styles';

const CartItem = ({item:{imageUrl, price,name,quantity}}) => (
    <CartItemContainer>
        <CartImgContainer src={imageUrl} alt="item" />
        <ItemDetailsContainer>
            <span className="name">{name}</span>
            <span className="price">{quantity} X ${price}</span>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export default React.memo(CartItem);