import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, removeToken } from '../lib/auth';

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">Lab Management</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.email} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// //Adwait
