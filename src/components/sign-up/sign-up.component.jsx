import React,{useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { CustomButtonContainer } from '../custom-button/custom-button.styles';
import {connect} from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';
import {SignUpContainer,TitleContainer} from  './sign-up.styles';

const Signup = ({signUpStart}) =>{
    const [userCredentials,setUserCredentials] = useState({
        displayName:''
        ,email:''
        ,password:''
        ,confirmPassword:''
    });

    const {displayName,email,password,confirmPassword} = userCredentials;

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Password does'nt match");
            return;
        }

        signUpStart({displayName,email,password})
    }

    const handlechange = event => {
        const {name,value}  = event.target;
        setUserCredentials({...userCredentials,[name]:value});

    }
    return(
            <SignUpContainer>
                <TitleContainer>I do not have a account</TitleContainer>
                <span>Sign up with your Email and password</span>
                <form onSubmit={handleSubmit} className="sign-up-form">
                    
                    <FormInput type='text' name='displayName' 
                    value={displayName} onChange={handlechange}
                    label='Display Name' required/>

                    <FormInput type='email' name='email' 
                    value={email} onChange={handlechange}
                    label='Email' required/>

                    <FormInput type='password' name='password' 
                    value={password} onChange={handlechange}
                    label='Password' required/>

                    <FormInput type='password' name='confirmPassword' 
                    value={confirmPassword} onChange={handlechange}
                    label='Confirm Password' required/>

                    <CustomButtonContainer type='submit'>SIGN UP</CustomButtonContainer>
                </form>
            </SignUpContainer>
        )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(Signup);