import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import collectionComponent from "./collection.component";

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(collectionComponent);

export default CollectionPageContainer;