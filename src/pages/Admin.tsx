import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      // Simple authentication (for demo purposes)
      // In production, this should be replaced with proper authentication
      if (username === "admin" && password === "admin123") {
        // Store authentication token
        localStorage.setItem("adminToken", "demo-token");
        localStorage.setItem("adminUser", username);
        setIsAuthenticated(true);
      } else {
        setError("Username atau password salah!");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <AdminLogin 
      onLogin={handleLogin}
      loading={loading}
      error={error}
    />
  );
};

export default Admin;
