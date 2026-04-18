import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { Leaf, TrendingDown, Target, Trophy, ArrowUpRight, Sparkles, TreePine } from "lucide-react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Reveal } from "@/components/Reveal";
import { Progress } from "@/components/ui/progress";
import { weeklyData, monthlyData, categoryData, recommendations, badges } from "@/data/mock";

const stats = [
  { label: "Total this month", value: 128, suffix: " kg", icon: Leaf, change: "-8.5%", color: "primary" },
  { label: "Daily average", value: 4.2, decimals: 1, suffix: " kg", icon: TrendingDown, change: "-12%", color: "secondary" },
  { label: "Green Score", value: 87, suffix: "/100", icon: Sparkles, change: "+5", color: "accent" },
  { label: "Goal Progress", value: 64, suffix: "%", icon: Target, change: "On track", color: "primary" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Welcome back, Alex 👋</h1>
            <p className="text-muted-foreground mt-1">Here's how your planet is doing today.</p>
          </div>
          <div className="glass rounded-xl px-4 py-2 text-sm">
            <span className="text-muted-foreground">Reporting period:</span>{" "}
            <span className="font-semibold">Dec 1 — Dec 31, 2024</span>
          </div>
        </div>
      </Reveal>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5 shadow-soft hover:shadow-elegant transition-all">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center glow-primary">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">{s.change}</span>
              </div>
              <div className="mt-4 font-display text-3xl font-bold">
                <AnimatedNumber value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-6 shadow-soft lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-lg font-bold">Weekly emissions</h3>
                <p className="text-xs text-muted-foreground">CO₂ output, last 7 days</p>
              </div>
              <span className="text-xs font-semibold text-primary">−14% vs last week</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={weeklyData}>
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Line type="monotone" dataKey="co2" stroke="url(#lg)" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass rounded-2xl p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold mb-1">By category</h3>
            <p className="text-xs text-muted-foreground mb-4">December breakdown</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4}>
                  {categoryData.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                    <span>{c.name}</span>
                  </div>
                  <span className="font-semibold">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Reveal delay={0.2}>
          <div className="glass rounded-2xl p-6 shadow-soft lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-lg font-bold">Monthly trend</h3>
                <p className="text-xs text-muted-foreground">CO₂ kg per month, 2024</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <defs>
                  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Bar dataKey="co2" fill="url(#bg)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        {/* AI Recommendations */}
        <Reveal delay={0.25}>
          <div className="glass rounded-2xl p-6 shadow-soft h-full">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-display text-lg font-bold">AI Recommendations</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Personalized actions</p>
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors cursor-pointer"
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{r.title}</div>
                    <div className="text-xs text-primary font-semibold">{r.impact}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Reveal delay={0.3}>
          <div className="glass rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold">Trees Saved</h3>
              </div>
              <span className="text-xs text-muted-foreground">All time</span>
            </div>
            <div className="font-display text-5xl font-bold gradient-text">
              <AnimatedNumber value={142} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Equivalent to a small forest 🌲 — keep going!</p>
            <div className="mt-4 grid grid-cols-12 gap-1">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className={`h-6 rounded ${i < 24 ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="glass rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold">Badge Progress</h3>
              </div>
              <span className="text-xs text-muted-foreground">3 of 6 earned</span>
            </div>
            <Progress value={50} className="h-2 mb-4" />
            <div className="grid grid-cols-3 gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                    b.earned ? "bg-primary/10 border-primary/30" : "bg-muted/40 border-border opacity-50"
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-[10px] font-semibold text-center">{b.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
