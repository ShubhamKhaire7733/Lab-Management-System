import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { Navbar } from '@/components/layout/navbar';
import { getCurrentUser } from '@/lib/auth';

function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold">Welcome to Lab Management</h1>
                <p className="text-muted-foreground">Please login or register to continue</p>
              </div>
            } />
            <Route path="/login" element={
              <div className="flex justify-center">
                <LoginForm />
              </div>
            } />
            <Route path="/register" element={
              <div className="flex justify-center">
                <RegisterForm />
              </div>
            } />
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
        <Toaster />
      </div>
    </Router>
  );
}

export default App;