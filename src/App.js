import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import  HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/signin-signup-page/signin-signup-page.component';
import CheckoutPage from './pages/checkout/checkout.component';

import React from 'react';
import { connect } from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import {checkUserSession} from './redux/user/user.actions';


class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    //closing the firebase subscription
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header />
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/signin' 
        render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInSignUpPage/>)}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
}
//just like we did earlier with our other component, we're going 
//to connect our app to the outcome of our initial connect call using.
//The second argument of Kinect, which is map dispatched the props.

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);

