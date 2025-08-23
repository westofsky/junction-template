import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icons/logo.png';

export default function Main() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/dashboard');
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-[#FCF8F5]">
      <img src={logo} alt="Logo" className="w-249pxr h-auto mt-249pxr" />
    </div>
  );
}
