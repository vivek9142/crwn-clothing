import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

// import './collections-overview.styles.scss';
import {CollectionOverviewComponent} from './collection-overview.styles';

const CollectionOverview = ({collections}) => (
    <CollectionOverviewComponent>
        {collections.map(({id, ...otherCollectionProps }) =>(
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </CollectionOverviewComponent>
);

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview);