import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-slate-800 text-white flex flex-col relative">
      {/* Sidebar */}

      {/* Decorative header shape */}
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 transform rotate-45 translate-x-6 -translate-y-6"></div>
        <div className="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-10 transform rotate-45 translate-x-4 -translate-y-4"></div>
      </div>

      {/* Profile Section */}
      <div className="p-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <div className="w-full h-full bg-gray-400 flex items-center justify-center">
              <i className="fas fa-user text-gray-600 text-lg"></i>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Aditama Putra Yudha</h3>
            <p className="text-xs text-blue-200">Kepala Satpam</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-3">
          <li>
            <button className="w-full block rounded-lg px-4 py-3 text-sm font-semibold items-center justify-center transition-colors bg-white text-slate-800 shadow-md hover:bg-gray-100">
              <i className="fas fa-chart-line mr-2"></i>
              DASHBOARD
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/datakaryawan')}
              className="w-full block rounded-lg px-4 py-3 text-sm font-medium items-center justify-center transition-colors text-blue-100 hover:bg-white hover:bg-opacity-10"
            >
              <i className="fas fa-users mr-2"></i>
              DATA KARYAWAN
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={() => {
            if (window.confirm('Apakah Anda yakin ingin keluar?')) {
              window.location.href = 'login.html';
            }
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-center shadow-md"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          LOGOUT
        </button>
      </div>
    </div>
  );
}
