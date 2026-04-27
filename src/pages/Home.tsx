import { motion } from 'motion/react';
import { Calendar, Users, ShoppingBag, ShieldCheck, ArrowRight, Award, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen bg-dojo-black overflow-hidden flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2400&auto=format&fit=crop" 
            alt="Karate Mastery" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dojo-black via-dojo-black/80 to-transparent" />
        </div>

        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-crimson/5 -skew-x-[25deg] translate-x-1/4 z-1" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-crimson/10 rounded-full blur-[120px] opacity-30 z-1" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 font-display">Dojo Management Intelligence</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-display font-bold text-white uppercase tracking-tighter leading-[0.8] mb-12">
                Bushido <br/> 
                <span className="italic text-crimson">Dojo Learning</span> <br/>
                School
              </h1>
              <p className="text-xl md:text-2xl text-white/40 font-display font-bold uppercase tracking-tight max-w-xl mb-16 leading-tight italic">
                A unified architecture for lineage preservation and dojo operational excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/trial" className="group px-12 py-6 bg-crimson text-white font-display font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-dojo-black transition-all duration-500 shadow-2xl shadow-crimson/20 flex items-center justify-center gap-4">
                  Initiate Trial <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/portal" className="px-12 py-6 bg-transparent border border-white/20 text-white font-display font-bold text-xs uppercase tracking-[0.3em] hover:bg-white/5 transition-all flex items-center justify-center">
                  Member Portal
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Japanese character watermark */}
        <div className="absolute right-0 bottom-0 text-[35rem] font-bold text-white/[0.02] leading-none select-none pointer-events-none italic translate-x-1/4 translate-y-1/4">
          道
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
           <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
           <span className="text-[8px] uppercase tracking-[0.5em] text-white font-bold">Scroll</span>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-32 max-w-7xl mx-auto px-10 w-full">
        <div className="mb-24 flex flex-col md:row justify-between items-end gap-8">
           <div className="max-w-xl">
             <p className="text-[10px] font-bold text-crimson uppercase tracking-[0.4em] mb-6">Core Modules</p>
             <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-dojo-black leading-none">
               Engineered for <br/> <span className="italic text-crimson">Mastery</span>
             </h2>
           </div>
           <p className="text-slate-400 text-sm max-w-xs font-sans leading-relaxed italic border-l border-crimson pl-8">
             Every feature within Bushido OS is designed to remove administrative friction and elevate the practitioner's experience.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-dojo-gray rounded-[3rem] p-12 border border-black/5">
          {[
            { 
              icon: ShieldCheck, 
              title: "Lineage Vault", 
              desc: "Secure, non-fungible records of rank attainment and instructor accreditation dating back generations.",
              accent: "bg-dojo-black"
            },
            { 
              icon: Zap, 
              title: "QR Attendance", 
              desc: "Instantaneous check-ins with real-time analytics for students and session logging for staff.",
              accent: "bg-crimson"
            },
            { 
              icon: ShoppingBag, 
              title: "Pro-Shop Suite", 
              desc: "A fully integrated equipment supply chain. Students order gear directly within their portal.",
              accent: "bg-dojo-black"
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-12 hover:shadow-2xl transition-all duration-700 group cursor-default rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-dojo-gray -translate-y-12 translate-x-12 rounded-full group-hover:scale-[8] transition-transform duration-1000 ease-in-out opacity-20" />
              
              <div className={`w-16 h-16 ${feature.accent} text-white flex items-center justify-center mb-10 shadow-xl group-hover:rotate-12 transition-transform relative z-10`}>
                <feature.icon size={26} />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-crimson transition-colors relative z-10">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-[13px] leading-relaxed relative z-10 font-sans italic">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Gallery / Mastery in Motion */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-[10px] font-bold text-crimson uppercase tracking-[0.4em] mb-4">Visual Heritage</p>
              <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-dojo-black leading-none">
                Mastery in <span className="italic text-crimson">Motion</span>
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 relative group overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1549444464-32f22b0c4412?q=80&w=2000&auto=format&fit=crop" 
                alt="Karate Training" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-dojo-black/20 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute bottom-10 left-10 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Technique</p>
                <p className="text-2xl font-display font-bold uppercase italic italic">Precision Strike</p>
              </div>
            </motion.div>
            
            <div className="md:col-span-4 flex flex-col gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex-1 relative group overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=1000&auto=format&fit=crop" 
                  alt="Dojo Atmosphere" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-crimson/10 group-hover:bg-transparent transition-colors duration-700" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex-1 relative group overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1579038773867-044c48829161?q=80&w=1000&auto=format&fit=crop" 
                  alt="Black Belt Focus" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-dojo-black/40 group-hover:bg-transparent transition-colors duration-700" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="bg-dojo-black py-40 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crimson/20 via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-10 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-bold text-crimson uppercase tracking-[0.5em] mb-12">Universal Protocol</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-tight mb-20 italic">
              "Management is the kata <br/> of the organization."
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-px h-16 bg-crimson mb-8" />
              <p className="font-display font-bold uppercase text-base tracking-[0.2em] text-white">Hiroshi Nakamura</p>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mt-2">Dojo OS Lead Architect</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trial CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="bg-dojo-gray rounded-[4rem] p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-black/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-20 opacity-[0.02] group-hover:rotate-45 transition-transform duration-1000">
               <Award size={400} />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-dojo-black leading-none mb-6">
                Start Your <br/> <span className="text-crimson italic">Digital</span> Dojo
              </h2>
              <p className="text-slate-400 text-lg font-display font-bold uppercase tracking-tight max-w-md">
                Modernize your lineage records and operations today with a 30-day free trial.
              </p>
            </div>
            <div className="relative z-10">
              <Link to="/trial" className="px-16 py-8 bg-dojo-black text-white font-display font-bold text-xs uppercase tracking-[0.4em] hover:bg-crimson transition-all shadow-2xl">
                Get Early Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-10 border-t border-dojo-black/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-crimson flex items-center justify-center font-bold text-2xl italic border border-dojo-black text-white shadow-lg">道</div>
             <div>
               <span className="text-xl font-bold tracking-tighter uppercase italic block leading-none">Bushido <span className="text-crimson">Dojo</span></span>
               <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-300">Learning School</span>
             </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-crimson transition-colors">Architecture</a>
            <a href="#" className="hover:text-crimson transition-colors">Lineage</a>
            <a href="#" className="hover:text-crimson transition-colors">Protocols</a>
            <span className="hidden md:block text-dojo-black/10">|</span>
            <p className="text-slate-900 tracking-tighter italic">© 2024 BUSHIDO MANAGEMENT SYSTEMS • DEPLOYMENT 4.1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
