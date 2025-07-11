import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TradingPair } from '@/components/layout/DashboardLayout';

interface DetailDrawerProps {
  isOpen: boolean;
  selectedPair: TradingPair | null;
  onClose: () => void;
}

export function DetailDrawer({ isOpen, selectedPair, onClose }: DetailDrawerProps) {
  if (!selectedPair) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="col-span-3 fixed right-0 top-16 h-[calc(100vh-64px)] z-50"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 1, 0.5, 1] // ease-out-quart
          }}
        >
          <Card className="glass-elevated h-full w-96 border-l-2 border-primary/20">
            {/* Header */}
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {selectedPair.symbol}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">Probability</div>
                  <div className="text-lg font-jetbrains font-bold text-neon-emerald">
                    {(selectedPair.probability * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">ETA</div>
                  <div className="text-lg font-jetbrains font-bold">
                    {selectedPair.eta.toFixed(1)}h
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-[calc(100%-140px)]">
              <Tabs defaultValue="chart" className="h-full">
                <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
                  <TabsTrigger value="chart" className="text-xs">Chart</TabsTrigger>
                  <TabsTrigger value="drivers" className="text-xs">Drivers</TabsTrigger>
                  <TabsTrigger value="technical" className="text-xs">Technical</TabsTrigger>
                </TabsList>

                <TabsContent value="chart" className="p-4 h-full">
                  {/* TradingView Chart Placeholder */}
                  <div className="bg-muted/20 rounded-lg h-64 flex items-center justify-center mb-4">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">TradingView Chart</p>
                      <p className="text-xs">Integration Required</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">24h Volume</span>
                      <span className="font-jetbrains text-neon-emerald">
                        +{selectedPair.volume24h.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Funding Rate</span>
                      <span className={`font-jetbrains ${
                        selectedPair.funding > 0 ? 'text-neon-emerald' : 'text-error-rose'
                      }`}>
                        {selectedPair.funding > 0 ? '+' : ''}{(selectedPair.funding * 100).toFixed(3)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Open Interest Δ</span>
                      <span className={`font-jetbrains ${
                        selectedPair.openInterestDelta > 0 ? 'text-neon-emerald' : 'text-error-rose'
                      }`}>
                        {selectedPair.openInterestDelta > 0 ? '+' : ''}{selectedPair.openInterestDelta.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="drivers" className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Key Drivers
                      </h3>
                      <div className="space-y-2">
                        {selectedPair.drivers.map((driver, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-2 bg-muted/20 rounded"
                          >
                            <span className="text-sm">{driver}</span>
                            <Badge variant="secondary" className="font-jetbrains text-xs">
                              {Math.floor(Math.random() * 40 + 60)}%
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">SHAP Analysis</h3>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground mb-2">Feature Importance</div>
                        {[
                          { name: 'Volume Spike', impact: 0.34 },
                          { name: 'Funding Rate', impact: 0.28 },
                          { name: 'Social Sentiment', impact: 0.19 },
                          { name: 'Price Action', impact: 0.12 },
                          { name: 'Whale Activity', impact: 0.07 }
                        ].map((feature, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{feature.name}</span>
                              <span className="font-jetbrains">{(feature.impact * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-1">
                              <motion.div
                                className="h-1 bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${feature.impact * 100}%` }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="technical" className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Technical Indicators</h3>
                      
                      {/* Bollinger Bands */}
                      <div className="p-3 bg-muted/20 rounded-lg mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Bollinger Bands Width</span>
                          <Badge variant="outline" className="text-warning-amber border-warning-amber">
                            Squeeze
                          </Badge>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div className="w-[25%] h-2 bg-warning-amber rounded-full"></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 font-jetbrains">0.025</div>
                      </div>

                      {/* ADX */}
                      <div className="p-3 bg-muted/20 rounded-lg mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">ADX (Trend Strength)</span>
                          <Badge variant="outline" className="text-neon-emerald border-neon-emerald">
                            Strong
                          </Badge>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div className="w-[72%] h-2 bg-neon-emerald rounded-full"></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 font-jetbrains">36.2</div>
                      </div>

                      {/* ATR */}
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">ATR (Volatility)</span>
                          <Badge variant="outline" className="text-error-rose border-error-rose">
                            High
                          </Badge>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div className="w-[68%] h-2 bg-error-rose rounded-full"></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 font-jetbrains">0.034</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Support & Resistance</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resistance</span>
                          <span className="font-jetbrains text-error-rose">$45,250</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current</span>
                          <span className="font-jetbrains">$44,180</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Support</span>
                          <span className="font-jetbrains text-neon-emerald">$43,800</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}