import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEcoChatSession } from "@/lib/gemini";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chatbot_open') === 'true';
    }
    return false;
  });
  
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('chatbot_history');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn("Could not parse chatbot history:", e);
      }
    }
    return [{ role: 'model', text: "Hi! I'm PlanetFix AI 🌱. How can I help you reduce your carbon footprint today?" }];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatbot_open', isOpen.toString());
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('chatbot_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    try {
      const session = getEcoChatSession();
      // Restore history to session if needed (Gemini SDK chat handles history internally if started with it)
      setChatSession(session);
    } catch (e) {
      console.error("Gemini initialization error:", e);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage(userMsg);
      const text = result.response.text();
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Ensure your API key is correct." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-glow"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full p-0 flex items-center justify-center hover:scale-105 transition-transform"
              variant="hero"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] glass shadow-elegant border border-primary/20 rounded-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-bg p-4 text-primary-foreground flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-xl">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight">PlanetFix AI</h3>
                  <div className="text-xs opacity-90 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></span> 
                    Online Expert
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 hover:text-white h-8 w-8 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/60 backdrop-blur-md">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-md' 
                      : 'bg-card text-card-foreground border border-border shadow-soft rounded-tl-sm'
                  }`}>
                    {msg.role === 'model' ? (
                       <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/10 prose-pre:text-foreground">
                         <ReactMarkdown>{msg.text}</ReactMarkdown>
                       </div>
                    ) : (
                       msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-card border border-border mt-1 shadow-soft rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center">
                     <span className="w-2 h-2 bg-primary/60 animate-bounce rounded-full"></span>
                     <span className="w-2 h-2 bg-primary/80 animate-bounce rounded-full-[0.15s]"></span>
                     <span className="w-2 h-2 bg-primary animate-bounce rounded-full-[0.3s]"></span>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-3 bg-card/80 backdrop-blur-md border-t border-border flex gap-2 shrink-0 items-center">
              <Input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                placeholder="Ask your climate expert..."
                className="rounded-xl border-border bg-background focus-visible:ring-primary h-12 shadow-sm"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-xl h-12 w-12 shrink-0 shadow-sm" variant="hero">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 ml-0.5" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
