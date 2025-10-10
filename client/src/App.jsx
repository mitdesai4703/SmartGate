import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppContextProvider, useAppContext } from "./context/AppContext";

import UserNavbar from "./components/User/UserNavbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserMaintenance from "./pages/User/UserMaintenance";
import UserDocuments from "./pages/User/UserDocuments";
import AdminLogin from "./pages/AdminLogin";

import AdminDashboard from "./pages/AdminDashboard";
import VisitorManagement from "./pages/VisitorManagement";
import Maintenance from "./pages/Maintenance";
import Documents from "./pages/Documents";
import AdminPortal from "./pages/AdminPortal";
import Resident from "./pages/Resident";
import AdminLayout from "./pages/Layout";

function AppWrapper() {
  const location = useLocation();
  const isHiddenLayoutPath = ["/admin", "/login"].some((path) =>
    location.pathname.startsWith(path)
  );

  const { isAdmin,loading } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 w-screen overflow-x-hidden">
      {!isHiddenLayoutPath && <UserNavbar />}

      <Toaster />

      <div
        className={`w-full ${
          !["/admin", "/login"].some((path) =>
            location.pathname.startsWith(path)
          )
            ? "pt-20"
            : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-maintenance" element={<UserMaintenance />} />
          <Route path="/user-documents" element={<UserDocuments />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          const { isAdmin, loading } = useAppContext();

<Route
  path="/admin/*"
  element={
    loading ? (
      <div className="text-center text-white mt-20">Checking authentication...</div>
    ) : isAdmin ? (
      <AdminLayout />
    ) : (
      <Navigate to="/admin/login" replace />
    )
  }
>


            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="visitor-management" element={<VisitorManagement />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="documents" element={<Documents />} />
            <Route path="admin-portal" element={<AdminPortal />} />
            <Route path="residents" element={<Resident />} />
          </Route>
        </Routes>
      </div>

      {!isHiddenLayoutPath && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AppContextProvider>
      <AppWrapper />
    </AppContextProvider>
  );
}

export default App;
