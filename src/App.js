import "./App.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { requests } from "./api/service";

import RoutePage from "./router/route";


function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

   useEffect(() => {
     requests.stripeConfig().then(async (res) => {
       setStripePromise(loadStripe(res.publishableKey));
     });
   }, []);

   useEffect(() => {
     requests.createPaymentStripe().then(async (res) => {
       if (res.message === "ok") {
         setClientSecret(res.data.clientSecret);
       }
     });
   }, []);
  
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <RoutePage />
          </Elements>
        )}
          <ToastContainer />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
