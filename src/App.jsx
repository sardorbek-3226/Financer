import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppPage from "./pages/AppPage";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ProtectedRoute
function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/app" />} />
      </Routes>
    </Router>
  );
}
