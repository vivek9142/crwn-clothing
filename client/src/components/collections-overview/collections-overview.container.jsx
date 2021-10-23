import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';    
import {compose} from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionFetching
});

//this is hard to read,follow n understand the logic so here  we'll use compose func from redux
// const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview))

//compose func - lets us pass these in by just callign the func. Its essentially covering all our
//functions together.it takes values from right to left. so it takes comp then attach
//withSpinner HOC to it then attach connect func to result. it is equivalent to previous one.
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;