export function FormInput({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  error,
  required = false,
  autoComplete = '',
  icon: Icon = null,
  onBlur = null
}) {
  return (
    <div className="mb-4">
      <label 
        htmlFor={name}
        className="block text-xs font-bold text-[#7B8090] mb-2 uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7B8090] pointer-events-none">
            {Icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full h-12 border-[1.5px] rounded-[10px] px-4 transition-colors outline-none font-medium ${
            Icon ? 'pl-12' : 'pl-4'
          } ${
            error 
              ? 'border-red-500 bg-red-50 focus:border-red-500 focus:bg-white' 
              : 'border-[#E8EAF0] bg-[#FAFAFA] focus:border-[#2DBD7A] focus:bg-white'
          }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}

export function Button({
  type = 'button',
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  fullWidth = true,
  className = ''
}) {
  const baseClasses = 'font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] tracking-wide';
  const widthClass = fullWidth ? 'w-full' : '';
  const heightClass = 'h-12';
  
  const variants = {
    primary: 'bg-[#2DBD7A] text-white hover:bg-[#1E9B5F] active:scale-98',
    secondary: 'bg-white text-[#1A1A2E] border-[1.5px] border-[#E8EAF0] hover:bg-gray-50 active:scale-98',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-98'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${heightClass} ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </span>
      ) : children}
    </button>
  );
}

export function AlertMessage({ type = 'error', message, onClose }) {
  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50';
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';
  const iconColor = type === 'error' ? 'text-red-500' : 'text-green-500';

  return (
    <div className={`${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded-[10px] border-[1.5px] mb-4 flex justify-between items-center gap-2 text-sm font-medium`}>
      <div className="flex items-center gap-2">
        <span className={`${iconColor} text-lg`}>
          {type === 'error' ? '✕' : '✓'}
        </span>
        <span>{message}</span>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-lg font-bold cursor-pointer hover:opacity-70 flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
}

export function LinkText({ text, linkText, href, onClick }) {
  return (
    <p className="text-center text-xs text-[#7B8090] font-medium">
      {text}
      <a 
        href={href}
        onClick={onClick}
        className="text-[#1E9B5F] hover:text-[#2DBD7A] font-bold ml-1 transition-colors"
      >
        {linkText}
      </a>
    </p>
  );
}
