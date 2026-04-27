import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';

export function Trial() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ageGroup: 'Adult',
    experience: 'None'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, we'd save this to an 'inquiries' or 'trials' collection
      await addDoc(collection(db, 'trials'), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'New'
      });
      toast.success("Trial request sent! We'll contact you shortly.");
      setFormData({ name: '', email: '', phone: '', ageGroup: 'Adult', experience: 'None' });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const schedule = [
    { time: '17:00 - 18:00', mon: 'Beginners', tue: 'Juniors', wed: 'Beginners', thu: 'Juniors', fri: 'Advanced', sat: 'Open Mat' },
    { time: '18:15 - 19:15', mon: 'Advanced', tue: 'Adults', wed: 'Advanced', thu: 'Adults', fri: 'Sparring', sat: 'Cardio' },
    { time: '19:30 - 20:30', mon: 'Adults', tue: 'Elite', wed: 'Adults', thu: 'Elite', fri: 'Black Belt', sat: '-' },
  ];

  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-crimson/10 text-crimson text-xs font-display font-bold uppercase tracking-widest mb-4"
          >
            Start Your Journey
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-black mb-6">
            Free <span className="text-crimson">Introductory</span> Session
          </h1>
          <p className="max-w-2xl mx-auto text-black/60">
            No commitment required. Come meet our instructors, see the facility, and experience your first class on us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black text-white p-10 rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 shadow-inner">
              <CheckCircle2 size={120} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-8 relative z-10">Sign Up Now</h2>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-display font-bold">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-crimson focus:outline-none transition-colors"
                    placeholder="Kenji Sato"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-display font-bold">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-crimson focus:outline-none transition-colors"
                    placeholder="kenji@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-display font-bold">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-crimson focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-display font-bold">Age Group</label>
                  <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-crimson focus:outline-none transition-colors appearance-none"
                  >
                    <option value="Kids">Kids (5-12)</option>
                    <option value="Juniors">Juniors (13-17)</option>
                    <option value="Adult">Adult (18+)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-display font-bold">Prior Experience</label>
                <div className="flex flex-wrap gap-3">
                  {['None', 'Basics', 'Intermediate', 'Advanced'].map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: exp })}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-display font-bold uppercase tracking-widest border transition-all",
                        formData.experience === exp ? "bg-crimson border-crimson text-white" : "border-white/10 text-white/40 hover:border-white/30"
                      )}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-crimson hover:bg-crimson-dark text-white py-5 rounded-full font-display font-bold uppercase tracking-[0.2em] text-sm mt-8 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Request Free Session"}
                <CheckCircle2 size={18} />
              </button>
            </form>
          </motion.div>

          {/* Schedule Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-10">
              <h2 className="text-3xl font-display font-bold uppercase tracking-tighter text-black mb-4">Class Schedule</h2>
              <p className="text-black/50 text-sm">Find a time that works for you. Most introductory classes happen during beginner slots.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-4 text-left font-display font-bold text-[10px] uppercase tracking-widest text-black/40">Time</th>
                    <th className="py-4 text-left font-display font-bold text-[10px] uppercase tracking-widest">Mon</th>
                    <th className="py-4 text-left font-display font-bold text-[10px] uppercase tracking-widest">Tue</th>
                    <th className="py-4 text-left font-display font-bold text-[10px] uppercase tracking-widest">Wed</th>
                    <th className="py-4 text-left font-display font-bold text-[10px] uppercase tracking-widest">Thu</th>
                    <th className="py-4 text-left font-display font-bold text-[10px] uppercase tracking-widest text-crimson">Fri</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {schedule.map((row, i) => (
                    <tr key={i} className="hover:bg-crimson/[0.02] transition-colors">
                      <td className="py-6 font-mono text-sm font-bold text-black flex items-center gap-2">
                        <Clock size={14} className="text-crimson" />
                        {row.time}
                      </td>
                      <td className="py-6 text-sm font-display font-bold text-black">{row.mon}</td>
                      <td className="py-6 text-sm font-display font-bold text-black">{row.tue}</td>
                      <td className="py-6 text-sm font-display font-bold text-black">{row.wed}</td>
                      <td className="py-6 text-sm font-display font-bold text-black">{row.thu}</td>
                      <td className="py-6 text-sm font-display font-bold text-crimson">{row.fri}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: MapPin, title: 'Location', desc: 'Central Dojo, 123 Arts St.' },
                { icon: Calendar, title: 'Duration', desc: '60 Minute Sessions' },
                { icon: AlertCircle, title: 'Requirement', desc: 'Loose clothing ok.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-black/5 rounded-2xl shadow-sm">
                  <item.icon size={20} className="text-crimson mb-4" />
                  <h4 className="font-display font-bold text-xs uppercase mb-1">{item.title}</h4>
                  <p className="text-black/50 text-[10px] uppercase tracking-wider">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
