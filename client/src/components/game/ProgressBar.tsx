import React from "react";

interface ProgressBarProps {
  current: number; // Tamamlanan kelime sayısı
  total: number;   // Toplam kelime sayısı (örn: 25)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percent = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full my-4">
      <div className="flex justify-between text-xs text-gray-300 mb-1">
        <span>{current} / {total} kelime tamamlandı</span>
        <span>%{percent}</span>
      </div>
      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;