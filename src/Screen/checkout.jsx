import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from 'react-cookie';
import axios from 'axios'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51J3QXsSCDnKXYlv7gYeIjus0PVwQ1B0zPuwEPjCmBlNQe7hGWt8twJG2ze8txSG6NTrbbBHXj6Qp0dvfIwk4h0uf00w0Cq2tJD");

const ProductDisplay = ({ handleClick }) => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button type="button" id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
    <p>bkpp</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");
  const [cookies,setCookie] = useCookies(['user']);
   console.log('a')
  useEffect(() => {
  console.log('d')
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      console.log('b')
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
      console.log('c')
    }
  }, []);

  const handleClick = async (event) => {
      console.log('bkp')
      var bodyFormData=new FormData();
	  bodyFormData.append('access_token',cookies.user.access_token)
    const stripe = await stripePromise;

    // const response = await axios('http://127.0.0.1:8000/payment/create-checkout-session', {
    //         method: "POST",
          // });

    const response = await fetch("http://127.0.0.1:8000/payment/create-checkout-session", {
        method: "POST",
        body:bodyFormData
      });

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

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}
