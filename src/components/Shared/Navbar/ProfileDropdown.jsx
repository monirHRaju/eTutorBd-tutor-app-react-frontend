import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

export default function ProfileDropdown() {
  const { user, logOut} = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dropdown dropdown-end text-black dark:text-white">
      <button className="btn btn-ghost btn-circle avatar border-2 border-white">
        <div className="w-10 rounded-full">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150?text=Profile'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </button>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={() => handleNavigate('/dashboard')}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4 4m-4-4V5" />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a onClick={() => handleNavigate('/dashboard/update-profile')}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Update Profile
          </a>
        </li>
        <li>
          <a onClick={() => handleNavigate('/dashboard/change-picture')}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Change Picture
          </a>
        </li>
        <li>
          <Link onClick={handleLogout} className="text-error">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}