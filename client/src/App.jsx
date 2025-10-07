import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import VisitorManagement from "./pages/VisitorManagement";
import Maintenance from "./pages/Maintenance";
import Documents from "./pages/Documents";
import AdminPortal from "./pages/AdminPortal";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/authContext";
import Layout from "./pages/Layout";
import Resident from "../src/pages/Resident";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/visitor-management"
            element={
              <ProtectedRoute>
                <Layout>
                  <VisitorManagement />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/maintenance"
            element={
              <ProtectedRoute>
                <Layout>
                  <Maintenance />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Layout>
                  <Documents />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-portal"
            element={
              <ProtectedRoute>
                <Layout>
                  <AdminPortal />
                </Layout>
              </ProtectedRoute>
            }
          />

           <Route
            path="/residents"
            element={
              <ProtectedRoute>
                <Layout>
                  <Resident/>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
