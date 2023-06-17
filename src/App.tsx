import Navbar from "./components/Navbar/Navbar";
import Report from "./pages/Report/report.tsx"
import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import PopupRecorder from './pages/Report/Record Report/Popup Recorder.tsx';
import LogIn from "./pages/Log In/Log In.tsx";
import SignUp from "./pages/Sign Up/Sign Up.tsx";
import SubmitReport from "./pages/Submit Report/Submit Report.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import Students from "./pages/Students/Students.tsx";
import NewStudents from "./pages/Students/New Students/New Students.tsx";
import Footer from "./components/Footer/Footer.tsx";




function App() {


  return (
    <div className="body">
      <Navbar />
      <Report />
      <PopupRecorder />
      <LogIn />
      <SignUp />
      <SubmitReport />
      <Settings />
      <Students />
      <NewStudents />
      <Footer />
    </div>
  )
}

export default App