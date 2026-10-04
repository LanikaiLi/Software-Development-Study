import { createContext, useContext, useState } from 'react';

// 1. 建一块公告板
const UnitContext = createContext(null);

// 2. Provider：把数据放到公告板上
export function UnitProvider({ children }) {
  const [unit, setUnit] = useState('C');

  function toggleUnit() {
    setUnit(unit === 'C' ? 'F' : 'C');
  }

  // 后端给的都是摄氏度，在这里换算成要显示的单位
  function formatTemp(celsius) {
    const value = unit === 'C' ? celsius : (celsius * 9) / 5 + 32;
    return `${Math.round(value)}°${unit}`;
  }

  return (
    <UnitContext.Provider value={{ unit, toggleUnit, formatTemp }}>
      {children}
    </UnitContext.Provider>
  );
}

// 3. 其他组件用 useUnit() 读取公告板
export function useUnit() {
  return useContext(UnitContext);
}