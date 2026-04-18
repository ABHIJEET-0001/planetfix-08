import { motion } from "framer-motion";
import { FileText, Download, FileSpreadsheet, TrendingDown, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { reports } from "@/data/mock";
import { toast } from "sonner";

export default function Reports() {
  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Reports & Exports</h1>
            <p className="text-muted-foreground mt-1">Download your full carbon history.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => toast.success("PDF export ready", { description: "Your report is being generated." })}
              variant="hero" className="rounded-xl">
              <Download className="h-4 w-4 mr-1" /> Download PDF
            </Button>
            <Button onClick={() => toast.success("CSV exported")} variant="outline" className="rounded-xl">
              <FileSpreadsheet className="h-4 w-4 mr-1" /> Export CSV
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Reports generated", value: "12", icon: FileText },
          { label: "YTD reduction", value: "−60%", icon: TrendingDown },
          { label: "Next report", value: "Jan 1, 2025", icon: Calendar },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="glass rounded-2xl p-5 shadow-soft flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center glow-primary">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="font-display text-2xl font-bold">{s.value}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Reports table */}
      <Reveal delay={0.15}>
        <div className="glass rounded-2xl shadow-soft overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <h3 className="font-display text-lg font-bold">Monthly reports</h3>
            <p className="text-xs text-muted-foreground">Click any row to view details</p>
          </div>
          <div className="divide-y divide-border/60">
            {reports.map((r, i) => {
              const positive = r.change < 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ backgroundColor: "hsl(var(--muted) / 0.4)" }}
                  className="grid grid-cols-12 items-center gap-4 p-5 cursor-pointer transition-colors"
                >
                  <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{r.month}</div>
                      <div className="text-xs text-muted-foreground">Full report</div>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-3">
                    <div className="text-xs text-muted-foreground">CO₂</div>
                    <div className="font-display text-xl font-bold">{r.co2} kg</div>
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <div className={`inline-flex items-center gap-1 text-sm font-semibold ${positive ? "text-primary" : "text-destructive"}`}>
                      {positive ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                      {Math.abs(r.change)}%
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-primary/10 text-primary">{r.status}</span>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex justify-end gap-1">
                    <Button size="icon" variant="ghost" className="rounded-lg h-9 w-9"
                      onClick={(e) => { e.stopPropagation(); toast.success(`${r.month} PDF ready`); }}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
