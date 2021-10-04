import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JgltgSHZw8fM5a5N3CSQB9kdQ3P54uiLFHmfQZhjopzsIhKnal1bY2sTaUVlbKiAk0aR50frCCXG3VSKMoAQulr00OnpRZUXv';

    const onToken = token => {
        console.log(token);
        alert('Payment Successfull');
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