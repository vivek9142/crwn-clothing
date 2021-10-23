import React from 'react';

import './form-input.styles.scss';
import {GroupContainer,FormInputContainer,FormLabelContainer} from './form-input.styles';

const FormInput = ({handleChange,label, ...otherProps}) =>(
    <GroupContainer>
        <FormInputContainer type="text" onChange={handleChange} {...otherProps}/>
        {label ? (
            <FormLabelContainer className={otherProps.value.length ? 'shrink' : ''}>
                {label}
            </FormLabelContainer>
    ) : null}
    </GroupContainer>
)

export default FormInput;