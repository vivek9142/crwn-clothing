import React from 'react';

// import './signin-signup-page.styles.scss';
import {SignInSignUpContainer} from './signin-signup-page.styles';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInSignUpPage = () =>(
    <SignInSignUpContainer>
        <SignIn/>
        <SignUp/>
    </SignInSignUpContainer>
)

export default SignInSignUpPage;