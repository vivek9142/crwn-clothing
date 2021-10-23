import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import  HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/signin-signup-page/signin-signup-page.component';
import CheckoutPage from './pages/checkout/checkout.component';

import React,{useEffect} from 'react';
import {selectCurrentUser} from './redux/user/user.selector';
import {checkUserSession} from './redux/user/user.actions';


const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUserSession());
  },[dispatch]);
    //this dispatch dependency will not update since the compiler will take the previously 
    //defined dispatch func on re-render since it was defined before.it will run 
    //only 1 time once it mounts

    return (
      <div>
        <Header />
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/signin' 
        render={() => currentUser ? (<Redirect to='/'/>) : (<SignInSignUpPage/>)}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
}


export default App;

