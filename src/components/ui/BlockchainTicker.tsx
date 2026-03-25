mport React, { useEffect, useState, useRef } from 'react';
import { Shield, Lock } from 'lucide-react';

type BlockchainEntry = {
  id: string;
  claimId: string;
  hash: string;
  timestamp: string;
  action: string;
};

const BlockchainTicker = () => {
  const [entries, setEntries] = useState<BlockchainEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const generateHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const addEntry = () => {
    const actions = ['CLAIM_SUBMITTED', 'CLAIM_VERIFIED', 'CLAIM_APPROVED', 'CLAIM_REJECTED', 'FRAUD_DETECTED'];
    const newEntry: BlockchainEntry = {
      id: Math.random().toString(36).substr(2, 9),
      claimId: `CLM-${Math.floor(Math.random() * 10000)}`,
      hash: generateHash(),
      timestamp: new Date().toISOString(),
      action: actions[Math.floor(Math.random() * actions.length)]
    };
    
    setEntries(prev => [newEntry, ...prev].slice(0, 50)); // Keep last 50 entries
  };

  useEffect(() => {
    // Add initial entries
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addEntry(), i * 500);
    }

    // Add new entry every 8 seconds
    const interval = setInterval(addEntry, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-green-500/30 z-50 overflow-hidden">
      <div className="flex items-center gap-2 md:gap-4 px-2 md:px-4 py-2">
        <div className="flex items-center gap-1 md:gap-2 text-green-400 shrink-0">
          <Shield className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:inline">Blockchain Ledger</span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider sm:hidden">Ledger</span>
          <Lock className="w-2 h-2 md:w-3 md:h-3" />
        </div>
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-hidden"
        >
          <div className="flex gap-4 md:gap-8 animate-scroll">
            {entries.concat(entries).map((entry, index) => (
              <div 
                key={`${entry.id}-${index}`}
                className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono whitespace-nowrap shrink-0"
              >
                <span className="text-green-500 font-bold">{entry.claimId}</span>
                <span className="text-gray-500 hidden sm:inline">→</span>
                <span className="text-blue-400">{entry.action}</span>
                <span className="text-gray-500 hidden sm:inline">→</span>
                <span className="text-purple-400 hidden md:inline">HASH: {entry.hash.substring(0, 16)}...</span>
                <span className="text-gray-600 hidden md:inline">|</span>
                <span className="text-gray-400 hidden lg:inline">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                <span className="text-green-600">✓</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainTicker;
