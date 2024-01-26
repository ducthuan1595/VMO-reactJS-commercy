import "./App.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import RoutePage from "./router/route";

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        <RoutePage />
        <ToastContainer />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
