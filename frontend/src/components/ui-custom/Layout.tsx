import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from './Navbar';
import { User } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const Layout = ({ children, requireAuth = true }: LayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('clinicToken');
    const storedUser = localStorage.getItem('clinicUser');
    
    if (!token && requireAuth) {
      // Token yoksa ve auth gerektiren bir sayfadaysa
      toast.error('Oturumunuz kapatıldı, lütfen tekrar giriş yapın');
      navigate('/');
      return;
    }
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else if (requireAuth) {
      navigate('/');
    }
    setLoading(false);
  }, [navigate, requireAuth]);

  const handleLogout = () => {
    localStorage.removeItem('clinicToken');
    localStorage.removeItem('clinicUser');
    setUser(null);
    toast.success('Başarıyla çıkış yapıldı');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">Yükleniyor...</div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {requireAuth && <Navbar user={user} onLogout={handleLogout} />}
      <main className="flex-grow py-6">
        <div className="app-container">
          <div className="page-transition">{children}</div>
        </div>
      </main>
      <footer className="py-4 border-t border-slate-200 bg-white/50 backdrop-blur-xs">
        <div className="app-container">
          <div className="text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Klinik Yönetim Sistemi. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
