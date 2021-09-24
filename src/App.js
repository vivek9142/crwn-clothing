import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import  HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/signin-signup-page/signin-signup-page.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    //onAuthStateChanged method on auth object of firebase ,here param is user which is logged in
    // onAuthStateChanged returns a method for unsubscription to firebase obj for any subsequent memory leaks
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // createUserProfileDocument(userAuth);
      // this.setState({currentUser:user});

      // console.log(user);

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        //the moment createUserProfileDocument instantiate, it will send us the snapshot obj
        //representing the data stored in db and that method is onSnapshot
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            setCurrentUser:({
              id:snapShot.id,
              // this will send out the proper user data. 
              //unlike the logging snapshot will give meta info about the data but not 
              //actual data
              ...snapShot.data()
            })
          });

        });

      } else {
        setCurrentUser(userAuth);
      }
    });
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

//takes dispatch and return an obj where propname will be whatever 
//prop we want to pass in that dispatches the new action that 
//we're trying to pass, which is current user.
const mapDispatchToProps = dispatch=>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//Now, the first argument is map states are props, but our app 
// doesn't actually need current user anymore because outside of
// passing it into a header, it only sets it, but it doesn't do
// anything with the current user value in its component itself.
// So what we can do is pass in null as the first argument, because
// we don't need any state.So props from our producer.

export default connect(mapStateToProps,mapDispatchToProps)(App);

