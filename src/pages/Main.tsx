import { useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import ConfirmModal from '@/components/modal/ConfirmModal';
import ErrorModal from '@/components/modal/ErrorModal';
import UserConfirmModal from '@/components/modal/UserConfirmModal';
import healthCheck from '@/api/test/healthCheck';
import { SignupForm } from '@/components/test/SignUpForm';
import LoginForm from '@/components/test/LoginForm';

export default function Main() {
  const { isOpen, modalType } = useModalStore();
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const handleHealthCheck = async () => {
    const response = await healthCheck();
    console.log(response);
  };

  const handleSignupSuccess = () => {
    setIsLogin(true);
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
  };

  return (
    <div className="w-screen h-screen flex flex-row p-30pxr">
      <div className="w-full h-full flex flex-col">
        {userEmail ? (
          <h2>{userEmail}님 환영합니다.</h2>
        ) : isLogin ? (
          <>
            <LoginForm onSuccess={handleLoginSuccess} />
            <button onClick={() => setIsLogin(false)}>회원가입하기</button>
          </>
        ) : (
          <>
            <SignupForm onSuccess={handleSignupSuccess} />
            <button onClick={() => setIsLogin(true)}>
              로그인으로 돌아가기
            </button>
          </>
        )}
      </div>
      {isOpen && modalType === 'confirm' && <ConfirmModal />}
      {isOpen && modalType === 'error' && <ErrorModal />}
      {isOpen && modalType === 'userConfirm' && <UserConfirmModal />}
    </div>
  );
}
