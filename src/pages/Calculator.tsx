import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Home, UtensilsCrossed, ShoppingBag, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/lib/supabase";
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
  const [isSaving, setIsSaving] = useState(false);

  // Real-time calculation
  const total = sections.reduce((sum, s) => sum + values[s.key] * s.factor, 0);

  const saveReport = async () => {
    setIsSaving(true);
    const monthStr = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const { error } = await supabase.from('reports').insert([
      { month: monthStr, co2: Math.round(total), change: 0, status: 'Draft' }
    ]);
    setIsSaving(false);
    
    if (error) {
      toast.error(`Database Error: ${error.message}`);
    } else {
      toast.success("Footprint saved to Reports!", { description: `${total.toFixed(1)} kg CO₂/month` });
    }
  };

  const reset = () => {
    setValues({ transport: 120, electricity: 320, food: 8, shopping: 400 });
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
              <Button onClick={saveReport} disabled={isSaving} variant="hero" size="lg" className="flex-1 rounded-2xl h-14 text-base hover:scale-[1.02] transition-all shadow-glow">
                <Sparkles className="h-5 w-5 mr-2" /> {isSaving ? "Saving..." : "Save to Reports"}
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
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Your real-time footprint</div>
                <div className="font-display text-6xl font-bold gradient-text mt-3">
                  <AnimatedNumber value={total} decimals={1} />
                </div>
                <div className="text-lg font-semibold text-muted-foreground">kg CO₂ / month</div>

                <div className="mt-8 pt-6 border-t border-border/60">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-4">Monthly Usage Summary</div>
                  <div className="grid grid-cols-2 gap-3">
                    {sections.map(s => (
                      <div key={s.key} className="bg-muted/30 rounded-xl p-3 border border-border/40">
                        <div className="flex items-center gap-2 mb-1">
                          <s.icon className={`h-3 w-3 text-${s.color}`} />
                          <span className="text-[10px] font-medium text-muted-foreground">{s.label}</span>
                        </div>
                        <div className="text-sm font-bold">
                          {values[s.key as keyof typeof values]} 
                          <span className="text-[10px] ml-1 opacity-60">{s.unit.split('/')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Annual estimate</span>
                    <span className="font-semibold">{(total * 12).toFixed(0)} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trees needed/yr</span>
                    <span className="font-semibold">{Math.ceil(total * 12 / 21)} 🌳</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="font-semibold">AI tip: </span>
                      <span className="text-muted-foreground">
                        {total > 300 ? "Start with cutting 1 weekly car commute — biggest impact, lowest effort." : "Great work! Maintain habits and consider switching to renewable energy."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
