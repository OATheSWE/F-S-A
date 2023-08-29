/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "./components/Navbar/Navbar";
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext"






function App() {


  return (
    <div className="body">
      <AuthProvider>
        <BrowserRouter >
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
