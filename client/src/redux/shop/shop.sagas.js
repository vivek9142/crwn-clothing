//takeEvery listens to every actions of a specific type
// we pass to it
import {takeLatest,call,put,all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess,fetchCollectionsFailure } from './shop.actions';

/*we have a sceneario where we have multi sagas listening for diff actions .
we want our code not to be waiting for each other func to finish since we're making
async request .So TakeEvery which is saga effect creates a non blocking call in order to
not stop our app to continue running either other sagas or whatever user wants to do

Alternatively we're also actually able to cancel tasks that r coming out of our func fetchCollectionsAsync
n by task ,we kickstart this saga, its actually a task that our saga middleware is
running in the background of our code to perform the action that it's supposed to do.
*/
export function* fetchCollectionsAsync(){
    try{
        
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();

    /*what's call does is that call is the code, call is the effect 
    inside of our generator function that invokes the method 
    
    the call syntax is is it's a method that takes as its first argument, 
    some function or method.And then the subsequent arguments will be
    the parameters that you passed into this function call, and because 
    we're yielding this call, it allows, again, us to defer control at 
    this point of the execution back to the saga middleware.*/
    const collectionMap = yield call(convertCollectionsSnapshotToMap , snapshot);
    
    /* put Is the saga effect for creating action.
    The only difference is we have to yield it and we're just 
    going to use it like a dispatch.we pass func for success n 
    pass in our collections map. Because, again, put just puts 
    out or dispatches out an object, right, that it's expecting to have
    a type and a payload.*/

    yield put(fetchCollectionsSuccess(collectionMap));
    }catch(err){
        yield  put(fetchCollectionsFailure(err.message));
    }

}

/*If we look at our Saga code, our collections collection action came 
in our saga that collections start was listening for this action
the moment it hurt it, if fired off our collections async generator function
and then ah, I am fired, got logged.
*/

//a generator function which yields (or returns specific o/p). 
//this is the syntax for it uses prexisting func syntax n * to showcase that 
//its a generator function.all generator func must have yields in them
export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        );
}

export function* shopSagas(){
    yield all([
        call(fetchCollectionsStart)
    ])
}