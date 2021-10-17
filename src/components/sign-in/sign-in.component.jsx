import React from 'react';

// import './sign-in.styles.scss';
import {SignInContainer,TitleContainer,ButtonContainer} from './sign-in.styles';
import {CustomButtonContainer} from '../custom-button/custom-button.styles';
import {connect} from 'react-redux';
import FormInput from './../form-input/form-input.component';
// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';
class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const {emailSignInStart} = this.props;
        const {email,password} = this.state;

        emailSignInStart(email,password);

        // try{
        //     //method for signin in firebase auth module 
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({email:'',password:''});
        // }catch(err){
        //     console.log(err);
        // }
        
    }
    handleChange = event =>{
        const {value,name } =event.target;

        this.setState({[name]:value});
    }
    
    render(){
        
        const {googleSignInStart} = this.props;

        return (
            <SignInContainer>
                <TitleContainer>I already have an account</TitleContainer>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" 
                    handleChange={this.handleChange} value={this.state.email} 
                    label="email" required/>

                    <FormInput type="password" name="password"
                    handleChange={this.handleChange} value={this.state.password} 
                    label="password" required/>

                    <ButtonContainer>
                        <CustomButtonContainer type="submit" value="Submit Form">
                            SIGN IN
                        </CustomButtonContainer>
                        <CustomButtonContainer type='button' onClick={googleSignInStart} isGoogleSignIn>
                            Sign in with Google
                        </CustomButtonContainer>
                    </ButtonContainer>
                </form>
            </SignInContainer>
        )
    }
}
const mapDispatchtoProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart:(email,password) => 
        dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchtoProps)(SignIn);