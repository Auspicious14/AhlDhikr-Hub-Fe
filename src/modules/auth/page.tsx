import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};
