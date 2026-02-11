import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type TerminalLog = {
  id: string;
  message: string;
  timestamp: string;
};

type AppContextType = {
  logs: TerminalLog[];
  addLog: (message: string) => void;
  kpiStats: {
    total: number;
    fraud: number;
    funds: number;
    pending: number;
  };
  setKpiStats: React.Dispatch<React.SetStateAction<{
    total: number;
    fraud: number;
    funds: number;
    pending: number;
  }>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [kpiStats, setKpiStats] = useState({
    total: 124892,
    fraud: 842,
    funds: 42000000, // 4.2 Cr in Rs
    pending: 1204
  });

  const addLog = useCallback((message: string) => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [...prev.slice(-19), newLog]);
  }, []);

  useEffect(() => {
    const initialLogs = [
      "Initializing Neural Engine...",
      "Connecting to WB Health API...",
      "OCR Modules Loaded.",
      "Awaiting claim stream..."
    ];
    initialLogs.forEach((msg, i) => {
      setTimeout(() => addLog(msg), i * 1000);
    });
  }, [addLog]);

  return (
    <AppContext.Provider value={{ logs, addLog, kpiStats, setKpiStats }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
