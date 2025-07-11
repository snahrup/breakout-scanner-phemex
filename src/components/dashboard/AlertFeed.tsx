import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, ArrowRight, Radar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TradingPair } from '@/components/layout/DashboardLayout';

interface AlertFeedProps {
  onPairSelect: (pair: TradingPair) => void;
}

// Mock data for alerts
const mockAlerts: TradingPair[] = [
  {
    id: '1',
    symbol: 'BTCUSDT',
    probability: 0.89,
    eta: 2.5,
    volume24h: 15.2,
    funding: 0.0125,
    openInterestDelta: 8.7,
    sparklineData: [100, 102, 105, 103, 108, 112, 115, 113, 118, 122],
    drivers: ['High Volume', 'Funding Rate', 'Whale Activity'],
    confidence: 'high'
  },
  {
    id: '2',
    symbol: 'ETHUSDT',
    probability: 0.76,
    eta: 4.2,
    volume24h: 12.8,
    funding: 0.0089,
    openInterestDelta: 5.3,
    sparklineData: [100, 98, 101, 104, 102, 106, 109, 107, 111, 114],
    drivers: ['Social Sentiment', 'Technical Pattern'],
    confidence: 'medium'
  },
  {
    id: '3',
    symbol: 'SOLUSDT',
    probability: 0.68,
    eta: 6.1,
    volume24h: 8.4,
    funding: -0.0032,
    openInterestDelta: -2.1,
    sparklineData: [100, 97, 99, 95, 98, 101, 99, 103, 101, 105],
    drivers: ['Price Action'],
    confidence: 'low'
  }
];

export function AlertFeed({ onPairSelect }: AlertFeedProps) {
  const [alerts, setAlerts] = useState<TradingPair[]>([]);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    // Simulate loading alerts
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
      setIsScanning(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-neon-emerald border-neon-emerald';
      case 'medium': return 'text-warning-amber border-warning-amber';
      case 'low': return 'text-error-rose border-error-rose';
      default: return 'text-muted-foreground border-border';
    }
  };

  const getConfidenceClass = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'confidence-high';
      case 'medium': return 'confidence-medium';
      case 'low': return 'confidence-low';
      default: return '';
    }
  };

  if (isScanning) {
    return (
      <Card className="glass-card h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Breakout Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <motion.div
            className="relative w-24 h-24 mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Radar className="w-full h-full text-primary animate-radar-scan" />
          </motion.div>
          <p className="text-muted-foreground text-center">
            Scanning markets for breakout opportunities...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Breakout Alerts
          </div>
          <Badge variant="secondary" className="font-jetbrains">
            {alerts.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`p-4 rounded-lg border glass-elevated ${getConfidenceClass(alert.confidence)} cursor-pointer group hover:scale-[1.02] transition-transform`}
              onClick={() => onPairSelect(alert)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-jetbrains font-semibold">{alert.symbol}</h3>
                  <Badge 
                    variant="outline" 
                    className={`${getConfidenceColor(alert.confidence)} text-xs`}
                  >
                    {(alert.probability * 100).toFixed(0)}%
                  </Badge>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              {/* ETA */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Clock className="h-3 w-3" />
                <span className="font-jetbrains">ETA: {alert.eta}h</span>
              </div>

              {/* Drivers */}
              <div className="flex flex-wrap gap-1">
                {alert.drivers.map((driver, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary" 
                    className="text-xs bg-muted/50"
                  >
                    {driver}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {alerts.length === 0 && !isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            <Radar className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No breakout signals detected</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}