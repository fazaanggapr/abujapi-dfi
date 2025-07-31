import React from "react";
import { X, Save } from "lucide-react";

const ActionButtons = ({ 
  onCancel, 
  onSubmit, 
  isSubmitting = false, 
  isDisabled = false 
}) => {
  return (
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <X className="w-4 h-4" />
        <span>Batal</span>
      </button>

      <button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting || isDisabled}
        className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Mengupload...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Upload Laporan</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ActionButtons;
