import React from 'react';

interface ToastProps {
  show: boolean;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ show, message }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg text-base font-medium animate-fade-in-up sm:text-lg sm:bottom-8 sm:right-8" style={{ minWidth: 180 }}>
      {message}
    </div>
  );
};

export default Toast;

// tailwindcss动画
// .animate-fade-in-up { animation: fadeInUp 0.3s; }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } 