import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { CustomButtonContainer } from '../custom-button/custom-button.styles';
import { auth,createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
import {SignUpContainer,TitleContainer} from  './sign-up.styles';

class Signup extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async (event) =>{
        event.preventDefault();

        const {displayName,email,password,confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("Password does'nt match");
            return;
        }

        try{
            /*Creates a new user account associated with the specified email address and password.
            On successful creation of the user account, this user will also be signed in to your 
            application. */
            
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            });
        }catch(error){
            console.log(error);
        }
    }

    handlechange = event => {
        const {name,value}  = event.target;
        this.setState({[name]:value});

    }
    render(){
        const {displayName,email,password,confirmPassword} = this.state;
        return(
            <SignUpContainer>
                <TitleContainer>I do not have a account</TitleContainer>
                <span>Sign up with your Email and password</span>
                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    
                    <FormInput type='text' name='displayName' 
                    value={displayName} onChange={this.handlechange}
                    label='Display Name' required/>

                    <FormInput type='email' name='email' 
                    value={email} onChange={this.handlechange}
                    label='Email' required/>

                    <FormInput type='password' name='password' 
                    value={password} onChange={this.handlechange}
                    label='Password' required/>

                    <FormInput type='password' name='confirmPassword' 
                    value={confirmPassword} onChange={this.handlechange}
                    label='Confirm Password' required/>

                    <CustomButtonContainer type='submit'>SIGN UP</CustomButtonContainer>
                </form>
            </SignUpContainer>
        )
    }
}

export default Signup;