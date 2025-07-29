import React, { useState } from "react";
import { Plus, Activity, Clock, X } from "lucide-react";

const PatrolActivities = ({ activities = [], onAddActivity, onRemoveActivity }) => {
  const [newActivity, setNewActivity] = useState("");

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      onAddActivity({
        id: Date.now(),
        activity: newActivity,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setNewActivity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddActivity();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Kegiatan Patroli</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Masukkan kegiatan patroli..."
              className="flex-1 bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddActivity}
              disabled={!newActivity.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-500 font-medium">Belum ada kegiatan patroli</p>
              <p className="text-sm text-slate-400 mt-1">Tambahkan kegiatan patroli untuk memulai</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-700 font-medium">{activity.activity}</p>
                    <button
                      onClick={() => onRemoveActivity(activity.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Ditambahkan pada {activity.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatrolActivities;