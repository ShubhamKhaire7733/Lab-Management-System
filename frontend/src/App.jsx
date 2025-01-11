import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { getCurrentUser } from './lib/auth';

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
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Lab Management</h1>
                <p className="text-gray-600">Please login or register to continue</p>
              </div>
            } />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/student" element={
              <PrivateRoute allowedRoles={['student']}>
                <div>Student Dashboard</div>
              </PrivateRoute>
            } />
            <Route path="/teacher" element={
              <PrivateRoute allowedRoles={['teacher']}>
                <div>Teacher Dashboard</div>
              </PrivateRoute>
            } />
            <Route path="/admin" element={
              <PrivateRoute allowedRoles={['admin']}>
                <div>Admin Dashboard</div>
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;