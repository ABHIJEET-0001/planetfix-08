export const weeklyData = [
  { day: "Mon", co2: 12.4 },
  { day: "Tue", co2: 9.8 },
  { day: "Wed", co2: 14.2 },
  { day: "Thu", co2: 7.6 },
  { day: "Fri", co2: 11.1 },
  { day: "Sat", co2: 6.3 },
  { day: "Sun", co2: 5.4 },
];

export const monthlyData = [
  { month: "Jan", co2: 320 },
  { month: "Feb", co2: 280 },
  { month: "Mar", co2: 310 },
  { month: "Apr", co2: 240 },
  { month: "May", co2: 220 },
  { month: "Jun", co2: 195 },
  { month: "Jul", co2: 210 },
  { month: "Aug", co2: 180 },
  { month: "Sep", co2: 165 },
  { month: "Oct", co2: 150 },
  { month: "Nov", co2: 140 },
  { month: "Dec", co2: 128 },
];

export const categoryData = [
  { name: "Transport", value: 42, color: "hsl(152, 76%, 45%)" },
  { name: "Electricity", value: 28, color: "hsl(200, 95%, 50%)" },
  { name: "Food", value: 18, color: "hsl(168, 76%, 42%)" },
  { name: "Shopping", value: 12, color: "hsl(180, 60%, 55%)" },
];

export const recommendations = [
  { title: "Switch to public transport 2 days/week", impact: "−18 kg CO₂", icon: "🚌" },
  { title: "Reduce red meat consumption", impact: "−12 kg CO₂", icon: "🥗" },
  { title: "Unplug devices when idle", impact: "−6 kg CO₂", icon: "🔌" },
  { title: "Buy local produce this week", impact: "−4 kg CO₂", icon: "🥕" },
];

export const badges = [
  { name: "Green Starter", earned: true, icon: "🌱" },
  { name: "Tree Hugger", earned: true, icon: "🌳" },
  { name: "Eco Warrior", earned: true, icon: "⚔️" },
  { name: "Carbon Crusher", earned: false, icon: "💎" },
  { name: "Planet Saver", earned: false, icon: "🌍" },
  { name: "Zero Hero", earned: false, icon: "🏆" },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Sustainability Lead, Helio",
    quote: "EcoTrack AI made my team's emission reporting effortless. The dashboards feel like Apple-grade.",
    avatar: "SC",
  },
  {
    name: "Marcus Weber",
    role: "Climate Researcher",
    quote: "The AI recommendations are remarkably actionable. I've cut my footprint by 34% in three months.",
    avatar: "MW",
  },
  {
    name: "Priya Raman",
    role: "Founder, GreenLoop",
    quote: "Finally a carbon tracker that doesn't feel like a spreadsheet. Beautiful, fast, insightful.",
    avatar: "PR",
  },
];

export const faqs = [
  {
    q: "How does EcoTrack AI calculate my carbon footprint?",
    a: "We use peer-reviewed emission factors combined with your transport, energy, food and shopping inputs to produce a precise, personalized estimate.",
  },
  {
    q: "Is my data private?",
    a: "Yes — all calculations happen locally and your data is never sold or shared. Period.",
  },
  {
    q: "Can I export my reports?",
    a: "Absolutely. Download monthly reports as PDF or export raw data as CSV from the Reports page.",
  },
  {
    q: "Does the AI really help me reduce emissions?",
    a: "Our model surfaces the highest-impact, lowest-effort actions for your lifestyle — users average a 28% reduction in 90 days.",
  },
];

export const reports = [
  { month: "December 2024", co2: 128, change: -8.5, status: "On track" },
  { month: "November 2024", co2: 140, change: -6.7, status: "On track" },
  { month: "October 2024", co2: 150, change: -9.1, status: "On track" },
  { month: "September 2024", co2: 165, change: -8.3, status: "Improving" },
  { month: "August 2024", co2: 180, change: -14.3, status: "Improving" },
  { month: "July 2024", co2: 210, change: 7.7, status: "Above target" },
];
