"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Droplets, Leaf, Bell, CheckCircle2, ArrowRight } from "lucide-react";
import ScrollAssembly from "@/components/ScrollAssembly";
import Loader from "@/components/Loader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  return (
    <main className="relative bg-spotify-black min-h-screen">
      <AnimatePresence>
        {!isLoaded && <Loader progress={loadProgress} />}
      </AnimatePresence>

      <div className={isLoaded ? "opacity-100" : "opacity-0 transition-opacity duration-1000"}>
        {/* Scroll Assembly Section */}
        <ScrollAssembly 
          onLoadComplete={() => setIsLoaded(true)} 
          onProgress={setLoadProgress}
        />

        {/* Stats Section */}
        <section className="py-24 px-8 bg-spotify-black relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard number="30%" text="Pesticide Reduction" />
              <StatCard number="50%" text="Water Savings" />
              <StatCard number="24/7" text="Real-time Monitoring" />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-8 bg-spotify-card border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-6xl mb-6">Built for the Field</h2>
            <p className="text-xl text-spotify-textSec max-w-2xl mx-auto">
              Intelligent features that transform raw environmental data into actionable insights.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Cloud className="w-8 h-8 text-spotify-green" />}
              title="Hyper-Local Weather"
              description="Forecasts calibrated to your exact GPS coordinates, not the nearest airport."
            />
            <FeatureCard 
              icon={<Droplets className="w-8 h-8 text-spotify-green" />}
              title="Soil Moisture"
              description="Know exactly when and where to irrigate with multi-depth soil analysis."
            />
            <FeatureCard 
              icon={<Leaf className="w-8 h-8 text-spotify-green" />}
              title="Crop Health"
              description="AI models that detect early signs of pest pressure and nutrient deficiency."
            />
            <FeatureCard 
              icon={<Bell className="w-8 h-8 text-spotify-green" />}
              title="Smart Alerts"
              description="Receive critical frost, heat, and storm warnings directly via SMS or App."
            />
          </div>
        </section>

        {/* CTA / Final Section */}
        <section className="py-40 px-8 text-center bg-spotify-black relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl mb-8 leading-tight">Ready to upgrade your farm?</h2>
            <p className="text-2xl text-spotify-textSec mb-12">
              Join 500+ forward-thinking farmers using Grid Sphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary flex items-center gap-2 text-lg px-10">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-3 rounded-full border border-white/20 hover:border-white/50 text-white font-bold transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-8 border-t border-white/5 bg-spotify-black relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-spotify-black rounded-sm rotate-45" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">GRID SPHERE</span>
            </div>
            
            <nav className="flex gap-8 text-spotify-textSec text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Products</a>
              <a href="#" className="hover:text-white transition-colors">Technology</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Case Studies</a>
            </nav>

            <div className="text-spotify-textSec text-sm">
              © 2024 Grid Sphere AI. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card flex flex-col items-center text-center group"
    >
      <span className="text-7xl font-black text-spotify-green mb-4 group-hover:scale-110 transition-transform duration-500">
        {number}
      </span>
      <span className="text-spotify-textSec text-lg font-medium tracking-wide">
        {text}
      </span>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="p-8 bg-black/50 border border-white/5 rounded-3xl hover:border-spotify-green/30 transition-all duration-300"
    >
      <div className="mb-6 p-4 bg-spotify-green/10 w-fit rounded-2xl">
        {icon}
      </div>
      <h3 className="text-2xl mb-4">{title}</h3>
      <p className="text-spotify-textSec leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
