import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { FormInput, Button, AlertMessage } from '../components/FormComponents';

const UsernameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

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

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username harus diisi';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Username minimal 3 karakter';
    } else if (formData.username.trim().length > 30) {
      errors.username = 'Username maksimal 30 karakter';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      errors.username = 'Username hanya boleh berisi huruf, angka, dan underscore';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    } else if (formData.password.length > 100) {
      errors.password = 'Password maksimal 100 karakter';
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Password tidak cocok';
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
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      setSuccessMessage('Pendaftaran berhasil! Silakan login dengan akun Anda.');
      
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Register error:', err);
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

      <div className="bg-white flex-1 px-7 pt-9 pb-11 rounded-t-3xl -mt-6 relative z-20 shadow-sm overflow-y-auto">
        <h2 className="text-2xl font-black text-[#1A1A2E] mb-1">Daftar 👋</h2>
        <p className="text-xs text-[#7B8090] font-medium mb-7">Buat akun Giziku Anda sekarang</p>

        {error && (
          <AlertMessage 
            type="error" 
            message={error}
            onClose={clearError}
          />
        )}

        {successMessage && (
          <AlertMessage 
            type="success" 
            message={successMessage}
          />
        )}

        <form onSubmit={handleSubmit} className="mb-6">
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="johndoe"
            error={validationErrors.username}
            required
            autoComplete="username"
            icon={<UsernameIcon />}
          />

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
            autoComplete="email"
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
            autoComplete="new-password"
            icon={<PasswordIcon />}
          />

          <FormInput
            label="Konfirmasi Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Masukkan password lagi"
            error={validationErrors.confirmPassword}
            required
            autoComplete="new-password"
            icon={<PasswordIcon />}
          />

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="mb-6 font-black text-base"
          >
            Daftar Sekarang
          </Button>
        </form>

        <p className="text-center text-xs text-[#7B8090] font-medium mt-7">
          Sudah punya akun? 
          <Link 
            to="/login"
            className="text-[#1E9B5F] hover:text-[#2DBD7A] font-black ml-1 transition-colors"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
