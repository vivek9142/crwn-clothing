import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

//connect is a higher order component that lets us modify 
//our component to have access to things related to Redox.
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({currentUser,hidden}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/shop">
                CONTACT
            </Link>
            {
                currentUser ?
                // for signing out 
                <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        { hidden ? null :
            <CartDropdown/>
        }
    </div>
)
// we'll do with connect is we are actually going to pass it to functions,
// the second one being optional, and then that'll give us back another
// higher component that we pass.It are better.

// Now, what is it that we pass as the first argument of Connect, 
// it's going to be the function that allows us to access the states with
// the state being our reducer, our route reducer, to be specific, 
// we know that with a route reducer, it is an object that has a property 
// of user that points to our user reducer, which right now is just
// this initial state because we haven't triggered any actions
// that update the value of current user.
//So we know that we will end up getting current user of null.

//But we want that value.So how do we get it?Well, we're going to 
//right that map state to props function and it's going to be equal 
//to a function.And what we're going to return from that function will
//be an object where the value or site where the name of the property 
//will be the actual property want to pass in and then the value will 
//be the value.So what do we get in this function?Is the state object.
//This state is the root reducer.So the top level root reducer.

//And we want to pass in a current user property where the value 
//of it will be St. John's user,  current user.

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) =>({
    currentUser,hidden
});

export default connect(mapStateToProps)(Header);