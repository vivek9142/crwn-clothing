import {createStore , applyMiddleware} from 'redux';

import logger from 'redux-logger';
//logger middleware catches the action ,logs it out and moves it along 

import rootReducer from './root-reducer';
//set up the middleware so the store is 
//expecting from redux is going to be an array
//we make it an array and inside is our logger middleware
const middlewares = [logger];

//createStore create the store n it expects both
// root reducer and return value of applymiddleware
// n inside this we r going to spread in our middlewares
//like this we can put different middlewares in createStore 
// we did it this way coz in the future we miht want to modify 
//this array above base on certain conditions

const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store;