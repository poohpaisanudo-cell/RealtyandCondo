import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PropertyDetail from "../pages/PropertyDetail";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Listing from "../pages/Listing";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateListing from "../pages/CreateListing";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listing />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
