import ProgressBar from './ProgressBar';
// ... (diğer importlar)

// ...
// JSX içinde, VirtualKeyboard'dan önce:
<div className="w-full flex justify-center items-center">
  <ProgressBar
    current={categoryProgressMap[category]?.[difficulty] || 0}
    total={25}
  />
</div>
// ...
// Alt blokta:
<div className="flex-shrink-0 w-full max-w-[260px] space-y-1 px-1 -mt-2">
  {/* İlerleme Çubuğu - Yeni */}
  <div className="w-full flex justify-center items-center">
    <ProgressBar
      current={categoryProgressMap[category]?.[difficulty] || 0}
      total={25}
    />
  </div>
  {/* Timer - Mini */}
  <div className="flex justify-center">
    {/* ... */}
  </div>
  {/* Virtual Keyboard - Mobil Mini */}
  <div className="transform scale-75 sm:scale-85 md:scale-95 origin-center">
    <VirtualKeyboard
      // ... props
    />
  </div>
</div>
// ...