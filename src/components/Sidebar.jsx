// src/components/Sidebar.jsx
import { FaUser, FaChartLine, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <>
      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="sidebar w-64 bg-gradient-to-b from-blue-900 to-slate-800 text-white flex flex-col relative">
          {/* Profile Section */}
          <div className="p-6 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                  <FaUser className="text-gray-600 text-lg" />
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
                <a
                  href="/dashboard"
                  className="w-full block rounded-lg px-4 py-3 text-sm font-medium flex items-center justify-center transition-colors text-blue-100 hover:bg-white hover:bg-opacity-10"
                >
                  <FaChartLine className="mr-2" />
                  DASHBOARD
                </a>
              </li>
              <li>
                <a
                  href="/datakaryawan"
                  className="w-full block rounded-lg px-4 py-3 text-sm font-semibold flex items-center justify-center transition-colors bg-white text-slate-800 shadow-md hover:bg-gray-100"
                >
                  <FaUsers className="mr-2" />
                  DATA KARYAWAN
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
