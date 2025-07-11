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

// Comprehensive futures trading pairs data
const mockPairs: TradingPair[] = [
  {
    id: '1',
    symbol: 'BTCUSDT',
    probability: 0.89,
    eta: 2.1,
    volume24h: 6.11,
    funding: 0.0100,
    openInterestDelta: 12.5,
    sparklineData: [100, 102, 105, 103, 108, 112, 115, 113, 118, 122],
    drivers: ['High Volume', 'Institutional Flow'],
    confidence: 'high'
  },
  {
    id: '2',
    symbol: 'ETHUSDT',
    probability: 0.85,
    eta: 1.8,
    volume24h: 7.52,
    funding: 0.0100,
    openInterestDelta: 9.2,
    sparklineData: [100, 98, 101, 104, 102, 106, 109, 107, 111, 114],
    drivers: ['ETF Flows', 'DeFi Activity'],
    confidence: 'high'
  },
  {
    id: '3',
    symbol: 'XRPUSDT',
    probability: 0.82,
    eta: 2.3,
    volume24h: 10.14,
    funding: 0.0100,
    openInterestDelta: 8.1,
    sparklineData: [100, 105, 108, 112, 109, 115, 118, 116, 121, 125],
    drivers: ['Legal Clarity', 'Institutional Adoption'],
    confidence: 'high'
  },
  {
    id: '4',
    symbol: 'SUIUSDT',
    probability: 0.78,
    eta: 2.9,
    volume24h: 8.08,
    funding: 0.0100,
    openInterestDelta: 6.4,
    sparklineData: [100, 103, 99, 102, 105, 108, 106, 110, 113, 116],
    drivers: ['Ecosystem Growth', 'Technical Breakout'],
    confidence: 'high'
  },
  {
    id: '5',
    symbol: 'BNBUSDT',
    probability: 0.72,
    eta: 3.2,
    volume24h: 2.85,
    funding: 0.0100,
    openInterestDelta: 4.1,
    sparklineData: [100, 97, 99, 95, 98, 101, 99, 103, 101, 105],
    drivers: ['Exchange Utility', 'Burn Mechanism'],
    confidence: 'medium'
  },
  {
    id: '6',
    symbol: 'SOLUSDT',
    probability: 0.76,
    eta: 2.7,
    volume24h: 4.57,
    funding: 0.0100,
    openInterestDelta: 5.8,
    sparklineData: [100, 102, 105, 103, 108, 112, 115, 113, 118, 122],
    drivers: ['Memecoin Activity', 'Network Growth'],
    confidence: 'medium'
  },
  {
    id: '7',
    symbol: 'DOGEUSDT',
    probability: 0.84,
    eta: 1.9,
    volume24h: 11.23,
    funding: 0.0100,
    openInterestDelta: 7.9,
    sparklineData: [100, 105, 108, 112, 109, 115, 118, 116, 121, 125],
    drivers: ['Social Media', 'Whale Activity'],
    confidence: 'high'
  },
  {
    id: '8',
    symbol: 'ADAUSDT',
    probability: 0.88,
    eta: 1.6,
    volume24h: 19.04,
    funding: 0.0100,
    openInterestDelta: 11.2,
    sparklineData: [100, 98, 101, 104, 102, 106, 109, 107, 111, 114],
    drivers: ['Development Update', 'Institutional Interest'],
    confidence: 'high'
  },
  {
    id: '9',
    symbol: '1000PEPEUSDT',
    probability: 0.81,
    eta: 2.1,
    volume24h: 14.44,
    funding: 0.0100,
    openInterestDelta: 8.7,
    sparklineData: [100, 103, 99, 102, 105, 108, 106, 110, 113, 116],
    drivers: ['Meme Trend', 'Volume Surge'],
    confidence: 'high'
  },
  {
    id: '10',
    symbol: 'OPUSDT',
    probability: 0.83,
    eta: 1.9,
    volume24h: 14.64,
    funding: 0.0100,
    openInterestDelta: 9.1,
    sparklineData: [100, 105, 108, 112, 109, 115, 118, 116, 121, 125],
    drivers: ['Layer 2 Adoption', 'Technical Pattern'],
    confidence: 'high'
  },
  {
    id: '11',
    symbol: 'HYPERUSDT',
    probability: 0.92,
    eta: 1.2,
    volume24h: 50.87,
    funding: -0.3955,
    openInterestDelta: 15.3,
    sparklineData: [100, 110, 125, 130, 135, 142, 148, 155, 162, 170],
    drivers: ['Breakout Alert', 'High Momentum'],
    confidence: 'high'
  },
  {
    id: '12',
    symbol: 'XLMUSDT',
    probability: 0.79,
    eta: 2.4,
    volume24h: 13.99,
    funding: 0.0100,
    openInterestDelta: 7.8,
    sparklineData: [100, 97, 99, 95, 98, 101, 99, 103, 101, 105],
    drivers: ['Partnership News', 'Payment Adoption'],
    confidence: 'medium'
  },
  {
    id: '13',
    symbol: 'FARTCOINUSDT',
    probability: 0.77,
    eta: 2.8,
    volume24h: 15.80,
    funding: 0.0050,
    openInterestDelta: 6.2,
    sparklineData: [100, 102, 105, 103, 108, 112, 115, 113, 118, 122],
    drivers: ['Meme Momentum', 'Social Buzz'],
    confidence: 'medium'
  },
  {
    id: '14',
    symbol: 'LINKUSDT',
    probability: 0.74,
    eta: 3.1,
    volume24h: 8.54,
    funding: 0.0100,
    openInterestDelta: 5.3,
    sparklineData: [100, 98, 101, 104, 102, 106, 109, 107, 111, 114],
    drivers: ['Oracle Demand', 'DeFi Integration'],
    confidence: 'medium'
  },
  {
    id: '15',
    symbol: '1000SHIBUSDT',
    probability: 0.73,
    eta: 3.3,
    volume24h: 8.49,
    funding: 0.0100,
    openInterestDelta: 4.9,
    sparklineData: [100, 103, 99, 102, 105, 108, 106, 110, 113, 116],
    drivers: ['Meme Rally', 'Ecosystem Development'],
    confidence: 'medium'
  },
  {
    id: '16',
    symbol: 'BCHUSDT',
    probability: 0.68,
    eta: 4.1,
    volume24h: 2.00,
    funding: 0.0050,
    openInterestDelta: 2.8,
    sparklineData: [100, 97, 99, 95, 98, 101, 99, 103, 101, 105],
    drivers: ['Network Upgrade', 'Mining Activity'],
    confidence: 'low'
  },
  {
    id: '17',
    symbol: 'ARBUSDT',
    probability: 0.82,
    eta: 2.0,
    volume24h: 14.58,
    funding: 0.0100,
    openInterestDelta: 8.9,
    sparklineData: [100, 105, 108, 112, 109, 115, 118, 116, 121, 125],
    drivers: ['Layer 2 Growth', 'DeFi Expansion'],
    confidence: 'high'
  },
  {
    id: '18',
    symbol: 'TAOUSDT',
    probability: 0.86,
    eta: 1.7,
    volume24h: 11.87,
    funding: 0.0100,
    openInterestDelta: 9.8,
    sparklineData: [100, 102, 105, 103, 108, 112, 115, 113, 118, 122],
    drivers: ['AI Narrative', 'Network Growth'],
    confidence: 'high'
  },
  {
    id: '19',
    symbol: 'HBARUSDT',
    probability: 0.84,
    eta: 1.8,
    volume24h: 16.66,
    funding: 0.0100,
    openInterestDelta: 10.1,
    sparklineData: [100, 98, 101, 104, 102, 106, 109, 107, 111, 114],
    drivers: ['Enterprise Adoption', 'CBDC Pilots'],
    confidence: 'high'
  },
  {
    id: '20',
    symbol: 'ENAUSDT',
    probability: 0.87,
    eta: 1.5,
    volume24h: 20.33,
    funding: 0.0050,
    openInterestDelta: 12.1,
    sparklineData: [100, 103, 99, 102, 105, 108, 106, 110, 113, 116],
    drivers: ['Staking Yield', 'Protocol Growth'],
    confidence: 'high'
  },
  {
    id: '21',
    symbol: 'ETCUSDT',
    probability: 0.71,
    eta: 3.4,
    volume24h: 5.87,
    funding: 0.0100,
    openInterestDelta: 4.2,
    sparklineData: [100, 97, 99, 95, 98, 101, 99, 103, 101, 105],
    drivers: ['Mining Activity', 'Technical Support'],
    confidence: 'medium'
  },
  {
    id: '22',
    symbol: 'ETHFIUSDT',
    probability: 0.74,
    eta: 3.0,
    volume24h: 8.79,
    funding: 0.0100,
    openInterestDelta: 5.6,
    sparklineData: [100, 102, 105, 103, 108, 112, 115, 113, 118, 122],
    drivers: ['Staking Narrative', 'ETH 2.0'],
    confidence: 'medium'
  },
  {
    id: '23',
    symbol: 'LTCUSDT',
    probability: 0.69,
    eta: 3.8,
    volume24h: 5.66,
    funding: 0.0100,
    openInterestDelta: 3.9,
    sparklineData: [100, 105, 108, 112, 109, 115, 118, 116, 121, 125],
    drivers: ['Halving Effect', 'Payment Adoption'],
    confidence: 'low'
  },
  {
    id: '24',
    symbol: 'SEIUSDT',
    probability: 0.89,
    eta: 1.4,
    volume24h: 27.49,
    funding: 0.0100,
    openInterestDelta: 13.7,
    sparklineData: [100, 98, 101, 104, 102, 106, 109, 107, 111, 114],
    drivers: ['Cosmos Ecosystem', 'DeFi Innovation'],
    confidence: 'high'
  },
  {
    id: '25',
    symbol: 'TONUSDT',
    probability: 0.67,
    eta: 4.2,
    volume24h: 3.32,
    funding: 0.0100,
    openInterestDelta: 2.9,
    sparklineData: [100, 103, 99, 102, 105, 108, 106, 110, 113, 116],
    drivers: ['Telegram Integration', 'Web3 Gaming'],
    confidence: 'low'
  },
  {
    id: '26',
    symbol: 'ONDOUSDT',
    probability: 0.75,
    eta: 2.9,
    volume24h: 9.06,
    funding: 0.0050,
    openInterestDelta: 5.8,
    sparklineData: [100, 97, 99, 95, 98, 101, 99, 103, 101, 105],
    drivers: ['RWA Tokenization', 'Institutional Interest'],
    confidence: 'medium'
  },
  {
    id: '27',
    symbol: 'NEIROETHUSDT',
    probability: 0.88,
    eta: 1.3,
    volume24h: 26.16,
    funding: 0.0533,
    openInterestDelta: 14.2,
    sparklineData: [100, 102, 105, 103, 108, 112, 115, 113, 118, 122],
    drivers: ['Meme Revival', 'High Volatility'],
    confidence: 'high'
  },
  {
    id: '28',
    symbol: 'POPCATUSDT',
    probability: 0.78,
    eta: 2.6,
    volume24h: 11.72,
    funding: 0.0100,
    openInterestDelta: 7.1,
    sparklineData: [100, 105, 108, 112, 109, 115, 118, 116, 121, 125],
    drivers: ['Meme Momentum', 'Community Growth'],
    confidence: 'medium'
  },
  {
    id: '29',
    symbol: 'AVAXUSDT',
    probability: 0.76,
    eta: 2.8,
    volume24h: 7.92,
    funding: 0.0100,
    openInterestDelta: 6.1,
    sparklineData: [100, 98, 101, 104, 102, 106, 109, 107, 111, 114],
    drivers: ['Subnet Growth', 'Gaming Adoption'],
    confidence: 'medium'
  },
  {
    id: '30',
    symbol: 'PENDLEUSDT',
    probability: 0.77,
    eta: 2.7,
    volume24h: 9.91,
    funding: 0.0100,
    openInterestDelta: 6.8,
    sparklineData: [100, 103, 99, 102, 105, 108, 106, 110, 113, 116],
    drivers: ['Yield Strategy', 'DeFi Innovation'],
    confidence: 'medium'
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