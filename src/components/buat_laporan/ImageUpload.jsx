import React, { useRef } from "react";
import { Camera, X } from "lucide-react";

const ImageUpload = ({ selectedImage, onImageSelect, imageDescription, onDescriptionChange, error }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      console.error("Ukuran gambar maksimal 2MB");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <Camera className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Laporan Gambar*</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
          {selectedImage && (
            <div className="mb-4 relative">
              <img 
                src={selectedImage} 
                alt="Patrol report" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => onImageSelect(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <input
            type="text"
            name="image_description"
            value={imageDescription}
            onChange={onDescriptionChange}
            placeholder="Masukkan keterangan gambar..."
            className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
            required
          />

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Camera className="w-5 h-5" />
            <span>{selectedImage ? "Ganti Gambar" : "Tambah Gambar"}</span>
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;