import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

type Confetti = { id: number; x: number; y: number; emoji: string; dx: number; dy: number };
type Recommendation = { id: string; title: string; impact: string; kg: number; icon: string };

const CELEBRATE_EMOJIS = ["🎉", "✨", "🌱", "💚", "🌍", "⭐"];

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [committed, setCommitted] = useState<Record<string, boolean>>({});
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('recommendations').select('*').order('id');
      if (data) setRecommendations(data);
    }
    fetchData();
  }, []);

  const totalKg = useMemo(
    () => recommendations.reduce((sum, r) => sum + r.kg, 0),
    [recommendations]
  );
  const savedKg = useMemo(
    () => recommendations.reduce((sum, r) => (committed[r.id] ? sum + r.kg : sum), 0),
    [committed, recommendations]
  );
  const progress = Math.round((savedKg / totalKg) * 100);
  const committedCount = Object.values(committed).filter(Boolean).length;

  const burst = (originX: number, originY: number) => {
    const pieces: Confetti[] = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: originX,
      y: originY,
      emoji: CELEBRATE_EMOJIS[i % CELEBRATE_EMOJIS.length],
      dx: (Math.random() - 0.5) * 220,
      dy: -Math.random() * 180 - 40,
    }));
    setConfetti((prev) => [...prev, ...pieces]);
    setTimeout(() => {
      setConfetti((prev) => prev.filter((p) => !pieces.find((np) => np.id === p.id)));
    }, 1400);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    r: Recommendation
  ) => {
    const isCommitted = !!committed[r.id];
    setCommitted((prev) => ({ ...prev, [r.id]: !isCommitted }));

    if (!isCommitted) {
      const rect = e.currentTarget.getBoundingClientRect();
      const parentRect = e.currentTarget.offsetParent?.getBoundingClientRect();
      const x = rect.left - (parentRect?.left ?? 0) + rect.width / 2;
      const y = rect.top - (parentRect?.top ?? 0) + rect.height / 2;
      burst(x, y);
      toast({
        title: `Committed! ${r.icon}`,
        description: `Saving ${r.kg} kg CO₂ — keep it up!`,
      });
    }
  };

  const reset = () => {
    setCommitted({});
    toast({ title: "Reset", description: "All commitments cleared." });
  };

  return (
    <div className="glass rounded-2xl p-6 shadow-soft h-full relative overflow-hidden">
      {/* Confetti layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              initial={{ x: c.x, y: c.y, opacity: 1, scale: 0.6, rotate: 0 }}
              animate={{
                x: c.x + c.dx,
                y: c.y + c.dy + 200,
                opacity: 0,
                scale: 1.2,
                rotate: (Math.random() - 0.5) * 540,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="absolute top-0 left-0 text-2xl"
              style={{ willChange: "transform" }}
            >
              {c.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mb-1 relative">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-display text-lg font-bold">AI Recommendations</h3>
        </div>
        {committedCount > 0 && (
          <button
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-4">Tap to commit — every action counts</p>

      {/* Progress */}
      <div className="mb-5 relative">
        <div className="flex items-baseline justify-between mb-1.5">
          <div className="text-xs text-muted-foreground">
            Committed savings
          </div>
          <motion.div
            key={savedKg}
            initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="font-display text-sm font-bold"
          >
            <span className="gradient-text">{savedKg} kg</span>
            <span className="text-muted-foreground font-normal"> / {totalKg} kg</span>
          </motion.div>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="h-full gradient-bg rounded-full glow-primary"
          />
        </div>
      </div>

      <div className="space-y-3 relative">
        {recommendations.map((r) => {
          const isCommitted = !!committed[r.id];
          return (
            <motion.div
              key={r.id}
              onClick={(e) => handleClick(e, r)}
              whileHover={{ x: isCommitted ? 0 : 4 }}
              whileTap={{ scale: 0.97 }}
              animate={
                isCommitted
                  ? { backgroundColor: "hsl(var(--primary) / 0.12)" }
                  : { backgroundColor: "hsl(var(--muted) / 0.4)" }
              }
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                isCommitted ? "border-primary/40" : "border-transparent hover:border-border"
              }`}
            >
              <motion.span
                animate={isCommitted ? { scale: [1, 1.4, 1], rotate: [0, 15, -10, 0] } : { scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl"
              >
                {r.icon}
              </motion.span>
              <div className="flex-1 min-w-0">
                <div
                  className={`font-medium text-sm truncate transition-all ${
                    isCommitted ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {r.title}
                </div>
                <div className="text-xs text-primary font-semibold">{r.impact}</div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {isCommitted ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="h-6 w-6 rounded-full gradient-bg flex items-center justify-center glow-primary shrink-0"
                  >
                    <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="arrow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm font-semibold gradient-text"
        >
          🎉 All in! You're a Planet Saver.
        </motion.div>
      )}
    </div>
  );
}
