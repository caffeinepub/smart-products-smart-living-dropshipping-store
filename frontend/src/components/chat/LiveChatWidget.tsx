import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minus, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  from: 'user' | 'agent';
  time: string;
}

const AUTO_REPLIES: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ['shipping', 'delivery', 'ship', 'deliver'],
    reply: 'We offer free worldwide shipping on all orders! Standard delivery takes 7–14 business days. Express shipping (3–5 days) is available at checkout.',
  },
  {
    keywords: ['return', 'refund', 'exchange', 'money back'],
    reply: 'We have a 30-day hassle-free return policy. If you\'re not satisfied, contact us and we\'ll arrange a full refund or exchange.',
  },
  {
    keywords: ['payment', 'pay', 'stripe', 'paypal', 'card', 'upi'],
    reply: 'We accept all major credit/debit cards, PayPal, UPI, and Stripe. All transactions are secured with 256-bit SSL encryption.',
  },
  {
    keywords: ['track', 'order', 'status', 'where'],
    reply: 'You can track your order from your account dashboard. You\'ll also receive email updates with tracking information once your order ships.',
  },
  {
    keywords: ['discount', 'coupon', 'promo', 'offer', 'sale'],
    reply: 'Subscribe to our newsletter to get exclusive discount codes! We also run seasonal sales — check our homepage for current offers.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help'],
    reply: 'Hello! 👋 I\'m here to help. You can ask me about shipping, returns, payments, order tracking, or anything else!',
  },
];

const DEFAULT_REPLY = 'Thanks for reaching out! Our team will get back to you within 24 hours. Is there anything specific I can help you with right now?';

function getAutoReply(message: string): string {
  const lower = message.toLowerCase();
  for (const { keywords, reply } of AUTO_REPLIES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return reply;
    }
  }
  return DEFAULT_REPLY;
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi there! 👋 Welcome to SmartLiving Store. How can I help you today?',
      from: 'agent',
      time: getTime(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: nextId.current++, text, from: 'user', time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAutoReply(text);
      const agentMsg: Message = { id: nextId.current++, text: reply, from: 'agent', time: getTime() };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div
          className={`bg-card border border-border rounded-2xl shadow-card-hover w-80 flex flex-col overflow-hidden transition-all duration-200 ${
            isMinimized ? 'h-14' : 'h-96'
          }`}
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              <span className="text-sm font-semibold">Support Chat</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized((v) => !v)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        msg.from === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-secondary text-foreground rounded-bl-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border p-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 transition-colors"
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bubble */}
      <button
        onClick={() => { setIsOpen((v) => !v); setIsMinimized(false); }}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-card-hover flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open live chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
