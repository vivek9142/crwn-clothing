import React from 'react';
import {connect} from 'react-redux';
import {clearItemFromCart,addItem,removeItem} from '../../redux/cart/cart.actions';

// import './checkout-item.styles.scss';
import {CheckoutItemContainer,ImgContainer,CheckoutItemSubItem,QuantityContainer,RemoveItemContainer} from './checkout-item.styled';

const CheckoutItem = ({cartItem,clearItem,addItem,removeItem}) => {

    const {name,imageUrl,price,quantity} = cartItem;
    return (
        <CheckoutItemContainer>
            <ImgContainer>
                <img src={imageUrl} alt="item" />
            </ImgContainer>
            <CheckoutItemSubItem>{name}</CheckoutItemSubItem>
            <QuantityContainer>
                <div className="arrow" onClick={()=> removeItem(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={()=> addItem(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <CheckoutItemSubItem>{price}</CheckoutItemSubItem>
            <RemoveItemContainer onClick={()=> clearItem(cartItem)}>&#10005;</RemoveItemContainer>
    
        </CheckoutItemContainer>
    )
}
const mapDispatchToProps = dispatch => ({
    clearItem:item => dispatch(clearItemFromCart(item)),
    addItem:item => dispatch(addItem(item)),
    removeItem: item=> dispatch(removeItem(item))
})
export default connect(null,mapDispatchToProps)(CheckoutItem);