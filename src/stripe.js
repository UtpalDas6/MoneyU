import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import Button from 'react-bootstrap/Button';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HR0MmKadpvfgLldFM58pvhZ5IllW8XrOpzhzg7asAOGlqVehLvYL2MORVcbZmEeFdaS3RZndhnQOy4IcfZ5k8c200CY0aJuja');

export default function Pay(props) {
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('http://127.0.0.1:5000/create-checkout-session/'+props.item+'/'+props.amount, { method: 'POST' });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <Button variant='outline-primary' onClick={handleClick}>
      Pay
    </Button>
  );
}