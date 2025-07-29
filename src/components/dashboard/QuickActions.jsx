import React from 'react';
import { FileText, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {

  const navigate = useNavigate();

  const actions = [
    {
      title: "Buat Laporan",
      icon: FileText,
      onClick: () => navigate('/buat-laporan')
    },
    {
      title: "Scan QR Code",
      icon: QrCode,
      onClick: () => navigate('/absensi/scan-qr') 
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h3>
      <p className="text-gray-600 mb-6">Fitur yang paling sering digunakan</p>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <action.icon className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;