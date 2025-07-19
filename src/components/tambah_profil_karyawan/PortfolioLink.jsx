// components/PortfolioLink.jsx - EDITABLE VERSION
import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';

const PortfolioLink = ({ formData, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <ExternalLink className="w-6 h-6 text-white" />
          <h3 className="text-lg font-semibold text-white">
            Link Portofolio
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            URL Portofolio
          </label>
          <input
            type="url"
            name="portfolio_link"
            value={formData.portfolio_link}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://portfolio.example.com"
          />
          
          {/* Preview Link */}
          {formData.portfolio_link && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Preview:</p>
              <a
                href={formData.portfolio_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>
                  {formData.portfolio_link.replace(/^https?:\/\//, "")}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioLink;