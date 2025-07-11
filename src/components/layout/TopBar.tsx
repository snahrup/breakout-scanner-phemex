import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const timeframes = [
  { value: '1d', label: '1 Day' },
  { value: '4h', label: '4 Hours' },
  { value: '1h', label: '1 Hour' },
];

export function TopBar() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  return (
    <motion.header 
      className="h-16 border-b border-border glass-card px-6 flex items-center justify-between"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Search and Pair Selector */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pairs (e.g., BTCUSDT, ETH...)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 bg-input/50 backdrop-blur-sm border-glass-border font-jetbrains"
          />
        </div>
      </div>

      {/* Center Controls */}
      <div className="flex items-center space-x-4">
        {/* Timeframe Toggle */}
        <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={selectedTimeframe === tf.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTimeframe(tf.value)}
              className={`font-jetbrains text-xs ${
                selectedTimeframe === tf.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tf.label}
            </Button>
          ))}
        </div>

        {/* Live indicator */}
        <motion.div 
          className="flex items-center space-x-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="w-2 h-2 bg-neon-emerald rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span className="text-muted-foreground font-jetbrains">LIVE</span>
        </motion.div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Connection Status */}
        <motion.div 
          className="flex items-center space-x-2 text-sm bg-neon-emerald/10 text-neon-emerald px-3 py-1 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-1.5 h-1.5 bg-neon-emerald rounded-full animate-pulse" />
          <span className="font-jetbrains font-medium">Connected</span>
        </motion.div>

        {/* Dark/Light Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-muted-foreground hover:text-foreground"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.div>
        </Button>
      </div>
    </motion.header>
  );
}