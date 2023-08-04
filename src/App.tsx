import Navbar from "./components/Navbar/Navbar";
import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import AppRoutes from "./routes/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";






function App() {


  return (
    <div className="body">
      <BrowserRouter >
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
