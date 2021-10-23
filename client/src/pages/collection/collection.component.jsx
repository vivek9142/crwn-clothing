import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectCollection} from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import {CollectionPageContainer,TitleContainer,ItemsContainer} from './collection.styles';

const CollectionPage = () => {
    const params = useParams();
    const collection = useSelector(selectCollection(params.collectionId));
    const {title,items} = collection;
    return(
        <CollectionPageContainer>
            <TitleContainer>{title}</TitleContainer>
            <ItemsContainer>
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </ItemsContainer>
        </CollectionPageContainer>
    )
}

export default CollectionPage;