import { motion } from "framer-motion";
import { Moon, Sun, Bell, Mail, Globe, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/Reveal";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { theme, toggle } = useTheme();
  const [notifs, setNotifs] = useState({ email: true, push: true, weekly: false });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Reveal>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Profile & Settings</h1>
          <p className="text-muted-foreground mt-1">Personalize your PlanetFix experience.</p>
        </div>
      </Reveal>

      {/* Profile card */}
      <Reveal delay={0.05}>
        <div className="glass rounded-2xl p-6 shadow-soft flex flex-col sm:flex-row items-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="h-24 w-24 rounded-full gradient-bg flex items-center justify-center text-3xl font-display font-bold text-primary-foreground glow-primary shrink-0">
            AK
          </motion.div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display text-2xl font-bold">Alex Kim</h2>
            <p className="text-muted-foreground">alex.kim@planetfix.app</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-primary/10 text-primary">🌱 Green Starter</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-secondary/10 text-secondary">28-day streak</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-accent/10 text-accent-foreground">Lvl 7</span>
            </div>
          </div>
          <Button variant="outline" className="rounded-xl">Edit profile</Button>
        </div>
      </Reveal>

      {/* Account info */}
      <Reveal delay={0.1}>
        <div className="glass rounded-2xl p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold mb-5">Account</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Alex Kim" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex.kim@planetfix.app" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" defaultValue="San Francisco, CA" className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="cur">Currency</Label>
              <Input id="cur" defaultValue="USD" className="mt-1.5 rounded-xl" />
            </div>
          </div>
          <Button onClick={() => toast.success("Profile saved")} className="mt-5 rounded-xl" variant="hero">Save changes</Button>
        </div>
      </Reveal>

      {/* Preferences */}
      <Reveal delay={0.15}>
        <div className="glass rounded-2xl p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold mb-5">Preferences</h3>
          <div className="space-y-4">
            <Row icon={theme === "dark" ? Moon : Sun} title="Theme" desc="Switch between light and dark mode">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground capitalize">{theme}</span>
                <Switch checked={theme === "dark"} onCheckedChange={toggle} />
              </div>
            </Row>
            <Row icon={Bell} title="Push notifications" desc="Daily reminders and weekly summaries">
              <Switch checked={notifs.push} onCheckedChange={(v) => setNotifs({ ...notifs, push: v })} />
            </Row>
            <Row icon={Mail} title="Email digests" desc="Receive monthly impact reports">
              <Switch checked={notifs.email} onCheckedChange={(v) => setNotifs({ ...notifs, email: v })} />
            </Row>
            <Row icon={Globe} title="Public profile" desc="Let friends see your green score">
              <Switch checked={notifs.weekly} onCheckedChange={(v) => setNotifs({ ...notifs, weekly: v })} />
            </Row>
          </div>
        </div>
      </Reveal>

      {/* Danger */}
      <Reveal delay={0.2}>
        <div className="glass rounded-2xl p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Privacy & Data
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Your data is encrypted and never shared.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Data export started")}>Export my data</Button>
            <Button variant="outline" className="rounded-xl text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Row({
  icon: Icon, title, desc, children,
}: { icon: React.ElementType; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground truncate">{desc}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
