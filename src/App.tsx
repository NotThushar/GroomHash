import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StationsPage from './pages/StationsPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import StationDashboard from './pages/StationDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { StationProvider } from './contexts/StationContext';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        <Route path="/stations" element={<StationsPage />} />
        <Route path="/book/:stationId" element={user ? <BookingPage /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/station-dashboard" element={user?.role === 'owner' ? <StationDashboard /> : <Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <StationProvider>
          <BookingProvider>
            <AppContent />
          </BookingProvider>
        </StationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;