import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Send, Slack, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function SubscriptionFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'slack' | 'telegram' | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [telegramToken, setTelegramToken] = useState('');
  const [chatId, setChatId] = useState('');

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log('Subscription setup:', {
      platform: selectedPlatform,
      webhookUrl,
      telegramToken,
      chatId
    });
    setIsOpen(false);
    // Show success toast
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="rounded-full h-14 w-14 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-2xl glow-primary"
            >
              <Bell className="h-6 w-6" />
            </Button>
          </motion.div>
        </DialogTrigger>

        <DialogContent className="glass-elevated sm:max-w-md border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Subscribe to Alerts
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Choose Platform</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={selectedPlatform === 'slack' ? 'default' : 'outline'}
                  className="h-auto p-4"
                  onClick={() => setSelectedPlatform('slack')}
                >
                  <div className="text-center">
                    <Slack className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm">Slack</div>
                  </div>
                </Button>
                <Button
                  variant={selectedPlatform === 'telegram' ? 'default' : 'outline'}
                  className="h-auto p-4"
                  onClick={() => setSelectedPlatform('telegram')}
                >
                  <div className="text-center">
                    <Send className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm">Telegram</div>
                  </div>
                </Button>
              </div>
            </div>

            <Separator />

            {/* Configuration Forms */}
            <AnimatePresence mode="wait">
              {selectedPlatform === 'slack' && (
                <motion.div
                  key="slack"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <Label htmlFor="webhook-url">Slack Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://hooks.slack.com/services/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="font-jetbrains text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a webhook in your Slack workspace settings
                  </p>
                </motion.div>
              )}

              {selectedPlatform === 'telegram' && (
                <motion.div
                  key="telegram"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <div>
                    <Label htmlFor="bot-token">Bot Token</Label>
                    <Input
                      id="bot-token"
                      placeholder="1234567890:ABCDEFghijklmnopqrstuvwxyz"
                      value={telegramToken}
                      onChange={(e) => setTelegramToken(e.target.value)}
                      className="font-jetbrains text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="chat-id">Chat ID</Label>
                    <Input
                      id="chat-id"
                      placeholder="-1001234567890"
                      value={chatId}
                      onChange={(e) => setChatId(e.target.value)}
                      className="font-jetbrains text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Message @BotFather to create a bot and get your token
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Alert Types */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Alert Types</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  High Probability (≥80%)
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Volume Spikes
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  News Events
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubscribe}
                disabled={!selectedPlatform || 
                  (selectedPlatform === 'slack' && !webhookUrl) ||
                  (selectedPlatform === 'telegram' && (!telegramToken || !chatId))
                }
              >
                Subscribe
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}