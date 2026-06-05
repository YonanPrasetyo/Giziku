import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { FormInput, Button, AlertMessage } from '../components/FormComponents';

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PasswordIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated, user } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin/missions");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (error) {
      clearError();
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const errors = validateForm();
    if (errors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: errors[name]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({
      email: true,
      password: true,
    });

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E8F8F1] via-white to-[#E8F8F1] flex flex-col lg:justify-center lg:px-8">
      <div className="w-full max-w-md mx-auto lg:max-w-md">
      <div className="bg-gradient-to-br from-[#1E9B5F] via-[#2DBD7A] to-[#52D48F] px-7 pt-16 pb-14 relative overflow-hidden">
        <div className="absolute w-60 h-60 rounded-full bg-white/7 -top-20 -right-20"></div>
        <div className="absolute w-40 h-40 rounded-full bg-white/5 -bottom-12 -left-12"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Giziku</h1>
          <p className="text-white/82 text-sm text-center leading-relaxed max-w-56">
            Pantau nutrisi harianmu dengan mudah dan akurat
          </p>
        </div>
      </div>

      <div className="bg-white flex-1 px-7 pt-9 pb-11 rounded-t-3xl -mt-6 relative z-20 shadow-sm">
        <h2 className="text-2xl font-black text-[#1A1A2E] mb-1">Selamat Datang 👋</h2>
        <p className="text-xs text-[#7B8090] font-medium mb-7">Masuk ke akun kamu untuk mulai melacak nutrisi</p>

        {error && (
          <AlertMessage 
            type="error" 
            message={error}
            onClose={clearError}
          />
        )}

        <form onSubmit={handleSubmit} className="mb-6">
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="email@contoh.com"
            error={validationErrors.email}
            required
            icon={<EmailIcon />}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Masukkan password"
            error={validationErrors.password}
            required
            icon={<PasswordIcon />}
          />

          <div className="text-right mb-6 -mt-1">
            <Link 
              to="#"
              className="text-xs font-bold text-[#1E9B5F] hover:text-[#2DBD7A] transition-colors"
            >
              Lupa password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            className="mb-6 font-black text-base"
          >
            Masuk Sekarang
          </Button>
        </form>

        <p className="text-center text-xs text-[#7B8090] font-medium mt-7">
          Belum punya akun? 
          <Link 
            to="/register"
            className="text-[#1E9B5F] hover:text-[#2DBD7A] font-black ml-1 transition-colors"
          >
            Daftar gratis
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
