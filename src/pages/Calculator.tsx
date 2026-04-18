import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Home, UtensilsCrossed, ShoppingBag, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "@/components/Reveal";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { toast } from "sonner";

const sections = [
  { key: "transport", label: "Transport", icon: Car, unit: "km/week", min: 0, max: 500, factor: 0.21, color: "primary" },
  { key: "electricity", label: "Electricity", icon: Home, unit: "kWh/month", min: 0, max: 1000, factor: 0.05, color: "secondary" },
  { key: "food", label: "Food (meat servings)", icon: UtensilsCrossed, unit: "/week", min: 0, max: 30, factor: 1.6, color: "accent" },
  { key: "shopping", label: "Shopping", icon: ShoppingBag, unit: "$/month", min: 0, max: 2000, factor: 0.012, color: "primary" },
] as const;

export default function Calculator() {
  const [values, setValues] = useState<Record<string, number>>({
    transport: 120, electricity: 320, food: 8, shopping: 400,
  });
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const total = sections.reduce((sum, s) => sum + values[s.key] * s.factor, 0);
    setResult(total);
    toast.success("Footprint calculated!", { description: `${total.toFixed(1)} kg CO₂/month` });
  };

  const reset = () => {
    setValues({ transport: 120, electricity: 320, food: 8, shopping: 400 });
    setResult(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Reveal>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Carbon Calculator</h1>
          <p className="text-muted-foreground mt-1">Adjust the sliders to estimate your monthly CO₂ output.</p>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {sections.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center glow-primary">
                      <s.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">{s.label}</div>
                      <div className="text-xs text-muted-foreground">{s.unit}</div>
                    </div>
                  </div>
                  <div className="font-display text-2xl font-bold">{values[s.key]}</div>
                </div>
                <Slider
                  value={[values[s.key]]}
                  min={s.min}
                  max={s.max}
                  step={1}
                  onValueChange={(v) => setValues({ ...values, [s.key]: v[0] })}
                />
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="flex gap-3">
              <Button onClick={calculate} variant="hero" size="lg" className="flex-1 rounded-2xl h-14 text-base">
                <Sparkles className="h-5 w-5 mr-2" /> Calculate Footprint
              </Button>
              <Button onClick={reset} variant="outline" size="lg" className="rounded-2xl h-14">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Result card */}
        <div className="lg:col-span-2">
          <Reveal delay={0.2}>
            <div className="sticky top-24 glass rounded-3xl p-8 shadow-elegant overflow-hidden relative">
              <div className="absolute inset-0 bg-radial-glow opacity-50" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Your monthly footprint</div>
                <AnimatePresence mode="wait">
                  {result !== null ? (
                    <motion.div
                      key="result"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <div className="font-display text-6xl font-bold gradient-text mt-3">
                        <AnimatedNumber value={result} decimals={1} />
                      </div>
                      <div className="text-lg font-semibold text-muted-foreground">kg CO₂ / month</div>

                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Annual estimate</span>
                          <span className="font-semibold">{(result * 12).toFixed(0)} kg</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Trees needed/yr</span>
                          <span className="font-semibold">{Math.ceil(result * 12 / 21)} 🌳</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">vs avg person</span>
                          <span className="font-semibold text-primary">
                            {result < 350 ? `${Math.round((1 - result / 350) * 100)}% lower` : `${Math.round((result / 350 - 1) * 100)}% higher`}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <div className="text-sm">
                            <span className="font-semibold">AI tip: </span>
                            <span className="text-muted-foreground">
                              {result > 300 ? "Start with cutting 1 weekly car commute — biggest impact, lowest effort." : "Great work! Maintain habits and consider switching to renewable energy."}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="font-display text-6xl font-bold text-muted-foreground/40 mt-3">—</div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Adjust your habits and hit <span className="font-semibold text-foreground">Calculate</span> to see your real impact.
                      </p>
                      <div className="mt-8 h-40 rounded-2xl bg-muted/40 border border-dashed border-border flex items-center justify-center text-4xl">
                        🌍
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
