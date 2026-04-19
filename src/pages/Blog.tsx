import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowRight, BookOpen, Sparkles, Leaf, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";

export const BLOG_POSTS = [
  {
    id: "benefits-of-green-living",
    title: "Green Living, Better Health: The Personal Benefits of Eco-Choices",
    excerpt: "Discover how reducing your carbon footprint isn't just good for the planet—it's a game changer for your physical health and finances.",
    category: "Benefits",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    date: "April 18, 2024",
    readTime: "5 min read",
    author: "Dr. Sarah Eco"
  },
  {
    id: "ai-revolution-carbon-tracking",
    title: "The AI Revolution in Carbon Tracking: How PlanetFix Works",
    excerpt: "An inside look at how our advanced algorithms calculate your impact and why precision matters in the fight against climate change.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "April 15, 2024",
    readTime: "8 min read",
    author: "PlanetFix Engineering"
  },
  {
    id: "zero-waste-hacks-2024",
    title: "10 Zero-Waste Hacks That Actually Save You Money",
    excerpt: "Stop spending on disposables. These actionable tips will help you shrink your bin and grow your savings account simultaneously.",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1591193052657-3f8bc9904d00?auto=format&fit=crop&q=80&w=800",
    date: "April 12, 2024",
    readTime: "6 min read",
    author: "Eco Guru Alex"
  },
  {
    id: "sustainable-travel-guide",
    title: "The Ultimate Guide to Sustainable Travel in 2024",
    excerpt: "See the world without leaving a trace. From eco-resorts to low-carbon transport, here is how you travel responsibly.",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
    date: "April 10, 2024",
    readTime: "10 min read",
    author: "Traveler Tom"
  },
  {
    id: "why-clean-energy-matters",
    title: "Why Clean Energy is the Biggest Lever You Can Pull",
    excerpt: "Switching to renewable energy sources can reduce your footprint by up to 50% overnight. Here is how to make the transition.",
    category: "Benefits",
    image: "https://images.unsplash.com/photo-1466611653911-95282fc3656b?auto=format&fit=crop&q=80&w=800",
    date: "April 05, 2024",
    readTime: "7 min read",
    author: "Energy Expert Mike"
  }
];

const categories = ["All", "Benefits", "Guides", "Technology", "News"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-primary/20">
              Knowledge Base
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Sustainability <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Explore professional articles, expert guides, and the latest in eco-friendly technology. Learn how to maximize your positive impact on the planet.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 rounded-xl h-12 bg-background/50 border-border/60 focus-visible:ring-primary shadow-soft"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "hero" : "ghost"}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 transition-all font-semibold ${activeCategory === cat ? 'shadow-glow' : 'text-muted-foreground hover:bg-primary/5'}`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredPosts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.05 + 0.2}>
            <Link to={`/blog/${post.id}`} className="group block h-full">
              <div className="glass rounded-3xl overflow-hidden shadow-soft group-hover:shadow-elegant group-hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-border/40">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-semibold flex items-center gap-2">
                       Read Full Article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="backdrop-blur-md bg-white/20 text-white border-white/30 px-3 py-1 rounded-lg">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
                    <span className="flex items-center gap-1.5"><Leaf className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-tight group-hover:text-primary transition-colors mb-4">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-semibold">{post.author}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/20 transition-colors">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Reveal delay={0.2}>
          <div className="text-center py-20 glass rounded-3xl border border-dashed border-border/60">
            <div className="text-5xl mb-4 opacity-40">🔎</div>
            <h3 className="text-xl font-semibold">No articles found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or category filters.</p>
            <Button variant="ghost" className="mt-6 text-primary" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>
              Clear all filters
            </Button>
          </div>
        </Reveal>
      )}
    </div>
  );
}
