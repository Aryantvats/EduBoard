import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/api/v1/student/me");

      if (data.success) {
        setStudent(data.student);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/me");

      if (data.success) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

const login = async (formData) => {
  try {
    const { data } = await axios.post("/api/v1/auth/login", formData);

    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      await fetchUser();
      await fetchProfile();
      toast.success("Login successful");

      navigate(data.role === "admin" ? "/admin/students" : "/student/profile");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};

  const signup = async (formData) => {
    try {
      const { data } = await axios.post("/api/v1/auth/register", formData);

      if (data.success) {
        toast.success("Signup successful. Please login.");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setStudent(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      fetchUser();
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    setLoading,
    login,
    signup,
    logout,
    student,
    setStudent,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
