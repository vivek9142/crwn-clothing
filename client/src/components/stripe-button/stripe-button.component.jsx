import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JgltgSHZw8fM5a5N3CSQB9kdQ3P54uiLFHmfQZhjopzsIhKnal1bY2sTaUVlbKiAk0aR50frCCXG3VSKMoAQulr00OnpRZUXv';

    const onToken = token => {
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token
            }
        }).then(response => {
            alert('payment successful');
        }).catch(error => {
            console.log('Payment Error: ',JSON.stringify(error));
            alert('There was an issue with your payment.Please make sure you use the provided credit card details');
        });
    }
    return (
        <StripeCheckout
         label='Pay Now'
         name='CRWN Clothing Ltd.'
         billingAddress
         shippingAddress
         image='https://svgshare.com/i/CUz.svg'
         amount={priceForStripe}
         panelLabel = 'Pay Now'
         token = {onToken}
         stripeKey={publishableKey}
         />
    );
}

export default StripeCheckoutButton;