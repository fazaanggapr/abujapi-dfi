// components/PortfolioLink.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const PortfolioLink = ({ formData }) => {
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
          <a
            href={formData.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>
              {formData.portfolio
                ? formData.portfolio.replace("https://", "")
                : "-"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLink;