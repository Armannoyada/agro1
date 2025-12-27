import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from './components/common/BackToTop';
import { CompanyProvider } from './context/CompanyContext';
// Public Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import JoinService from './pages/JoinService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';


// Admin Components
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import AdminServices from './admin/pages/Services';
import ServiceForm from './admin/pages/ServiceForm';
import Categories from './admin/pages/Categories';
import Inquiries from './admin/pages/Inquiries';
import Contacts from './admin/pages/Contacts';
import Testimonials from './admin/pages/Testimonials';
import Team from './admin/pages/Team';
import Settings from './admin/pages/Settings';
import Blogs from './admin/pages/Blogs';
import BlogForm from './admin/pages/BlogForm';

// MUI Theme for Admin
const theme = createTheme({
  palette: {
    primary: { main: '#16a34a', light: '#dcfce7' },
    secondary: { main: '#0ea5e9' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
      },
    },
  },
});

// Layout wrapper to conditionally show Navbar/Footer
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// Admin Routes Component
const AdminRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AdminLayout user={user} onLogout={handleLogout} />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="services/new" element={<ServiceForm />} />
        <Route path="services/edit/:id" element={<ServiceForm />} />
        <Route path="categories" element={<Categories />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/create" element={<BlogForm />} />
        <Route path="blogs/edit/:id" element={<BlogForm />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="team" element={<Team />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="login" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <CompanyProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <BackToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/join" element={<PublicLayout><JoinService /></PublicLayout>} />
            <Route path="/join/:serviceId" element={<PublicLayout><JoinService /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><BlogList /></PublicLayout>} />
            <Route path="/blog/:slug" element={<PublicLayout><BlogDetail /></PublicLayout>} />
            <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
            <Route path="/terms-of-service" element={<PublicLayout><TermsOfService /></PublicLayout>} />
            <Route path="/refund-policy" element={<PublicLayout><RefundPolicy /></PublicLayout>} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#166534', color: '#fff' },
              success: { style: { background: '#22c55e' } },
              error: { style: { background: '#ef4444' } },
            }}
          />
        </Router>
      </ThemeProvider>
    </CompanyProvider>
  );
}

export default App;
