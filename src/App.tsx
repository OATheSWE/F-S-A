import Navbar from "./components/Navbar/Navbar";
import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import AppRoutes from "./routes/AppRoutes.tsx";
import { BrowserRouter as Router } from 'react-router-dom';





function App() {


  return (
    <div className="body">
      <Router >
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App
