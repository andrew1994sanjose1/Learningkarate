import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Star, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

const INSTRUCTORS = [
  {
    name: "Sensei Hiroshi Nakamura",
    rank: "Chief Instructor • 7th Dan",
    bio: "With over 40 years of experience, Sensei Nakamura brings traditional Shotokan techniques to a modern digital age. He is the master architect of Bushido OS.",
    specialties: ["Kata", "Bunkai", "Lineage Management"],
    image: "https://images.unsplash.com/photo-1579038773867-044c48829161?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Sensei Sarah Thorne",
    rank: "Senior Instructor • 4th Dan",
    bio: "Sarah specializes in competition Kumite and psychological conditioning. She has led the national team to multiple victories over the last decade.",
    specialties: ["Kumite", "Agility Training", "Performance Analytics"],
    image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Sensei Marcus Vane",
    rank: "Junior Program Lead • 3rd Dan",
    bio: "Marcus is dedicated to building character and discipline in our younger warriors. His classes focus on foundational strength and respect.",
    specialties: ["Junior Development", "Basics", "Ethics"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  }
];

export function Instructors() {
  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Hero */}
      <section className="bg-dojo-black py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-crimson/40 via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[10px] font-bold text-crimson uppercase tracking-[0.6em] mb-8">Lineage Holders</p>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-none mb-10">
              Mastery <br/>
              <span className="italic text-crimson">Leadership</span>
            </h1>
            <p className="text-white/40 text-xl font-display font-bold uppercase tracking-tight max-w-2xl mx-auto italic">
              Our instructors are verified holders of the ancient flame, dedicated to your continuous evolution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instructor Cards */}
      <section className="py-32 max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {INSTRUCTORS.map((inst, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-dojo-gray mb-8 border border-black/5 rounded-sm">
                <img 
                  src={inst.image} 
                  alt={inst.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-dojo-black/20 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-white flex items-center justify-center text-dojo-black shadow-xl group-hover:bg-crimson group-hover:text-white transition-colors duration-500">
                    <Shield size={20} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-bold uppercase tracking-tight text-dojo-black leading-none">{inst.name}</h3>
                <p className="text-crimson font-display font-bold text-[10px] uppercase tracking-[0.4em] italic">{inst.rank}</p>
                <p className="text-slate-500 text-sm font-sans leading-relaxed italic opacity-80">{inst.bio}</p>
                
                <div className="pt-6 flex flex-wrap gap-2">
                  {inst.specialties.map((spec, j) => (
                    <span key={j} className="px-3 py-1 bg-dojo-gray text-dojo-black text-[8px] font-bold uppercase tracking-widest border border-black/5 italic">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-dojo-gray py-32 border-y border-black/5">
        <div className="max-w-4xl mx-auto px-10 text-center">
          <Award size={48} className="mx-auto text-crimson mb-10 opacity-20" />
          <h2 className="text-3xl md:text-5xl font-display font-bold text-dojo-black uppercase tracking-tighter italic leading-tight">
            "The teacher is the mirror of the students' potential. We do not just teach karate; we refine the human spirit."
          </h2>
        </div>
      </section>
    </div>
  );
}
