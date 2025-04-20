// pages/ProfilePage.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await API.post('/auth/logout');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user?.name}
        </h2>
        <p className="text-gray-600 mb-6">Email: {user?.email}</p>
        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
