import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { AlertFeed } from '@/components/dashboard/AlertFeed';
import { SymbolTable } from '@/components/dashboard/SymbolTable';
import { DetailDrawer } from '@/components/dashboard/DetailDrawer';
import { SubscriptionFAB } from '@/components/dashboard/SubscriptionFAB';

export interface TradingPair {
  id: string;
  symbol: string;
  probability: number;
  eta: number;
  volume24h: number;
  funding: number;
  openInterestDelta: number;
  sparklineData: number[];
  drivers: string[];
  confidence: 'high' | 'medium' | 'low';
}

export function DashboardLayout() {
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePairSelect = (pair: TradingPair) => {
    setSelectedPair(pair);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedPair(null), 300); // Wait for animation
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Sidebar - Fixed 64px width */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="ml-16">
        {/* Top Bar */}
        <TopBar />
        
        {/* Main Dashboard Grid */}
        <main className="p-6">
          <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-120px)]">
            {/* Alert Feed - 4 columns */}
            <motion.div 
              className="col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AlertFeed onPairSelect={handlePairSelect} />
            </motion.div>
            
            {/* Symbol Table - 5 columns (8 if drawer closed) */}
            <motion.div 
              className={`transition-all duration-300 ${
                isDrawerOpen ? 'col-span-5' : 'col-span-8'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SymbolTable 
                onPairSelect={handlePairSelect}
                selectedPair={selectedPair}
              />
            </motion.div>
            
            {/* Detail Drawer - 3 columns */}
            <DetailDrawer
              isOpen={isDrawerOpen}
              selectedPair={selectedPair}
              onClose={handleDrawerClose}
            />
          </div>
        </main>
      </div>
      
      {/* Floating Subscription Button */}
      <SubscriptionFAB />
      
      {/* Backdrop blur when drawer is open */}
      {isDrawerOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDrawerClose}
        />
      )}
    </div>
  );
}