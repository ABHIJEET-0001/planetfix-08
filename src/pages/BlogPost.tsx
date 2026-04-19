import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Link2, BookOpen, Leaf, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "./Blog";
import { Reveal } from "@/components/Reveal";

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Related posts (excluding current)
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <Reveal>
        <div className="flex items-center justify-between">
          <Link to="/blog">
            <Button variant="ghost" className="rounded-xl group pl-2">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Reveal>

      <article className="space-y-8">
        <Reveal delay={0.1}>
          <div className="space-y-6">
            <Badge variant="secondary" className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-primary/20">
              {post.category}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/40 pb-8">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
                   {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-foreground">{post.author}</div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold">Verified Author</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Leaf className="h-4 w-4 text-primary" />
                {post.date}
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-primary" />
                {post.readTime}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-elegant group">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
             <p className="text-xl font-medium text-foreground leading-relaxed italic border-l-4 border-primary pl-6 py-2 my-10 bg-primary/5 rounded-r-2xl">
               "{post.excerpt}"
             </p>

             <h2>Why This Matters Today</h2>
             <p>
               Understanding our environmental impact is no longer a choice—it's a necessity. As we move deeper into 2024, the "Benefits" of eco-conscious living are becoming clearer, touching everything from our personal finances to our biological health.
             </p>

             <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
               <div className="p-6 glass rounded-3xl border border-primary/20 bg-primary/5">
                 <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                   <TrendingUp className="h-6 w-6 text-primary" />
                 </div>
                 <h4 className="text-lg font-bold mb-2">Measurable Growth</h4>
                 <p className="text-sm text-muted-foreground leading-relaxed">Small changes in transport and shopping habits can lead to a 50% footprint reduction within the first 6 months.</p>
               </div>
               <div className="p-6 glass rounded-3xl border border-secondary/20 bg-secondary/5">
                 <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                   <Sparkles className="h-6 w-6 text-secondary" />
                 </div>
                 <h4 className="text-lg font-bold mb-2">Life Quality</h4>
                 <p className="text-sm text-muted-foreground leading-relaxed">Reduced emissions often correlate with cleaner air and healthier cardiovascular systems for your family.</p>
               </div>
             </div>

             <h2>Key Benefits & Takeaways</h2>
             <p>
               When you use tools like PlanetFix, you aren't just looking at charts—you're looking at a roadmap for a better life. Here are the core benefits we see across our user base:
             </p>
             <ul>
               <li><strong>Financial Resilience:</strong> Low-carbon living is inherently efficient. Reducing energy waste and unnecessary shopping keeps more money in your pockets.</li>
               <li><strong>Future-Proofing:</strong> As climate regulations tighten, early adopters of sustainable habits are better prepared for the transitioning economy.</li>
               <li><strong>Mental Clarity:</strong> There is a profound psychological "Impact Benefit" to knowing that your daily actions align with your ethical values.</li>
             </ul>

             <div className="my-10 p-8 glass rounded-3xl border border-border/60 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                <h3 className="text-2xl font-bold mb-4">Start Your Journey with PlanetFix</h3>
                <p className="text-muted-foreground mb-6">Want to see how these benefits apply to your specific lifestyle?</p>
                <div className="flex justify-center gap-4">
                  <Link to="/calculator">
                    <Button variant="hero" className="rounded-xl px-8 shadow-glow">Calculate My Footprint</Button>
                  </Link>
                </div>
             </div>

             <h2>The Conclusion</h2>
             <p>
               The path to sustainability is not about sacrifice—it's about optimization. By leveraging AI-driven data, we can find the hidden benefits in every choice we make. Stay tuned for more guides as we continue to evolve the PlanetFix platform.
             </p>
          </div>
        </Reveal>
      </article>

      {/* Related Section */}
      <Reveal delay={0.4}>
        <div className="pt-20 border-t border-border/40">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display">Keep <span className="gradient-text">Reading</span></h2>
            <Link to="/blog">
              <Button variant="link" className="text-primary font-semibold">View All Articles</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {relatedPosts.map((rp) => (
               <Link key={rp.id} to={`/blog/${rp.id}`} className="group block">
                 <div className="flex gap-4 p-4 glass rounded-3xl border border-border/40 group-hover:border-primary/20 transition-all group-hover:translate-x-1">
                   <div className="h-24 w-24 shrink-0 rounded-2xl overflow-hidden shadow-soft">
                     <img src={rp.image} alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col justify-center">
                     <Badge variant="ghost" className="w-fit text-[9px] uppercase tracking-tighter text-primary px-0 h-4 mb-1">
                       {rp.category}
                     </Badge>
                     <h4 className="font-bold text-sm line-clamp-2 transition-colors group-hover:text-primary leading-snug">
                       {rp.title}
                     </h4>
                     <div className="text-[10px] text-muted-foreground mt-2 flex items-center gap-2">
                       <Clock className="h-2.5 w-2.5" /> {rp.readTime}
                     </div>
                   </div>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
