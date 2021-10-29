import React,{useEffect,lazy,Suspense} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';

import {selectCurrentUser} from './redux/user/user.selector';
import {checkUserSession} from './redux/user/user.actions';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import GlobalStyle from './global.styles';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInSignUpPage = lazy(() => import('./pages/signin-signup-page/signin-signup-page.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

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
        
        <GlobalStyle/>
        <Header />
        <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
            <Route exact path='/' component={HomePage}/>
            
            <Route path='/shop' component={ShopPage}/>
            <Route exact path='/signin' 
            render={() => currentUser ? (<Redirect to='/'/>) : (<SignInSignUpPage/>)}/>
            <Route exact path='/checkout' component={CheckoutPage}/>
          </Suspense>
          </ErrorBoundary>
        </Switch>
        
      </div>
    );
}


export default App;

