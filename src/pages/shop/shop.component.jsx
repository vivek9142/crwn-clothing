import React from 'react';
import { connect } from 'react-redux';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {Route} from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'; 
import CollectionPage from '../collection/collection.component';

import {updateCollections} from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state = {
        loading:true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        //this style is much of a observable pattern where the api is waiting for event 
        //changing this to promise

        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //    const collectionMap =   convertCollectionsSnapshotToMap(snapshot);
        //    updateCollections(collectionMap);

        collectionRef.get().then(snapshot => {
            const collectionMap =   convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);

           this.setState({loading:false});
        });

        //using fetch api for api url endpoint 
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-559/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections));
    }
    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props)=> <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
    }
    
}

const mapDispatchToProps = dispatch => ({
    updateCollections:collectionMap => dispatch(updateCollections(collectionMap))
});
export default connect(null,mapDispatchToProps)(ShopPage);