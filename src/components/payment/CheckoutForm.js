import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({message}) => {

  return (
    <form id="payment-form">
      <PaymentElement id="payment-element" />
      {/* <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button> */}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
