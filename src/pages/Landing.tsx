import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf, ArrowRight, Sparkles, BarChart3, Brain, Shield, Zap, TreePine,
  ChevronDown, Twitter, Github, Linkedin, Moon, Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { useTheme } from "@/hooks/use-theme";
import { testimonials, faqs } from "@/data/mock";

export default function Landing() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="container mx-auto px-4 mt-4">
          <nav className="glass rounded-2xl flex items-center justify-between px-4 py-3 shadow-soft">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center glow-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">EcoTrack <span className="gradient-text">AI</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition">Features</a>
              <a href="#how" className="hover:text-foreground transition">How it works</a>
              <a href="#testimonials" className="hover:text-foreground transition">Testimonials</a>
              <a href="#faq" className="hover:text-foreground transition">FAQ</a>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggle} className="rounded-xl">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button asChild variant="hero" size="sm" className="rounded-xl">
                <Link to="/dashboard">Open App <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6 text-xs font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>AI-powered. Privacy-first.</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
                  Track Today.<br />
                  <span className="gradient-text">Save Tomorrow.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground max-w-lg text-balance">
                  The most beautiful AI carbon tracker. Visualize your impact, get personalized actions, and watch your footprint shrink — quarter after quarter.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="hero" className="rounded-2xl text-base h-14 px-7">
                    <Link to="/dashboard">Explore Dashboard <ArrowRight className="h-5 w-5 ml-1" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-2xl text-base h-14 px-7">
                    <Link to="/calculator">Try Calculator</Link>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
                  <div><span className="text-2xl font-display font-bold text-foreground">142k</span><div>users tracking</div></div>
                  <div className="h-10 w-px bg-border" />
                  <div><span className="text-2xl font-display font-bold text-foreground">2.8M</span><div>tons CO₂ tracked</div></div>
                  <div className="h-10 w-px bg-border" />
                  <div><span className="text-2xl font-display font-bold text-foreground">28%</span><div>avg. reduction</div></div>
                </div>
              </Reveal>
            </div>

            {/* Animated Earth */}
            <Reveal delay={0.2}>
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-full gradient-bg blur-3xl opacity-40 animate-pulse-glow" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border-2 border-dashed border-primary/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-16 rounded-full border border-secondary/30"
                />
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden shadow-elegant"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, hsl(200 95% 65%), hsl(200 95% 35%) 40%, hsl(160 50% 20%) 80%)",
                      boxShadow: "inset -30px -30px 80px rgba(0,0,0,0.4), 0 30px 80px hsl(152 76% 38% / 0.5)",
                    }}>
                    <div className="absolute inset-0 opacity-70" style={{
                      background: "radial-gradient(ellipse 40% 30% at 25% 40%, hsl(120 60% 30%), transparent 60%), radial-gradient(ellipse 30% 25% at 70% 55%, hsl(120 50% 35%), transparent 60%), radial-gradient(ellipse 25% 20% at 50% 75%, hsl(120 60% 30%), transparent 60%)",
                    }} />
                    <div className="absolute inset-0" style={{
                      background: "radial-gradient(circle at 25% 25%, hsl(0 0% 100% / 0.3), transparent 50%)",
                    }} />
                  </div>
                </motion.div>
                {[
                  { icon: "🌱", x: "8%", y: "20%", d: 0 },
                  { icon: "💧", x: "85%", y: "30%", d: 1 },
                  { icon: "☀️", x: "10%", y: "75%", d: 2 },
                  { icon: "🌳", x: "82%", y: "78%", d: 1.5 },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    transition={{ delay: 0.5 + b.d * 0.2, duration: 4, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                    style={{ left: b.x, top: b.y }}
                    className="absolute h-12 w-12 rounded-2xl glass flex items-center justify-center text-xl shadow-elegant"
                  >
                    {b.icon}
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Why it matters</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">A planet measured is a planet saved.</h2>
              <p className="mt-4 text-muted-foreground text-lg">Every kilo of CO₂ avoided counts. EcoTrack turns invisible emissions into a story you can act on.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "37%", t: "of global emissions come from individual lifestyle choices.", color: "primary" },
              { n: "1.5°C", t: "is the warming threshold we must stay under by 2050.", color: "secondary" },
              { n: "10 yrs", t: "is the window we have to make meaningful change. The clock is ticking.", color: "accent" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass rounded-3xl p-8 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1 duration-500">
                  <div className="font-display text-5xl font-bold gradient-text mb-3">{s.n}</div>
                  <p className="text-muted-foreground">{s.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">Designed for clarity. Built for action.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI Recommendations", desc: "Personalized, high-impact actions based on your real lifestyle data." },
              { icon: BarChart3, title: "Beautiful Analytics", desc: "Apple-grade charts that make your impact instantly understandable." },
              { icon: Zap, title: "Instant Calculator", desc: "Get a precise footprint estimate in under 30 seconds." },
              { icon: TreePine, title: "Trees Saved Tracker", desc: "Watch your virtual forest grow as your emissions shrink." },
              { icon: Shield, title: "Privacy First", desc: "Your data stays yours. Always. No tracking, no selling, no compromise." },
              { icon: Sparkles, title: "Goals & Streaks", desc: "Gamified targets and badges that keep you motivated month after month." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group glass rounded-3xl p-7 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1 duration-500 h-full">
                  <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center glow-primary mb-5 group-hover:scale-110 transition-transform">
                    <f.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 relative">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">Three steps. Real impact.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              { n: "01", t: "Input your habits", d: "Quick survey on transport, energy, food and shopping." },
              { n: "02", t: "See your footprint", d: "Live dashboards reveal where your impact really comes from." },
              { n: "03", t: "Reduce with AI", d: "Get tailored actions and watch your numbers drop weekly." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass rounded-3xl p-8 shadow-soft hover:shadow-elegant transition-all duration-500 h-full">
                  <div className="font-display text-6xl font-bold gradient-text mb-4">{s.n}</div>
                  <h3 className="font-display text-2xl font-bold mb-2">{s.t}</h3>
                  <p className="text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Loved by changemakers</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">Trusted by people who care.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass rounded-3xl p-7 shadow-soft h-full hover:shadow-elegant transition-all duration-500">
                  <p className="text-foreground/90 text-lg leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 relative">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">Questions, answered.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="glass rounded-3xl p-2 shadow-soft">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40 last:border-0 px-4">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-20 text-center text-primary-foreground shadow-elegant">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)" }} />
              <h2 className="relative font-display text-4xl md:text-6xl font-bold text-balance">Start your journey to net-zero.</h2>
              <p className="relative mt-4 text-lg opacity-90 max-w-xl mx-auto">It takes 30 seconds. The planet will thank you for the next 30 years.</p>
              <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" variant="secondary" className="rounded-2xl h-14 px-8 text-base">
                  <Link to="/dashboard">Open Dashboard <ArrowRight className="h-5 w-5 ml-1" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-2xl h-14 px-8 text-base bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/calculator">Calculate Now</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-12 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">EcoTrack <span className="gradient-text">AI</span></span>
            <span className="text-sm text-muted-foreground ml-2">© 2025</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
            <div className="flex items-center gap-3 ml-2">
              <Twitter className="h-4 w-4 hover:text-foreground cursor-pointer" />
              <Github className="h-4 w-4 hover:text-foreground cursor-pointer" />
              <Linkedin className="h-4 w-4 hover:text-foreground cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
