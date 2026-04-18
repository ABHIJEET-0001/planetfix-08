import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Flame, Trophy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "@/components/Reveal";
import { badges } from "@/data/mock";
import { toast } from "sonner";

const goals = [
  { name: "Reduce monthly CO₂ by 20%", current: 14, target: 20, unit: "%" },
  { name: "Walk/bike 4 days a week", current: 3, target: 4, unit: " days" },
  { name: "Plant-based meals/week", current: 9, target: 12, unit: " meals" },
  { name: "Reduce electricity by 15%", current: 8, target: 15, unit: "%" },
];

export default function Goals() {
  const [target, setTarget] = useState([20]);

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Goals & Achievements</h1>
            <p className="text-muted-foreground mt-1">Set targets, build streaks, earn badges.</p>
          </div>
          <Button variant="hero" className="rounded-xl">
            <Plus className="h-4 w-4 mr-1" /> New goal
          </Button>
        </div>
      </Reveal>

      {/* Top row: target + streak */}
      <div className="grid md:grid-cols-3 gap-4">
        <Reveal delay={0.05}>
          <div className="glass rounded-2xl p-6 shadow-soft md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">Set monthly reduction target</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">How much CO₂ do you want to cut this month?</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-6xl font-bold gradient-text">{target[0]}</span>
              <span className="text-muted-foreground font-semibold">% reduction</span>
            </div>
            <Slider value={target} min={5} max={50} step={1} onValueChange={setTarget} />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>5% (gentle)</span>
              <span>25% (ambitious)</span>
              <span>50% (heroic)</span>
            </div>
            <Button onClick={() => toast.success(`Target set to ${target[0]}%`)} className="mt-6 rounded-xl" variant="hero">
              Save target
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-6 shadow-soft text-center flex flex-col justify-center">
            <Flame className="h-10 w-10 mx-auto text-primary mb-2" />
            <div className="font-display text-6xl font-bold gradient-text">28</div>
            <div className="text-sm font-semibold mt-1">day streak</div>
            <p className="text-xs text-muted-foreground mt-2">You're on fire! Don't break the chain 🔥</p>
            <div className="grid grid-cols-7 gap-1 mt-4">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="h-3 rounded-sm gradient-bg" />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Active goals */}
      <Reveal delay={0.15}>
        <div className="glass rounded-2xl p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold mb-5">Active goals</h3>
          <div className="space-y-5">
            {goals.map((g, i) => {
              const pct = (g.current / g.target) * 100;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{g.name}</span>
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{g.current}</span>
                      {" / "}
                      {g.target}{g.unit}
                    </span>
                  </div>
                  <Progress value={pct} className="h-2.5" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Badges */}
      <Reveal delay={0.2}>
        <div className="glass rounded-2xl p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-bold">Achievement badges</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`relative rounded-2xl p-5 text-center border-2 transition-all ${
                  b.earned
                    ? "bg-primary/10 border-primary/30 shadow-soft"
                    : "bg-muted/30 border-dashed border-border opacity-60"
                }`}
              >
                <div className="text-4xl mb-2">{b.icon}</div>
                <div className="text-sm font-semibold">{b.name}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{b.earned ? "Earned" : "Locked"}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
