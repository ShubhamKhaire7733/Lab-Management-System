import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { getCurrentUser } from './lib/auth';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

function PrivateRoute({ children, allowedRoles }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/student" element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentDashboard />
              </PrivateRoute>
            } />
            <Route path="/teacher" element={
              <PrivateRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin" element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;