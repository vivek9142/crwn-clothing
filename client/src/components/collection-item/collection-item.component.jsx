import React from 'react';

// import './collection-item.styles.scss';
import {ImgContainer,CollectionItemContainer,CollectionFooterContainer} from './collection-item.styles';

import  CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';

const CollectionItem = ({item,addItem}) =>{
    const {name,price,imageUrl}= item;
    return (
        <CollectionItemContainer>
        <ImgContainer 
        style={{backgroundImage:`url(${imageUrl})`}}/>
        
        <CollectionFooterContainer>
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </CollectionFooterContainer>
        
        <CustomButton onClick = {()=> addItem(item)} inverted>Add to cart</CustomButton>
    </CollectionItemContainer>
    )
};
const mapDispatchToProps = dispatch => ({
    addItem:item => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CollectionItem);