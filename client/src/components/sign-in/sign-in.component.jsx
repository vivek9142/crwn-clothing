import React,{useState} from 'react';

// import './sign-in.styles.scss';
import {SignInContainer,TitleContainer,ButtonContainer} from './sign-in.styles';
import {CustomButtonContainer} from '../custom-button/custom-button.styles';
import {connect} from 'react-redux';
import FormInput from './../form-input/form-input.component';
// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';
const SignIn = ({emailSignInStart,googleSignInStart}) => {
    const [userCredentials,setCredentials] = useState({email:'',password:''});

    const {email,password} = userCredentials;

    const handleSubmit = async event =>{
            event.preventDefault();
            emailSignInStart(email,password);
    }
    const handleChange = event =>{
        const {value,name } =event.target;

        setCredentials({...userCredentials,[name]:value});
    }
    
    return (
            <SignInContainer>
                <TitleContainer>I already have an account</TitleContainer>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput type="email" name="email" 
                    handleChange={handleChange} value={email} 
                    label="email" required/>

                    <FormInput type="password" name="password"
                    handleChange={handleChange} value={password} 
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
const mapDispatchtoProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart:(email,password) => 
        dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchtoProps)(SignIn);