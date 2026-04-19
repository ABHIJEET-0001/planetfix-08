import { motion } from "framer-motion";
import { FileText, Download, FileSpreadsheet, TrendingDown, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Report = { id: number; month: string; co2: number; change: number; status: string };

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);

  const exportCSV = () => {
    const headers = "ID,Month,CO2 Output (kg),Change (%),Status\n";
    const body = reports.map(r => `${r.id},${r.month},${r.co2},${r.change},${r.status}`).join("\n");
    const blob = new Blob([headers + body], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PlanetFix_Reports.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("CSV exported successfully and saved to Downloads.");
  };

  const exportSummaryPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("PlanetFix Eco AI", 14, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Full Carbon History Report", 14, 30);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    autoTable(doc, {
      startY: 45,
      headStyles: { fillColor: [8, 175, 114] },
      head: [['Month', 'CO2 (kg)', 'Change (%)', 'Status']],
      body: reports.map(r => [r.month, r.co2, Math.abs(r.change) + "% " + (r.change < 0 ? "Down" : "Up"), r.status]),
    });
    doc.save("PlanetFix_Summary.pdf");
    toast.success("Summary PDF downloaded to your files!");
  };

  const exportSinglePDF = (e: React.MouseEvent, r: Report) => {
    e.stopPropagation();
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(`PlanetFix Footprint Report`, 14, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Period: ${r.month}`, 14, 30);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    autoTable(doc, {
      startY: 45,
      headStyles: { fillColor: [8, 175, 114] },
      head: [['Metric', 'Value']],
      body: [
        ['Month', r.month],
        ['CO2 Output', `${r.co2} kg`],
        ['Change', `${Math.abs(r.change)}% ${r.change < 0 ? "Reduction" : "Increase"}`],
        ['Status', r.status]
      ]
    });
    doc.save(`PlanetFix_${r.month.replace(" ", "_")}.pdf`);
    toast.success(`${r.month} PDF downloaded to your files!`);
  };

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('reports').select('*').order('id');
      if (error) {
        console.error("Supabase Error:", error);
        toast.error(`Database Error: ${error.message}`);
      }
      if (data) setReports(data);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Reports & Exports</h1>
            <p className="text-muted-foreground mt-1">Download your full carbon history.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportSummaryPDF} variant="hero" className="rounded-xl">
              <Download className="h-4 w-4 mr-1" /> Download PDF
            </Button>
            <Button onClick={exportCSV} variant="outline" className="rounded-xl">
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
                    <Button size="icon" variant="ghost" className="rounded-lg h-9 w-9 shadow-none hover:bg-muted"
                      onClick={(e) => exportSinglePDF(e, r)} title="Download Report PDF">
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
