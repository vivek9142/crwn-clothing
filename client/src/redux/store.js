import {createStore , applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';

//removing thunk using saga in place of thunk-we're replacing thunk with saga to
//handle async actions
// import thunk from 'redux-thunk'; 
import logger from 'redux-logger';
//logger middleware catches the action ,logs it out and moves it along 

import createSagaMiddleware from 'redux-saga';
import {fetchCollectionsStart } from './shop/shop.sagas';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
//saga middleware whole purpose is to run all saga concurrently i.e, runs them
//all together in a way that doesn't block the execution. 

const sagaMiddleware = createSagaMiddleware();

//set up the middleware so the store is 
//expecting from redux is going to be an array
//we make it an array and inside is our logger middleware
const middlewares = [sagaMiddleware];


if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

//createStore create the store n it expects both
// root reducer and return value of applymiddleware
// n inside this we r going to spread in our middlewares
//like this we can put different middlewares in createStore 
// we did it this way coz in the future we miht want to modify 
//this array above base on certain conditions

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

//creating a new persisting version of our store
export const persistor = persistStore(store);

export default {store,persistor};