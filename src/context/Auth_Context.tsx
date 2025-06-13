import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AxiosClient from '@/config/axios';

interface User {
  ID: string,
  Name: string,
  Email: string
}

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  student_id: string;
  photo: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    student_id: string;
    photo: string
  }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserInformation = async () => {
    const res = await AxiosClient.get("/users/get_user_info", {
      params: {
        token: localStorage.getItem("token")
      }
    });

    if (res.status == 201) {
      setUser(res.data.data);
    }
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getUserInformation();
    }

    setIsLoading(false);
  }, []);

  // Protect routes that require authentication
  useEffect(() => {
    if (!isLoading) {
      const protectedRoutes = ['/account'];
      const isProtectedRoute = protectedRoutes.some(route => location.pathname?.startsWith(route));

      if (isProtectedRoute && !user) {
        navigate('/login');
      }
    }
  }, [location.pathname, user, isLoading, navigate]);

  const login = async (email: string, password: string, remember = false): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await AxiosClient.get("/auth/login", { params: { email, password } });

      if (res.status == 201) {
        localStorage.setItem("token", res.data.data);
        navigate("/");
      }

      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({ firstName, lastName, email, password }: SignupData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await AxiosClient.post('/auth/register', {
        name: `${firstName} ${lastName}`,
        email,
        password,
        student_id: 'some-id', // or make this dynamic
        photo: 'some-photo-url', // or make this dynamic
      });

      if (res.status == 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
