import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminLayout from "./components/layout/adminLayout.jsx";
import StudentLayout from "./components/layout/StudentLayout.jsx";
import Students from "./pages/admin/Students.jsx";
import AddStudent from "./pages/admin/AddStudent.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import EditStudent from "./pages/admin/EditStudent.jsx";
import StudentProfile from "./pages/student/StudentProfile.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import EditStudentProfile from "./pages/student/EditStudentProfile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

const App = () => {
  const { loading } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="students" element={<Students />} />
          <Route path="student/add" element={<AddStudent />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/student/*" element={<StudentLayout />}>
          <Route path="profile" element={<StudentProfile />} />
          <Route path="edit-profile" element={<EditStudentProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
