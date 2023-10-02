import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutePage from "./router/route";

function App() {
  return (
    <div className="App">
      <RoutePage />
      <ToastContainer />
    </div>
  );
}

export default App;
