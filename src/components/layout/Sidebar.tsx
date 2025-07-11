import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Bell, Settings, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { icon: Map, label: 'Overview', href: '/', active: true },
  { icon: Bell, label: 'Alerts', href: '/alerts', active: false },
  { icon: Activity, label: 'Analytics', href: '/analytics', active: false },
  { icon: Settings, label: 'Settings', href: '/settings', active: false },
];

export function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside 
      className="fixed left-0 top-0 h-full w-16 bg-sidebar border-r border-sidebar-border glass-card z-50"
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <motion.div 
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-emerald to-primary-glow flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-4 h-4 bg-sidebar-background rounded-sm"></div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <TooltipProvider>
            <div className="space-y-2">
              {navItems.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={item.active ? "default" : "ghost"}
                      size="icon"
                      className={`w-12 h-12 relative ${
                        item.active 
                          ? 'bg-primary text-primary-foreground glow-primary' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <item.icon className="h-5 w-5" />
                      </motion.div>
                      
                      {item.active && (
                        <motion.div
                          className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="glass-card border-glass-border">
                    <p className="font-medium">{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </nav>

        {/* Status indicator */}
        <div className="p-4 border-t border-sidebar-border">
          <motion.div 
            className="w-2 h-2 bg-neon-emerald rounded-full mx-auto animate-pulse-glow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          />
        </div>
      </div>
    </motion.aside>
  );
}