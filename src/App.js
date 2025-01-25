import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicRoute, AdminRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import FreeTrainingForm from './pages/FreeTrainingForm';
import Landing from './pages/Landing';
import FtCoaches from './pages/ftCoaches';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import CampusIndex from './pages/CampusIndex';
import CampusInfoIndex from './pages/CampusInfoIndex';
import MainCampusInfoIndex from './pages/MainCampusInfoIndex';
import { TrainingProvider } from './pages/TrainingContext';
import Navbar from './pages/Navbar';
import CoachProfile from './pages/extraPages/coach-profile';
import ForgetPassword from './pages/extraPages/forget-password';
import Profile from './pages/extraPages/profile';
import TryoutsTraining from './pages/extraPages/tryouts-training-student';
import TryoutSchedule from './pages/extraPages/tryout-schedule';
import PlayerInfoAdd from './pages/admin/PlayerInfoAdd';
import LandingAdmin from './pages/admin/LandingAdmin';
import Events from './pages/Events';
import AboutUsAdmin from './pages/admin/AboutUsAdmin';

const App = () => {
  return (
    <TrainingProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="page-container">
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/landing" replace />} />
              
              {/* Public Routes */}
              <Route
                path="/landing"
                element={
                  <PublicRoute>
                    <Landing />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PublicRoute>
                    <Profile />
                  </PublicRoute>
                }
              />
              <Route
                path="/tryouts-training-student"
                element={
                  <PublicRoute>
                    <TryoutsTraining />
                  </PublicRoute>
                }
              />
              <Route
                path="/tryout-schedule"
                element={
                  <PublicRoute>
                    <TryoutSchedule />
                  </PublicRoute>
                }
              />
              <Route
                path="/player-info-add"
                element={
                  <PublicRoute>
                    <PlayerInfoAdd />
                  </PublicRoute>
                }
              />
              <Route
                path="/landing-admin"
                element={
                  <PublicRoute>
                    <LandingAdmin />
                  </PublicRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <PublicRoute>
                    <Events />
                  </PublicRoute>
                }
              />
              <Route
                path="/aboutUsAdmin"
                element={
                  <PublicRoute>
                    <AboutUsAdmin />
                    </PublicRoute>
                }
              />
              {/* Protected Routes - Require Authentication */}
              <Route
                path="/contactUs"
                element={
                  <ProtectedRoute>
                    <ContactUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/aboutUs"
                element={
                  <ProtectedRoute>
                    <AboutUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campusIndex"
                element={
                  <ProtectedRoute>
                    <CampusIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campusInfoIndex"
                element={
                  <ProtectedRoute>
                    <CampusInfoIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mainCampusInfoIndex"
                element={
                  <ProtectedRoute>
                    <MainCampusInfoIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/free-training-form"
                element={
                  <ProtectedRoute>
                    <FreeTrainingForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coaches"
                element={
                  <ProtectedRoute>
                    <FtCoaches />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/training-tryout-admin"
                element={
                  <PublicRoute>
                  <TryoutsTrainingAdmin />
                  </PublicRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/coach-profile"
                element={
                  <AdminRoute>
                    <CoachProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/forget-password"
                element={
                  <AdminRoute>
                    <ForgetPassword />
                  </AdminRoute>
                }
              />

              {/* 404 - Catch-all */}
              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TrainingProvider>
  );
};

export default App
