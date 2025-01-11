import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCurrentUser, removeToken } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { BeakerIcon } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BeakerIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Lab Management</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user.email} ({user.role})
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}