import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import FreeTrainingForm from './pages/FreeTrainingForm';
import Landing from './pages/Landing'; // Import the Landing component
import FtCoaches from './pages/ftCoaches';
import ContactUs from './pages/ContactUs';
import { TrainingProvider } from './pages/TrainingContext';

const App = () => {
  return (
    <TrainingProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<Landing />} /> {/* Define the route for Landing */}
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/free-training-form" element={<FreeTrainingForm />} />
        <Route path="/coaches" element={<FtCoaches />} />
      </Routes>
    </Router>
    </TrainingProvider>
  );
};

export default App;
