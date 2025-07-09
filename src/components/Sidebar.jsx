// src/components/Sidebar.jsx
import {
  FaSignOutAlt,
  FaUser,
  FaEye,
  FaChartLine,
  FaUsers,
  FaTimes,          // icon tutup utk mobile
} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';


export default function Sidebar({ isOpen = false, onToggle = () => {} }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');
  navigate('/login');
};

  return (
    <>
      {/* Overlay hitam (muncul hanya di mobile ketika sidebar terbuka) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 flex flex-col flex-shrink-0
          bg-gradient-to-b from-blue-900 to-slate-800 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Tombol tutup (hanya mobile) */}
        <button
          onClick={onToggle}
          className="absolute top-4 right-4 text-white lg:hidden"
        >
          <FaTimes size={18} />
        </button>

        {/* ⬇ hiasan sudut + profil – persis seperti kode asli ⬇ */}
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rotate-45 translate-x-6 -translate-y-6" />
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rotate-45 translate-x-4 -translate-y-4" />
        </div>

        <div className="p-6 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden border-2 border-white shadow-lg flex items-center justify-center">
              <FaUser className="text-gray-600 text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">
                Aditama Putra Yudha
              </h3>
              <p className="text-xs text-blue-200">Kepala Satpam</p>
            </div>
          </div>
        </div>

{/* Navigasi */}
<nav className="flex-1 px-4 mt-4">
  <ul className="space-y-3">
    <li>
      <Link
        to="/dashboard"
        className={`
          flex items-center rounded-lg px-4 py-3 text-sm font-semibold shadow-md
          ${location.pathname === '/dashboard'
            ? 'bg-white text-slate-800'
            : 'text-blue-100 hover:bg-white/10'}
        `}
      >
        <FaChartLine className="mr-3 w-5 h-5" />
        DASHBOARD
      </Link>
    </li>

    <li>
      <Link
        to="/data-karyawan"
        className={`
          flex items-center rounded-lg px-4 py-3 text-sm font-semibold shadow-md
          ${location.pathname === '/data-karyawan'
            ? 'bg-white text-slate-800'
            : 'text-blue-100 hover:bg-white/10'}
        `}
      >
        <FaUsers className="mr-3 w-5 h-5" />
        DATA KARYAWAN
      </Link>
    </li>
  </ul>
</nav>



        {/* Logout */}
        <div className="p-4 mt-auto">
          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin keluar?')) {
                handleLogout();
              }
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-3 text-sm font-semibold flex items-center justify-center shadow-md"
          >
            <FaSignOutAlt className="mr-2" /> LOGOUT
          </button>
        </div>
      </aside>
    </>
  );
}
