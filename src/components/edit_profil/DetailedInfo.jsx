// components/DetailedInfo.jsx
import React from 'react';
import { 
  Activity, 
  MapPin, 
  Users, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  Mail,
  Fingerprint
} from 'lucide-react';

const DetailedInfo = ({ formData }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            Detail Informasi
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Alamat
                </p>
                <p className="text-slate-800">{formData.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Jenis Kelamin
                </p>
                <p className="text-slate-800">{formData.gender}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Umur
                </p>
                <p className="text-slate-800">{formData.age}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Tinggi / Berat
                </p>
                <p className="text-slate-800">
                  {formData.height} / {formData.weight}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Pendidikan
                </p>
                <p className="text-slate-800">{formData.education}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Akun Bank
                </p>
                <p className="text-slate-800">
                  {formData.bank_account}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Email
                </p>
                <p className="text-slate-800">{formData.email}</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <div className="w-20 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                <Fingerprint className="w-10 h-10 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedInfo;