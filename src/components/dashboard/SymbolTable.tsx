import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TradingPair } from '@/components/layout/DashboardLayout';
import { MiniSparkline } from '@/components/ui/mini-sparkline';

interface SymbolTableProps {
  onPairSelect: (pair: TradingPair) => void;
  selectedPair: TradingPair | null;
}

// Extended mock data for the table
const mockPairs: TradingPair[] = [
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
  },
  {
    id: '4',
    symbol: 'ADAUSDT',
    probability: 0.72,
    eta: 3.8,
    volume24h: 9.6,
    funding: 0.0067,
    openInterestDelta: 3.2,
    sparklineData: [100, 103, 99, 102, 105, 108, 106, 110, 113, 116],
    drivers: ['Technical Breakout', 'Volume Spike'],
    confidence: 'medium'
  },
  {
    id: '5',
    symbol: 'DOGEUSDT',
    probability: 0.84,
    eta: 1.9,
    volume24h: 22.1,
    funding: 0.0156,
    openInterestDelta: 12.4,
    sparklineData: [100, 105, 108, 112, 109, 115, 118, 116, 121, 125],
    drivers: ['Social Media', 'Whale Activity', 'News Event'],
    confidence: 'high'
  },
  {
    id: '6',
    symbol: 'AVAXUSDT',
    probability: 0.61,
    eta: 8.7,
    volume24h: 6.3,
    funding: -0.0021,
    openInterestDelta: 1.8,
    sparklineData: [100, 98, 96, 99, 97, 101, 99, 102, 100, 103],
    drivers: ['DeFi Activity'],
    confidence: 'low'
  }
];

type SortField = 'symbol' | 'probability' | 'eta' | 'volume24h' | 'funding' | 'openInterestDelta';
type SortDirection = 'asc' | 'desc';

export function SymbolTable({ onPairSelect, selectedPair }: SymbolTableProps) {
  const [sortField, setSortField] = useState<SortField>('probability');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPairs = useMemo(() => {
    return [...mockPairs].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }, [sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-3 w-3" />
      : <ArrowDown className="h-3 w-3" />;
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-neon-emerald';
      case 'medium': return 'text-warning-amber';
      case 'low': return 'text-error-rose';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Market Scanner
          <Badge variant="secondary" className="ml-auto font-jetbrains">
            {sortedPairs.length} Pairs
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[600px]">
          <table className="w-full">
            <thead className="sticky top-0 bg-card/80 backdrop-blur-sm border-b border-border">
              <tr className="text-xs text-muted-foreground">
                <th className="text-left p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('symbol')}
                    className="h-auto p-0 font-medium hover:text-foreground"
                  >
                    Pair {getSortIcon('symbol')}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('probability')}
                    className="h-auto p-0 font-medium hover:text-foreground"
                  >
                    Prob % {getSortIcon('probability')}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('eta')}
                    className="h-auto p-0 font-medium hover:text-foreground"
                  >
                    ETA h {getSortIcon('eta')}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('volume24h')}
                    className="h-auto p-0 font-medium hover:text-foreground"
                  >
                    Vol % {getSortIcon('volume24h')}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('funding')}
                    className="h-auto p-0 font-medium hover:text-foreground"
                  >
                    Funding {getSortIcon('funding')}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('openInterestDelta')}
                    className="h-auto p-0 font-medium hover:text-foreground"
                  >
                    OI Δ {getSortIcon('openInterestDelta')}
                  </Button>
                </th>
                <th className="text-center p-3">48h Chart</th>
              </tr>
            </thead>
            <tbody>
              {sortedPairs.map((pair, index) => (
                <motion.tr
                  key={pair.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors ${
                    selectedPair?.id === pair.id ? 'bg-primary/10' : ''
                  }`}
                  onClick={() => onPairSelect(pair)}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-jetbrains font-medium">{pair.symbol}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        pair.confidence === 'high' ? 'bg-neon-emerald' :
                        pair.confidence === 'medium' ? 'bg-warning-amber' : 'bg-error-rose'
                      }`} />
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <span className={`font-jetbrains font-medium ${getConfidenceColor(pair.confidence)}`}>
                      {(pair.probability * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className="font-jetbrains text-muted-foreground">
                      {pair.eta.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className={`font-jetbrains ${
                      pair.volume24h > 10 ? 'text-neon-emerald' : 'text-muted-foreground'
                    }`}>
                      +{pair.volume24h.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className={`font-jetbrains ${
                      pair.funding > 0 ? 'text-neon-emerald' : 'text-error-rose'
                    }`}>
                      {pair.funding > 0 ? '+' : ''}{(pair.funding * 100).toFixed(3)}%
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className={`font-jetbrains ${
                      pair.openInterestDelta > 0 ? 'text-neon-emerald' : 'text-error-rose'
                    }`}>
                      {pair.openInterestDelta > 0 ? '+' : ''}{pair.openInterestDelta.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center">
                      <MiniSparkline 
                        data={pair.sparklineData}
                        color={pair.confidence === 'high' ? '#00E6B8' : 
                               pair.confidence === 'medium' ? '#FFB400' : '#FF4C6B'}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}