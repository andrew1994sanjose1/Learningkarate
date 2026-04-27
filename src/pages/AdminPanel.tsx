import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, CreditCard, Calendar, Settings, Search, Edit2, Trash2, Send, Plus, Filter, Download, ChevronRight } from 'lucide-react';
import { collection, query, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Student, Rank } from '../types';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';

export function AdminPanel() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'members' | 'financials' | 'content'>('members');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const q = query(collection(db, 'students'));
      const snap = await getDocs(q);
      setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Student[]);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'members', name: 'Member Management', icon: Users },
    { id: 'financials', name: 'Financials & Payments', icon: CreditCard },
    { id: 'content', name: 'Content Control', icon: Calendar },
  ] as const;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black">
      {/* Admin Nav */}
      <div className="bg-black text-white px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-2">Central Management Suite</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-none">Dojo <span className="italic text-crimson">Operations</span></h1>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-xl font-display font-bold text-[10px] uppercase tracking-widest transition-all",
                  activeTab === tab.id ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                <tab.icon size={14} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {activeTab === 'members' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
             <div className="flex flex-col md:row justify-between items-center gap-4 mb-10">
               <div className="relative w-full md:w-96">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
                 <input 
                  type="text" 
                  placeholder="Search students by name, email or rank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-crimson transition-colors shadow-sm"
                 />
               </div>
               <div className="flex gap-3 w-full md:w-auto">
                 <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-black/5 font-display font-bold text-[10px] uppercase tracking-widest hover:bg-black/5 transition-colors">
                   <Filter size={14} /> Filter
                 </button>
                 <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-black/5 font-display font-bold text-[10px] uppercase tracking-widest hover:bg-black/5 transition-colors">
                   <Download size={14} /> Export
                 </button>
                 <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-crimson text-white font-display font-bold text-[10px] uppercase tracking-widest hover:bg-crimson-dark transition-colors shadow-lg shadow-crimson/10">
                   <Plus size={14} /> Add Student
                 </button>
               </div>
             </div>

             <div className="bg-white border border-black/5 rounded-[2.5rem] overflow-hidden shadow-sm">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-black/5 border-b border-black/5">
                       <th className="px-8 py-6 font-display font-bold text-[10px] uppercase tracking-[0.2em] text-black/40">Student Name</th>
                       <th className="px-8 py-6 font-display font-bold text-[10px] uppercase tracking-[0.2em] text-black/40">Current Rank</th>
                       <th className="px-8 py-6 font-display font-bold text-[10px] uppercase tracking-[0.2em] text-black/40">Attendance</th>
                       <th className="px-8 py-6 font-display font-bold text-[10px] uppercase tracking-[0.2em] text-black/40">Status</th>
                       <th className="px-8 py-6 font-display font-bold text-[10px] uppercase tracking-[0.2em] text-black/40 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-black/5">
                     {(students.length > 0 ? students : MOCK_STUDENTS).filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                       <tr key={student.id} className="hover:bg-black/[0.01] transition-colors group">
                         <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center font-bold text-xs">
                               {student.name.charAt(0)}
                             </div>
                             <div>
                               <p className="font-display font-bold text-sm">{student.name}</p>
                               <p className="text-[10px] text-black/40">{student.email}</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-8 py-6">
                           <span className={cn(
                             "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                             getRankColor(student.rank)
                           )}>
                             {student.rank} Belt
                           </span>
                         </td>
                         <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                             <div className="w-24 bg-black/5 h-1.5 rounded-full overflow-hidden">
                               <div className="bg-crimson h-full" style={{ width: `${Math.min((student.attendanceCount / 50) * 100, 100)}%` }} />
                             </div>
                             <span className="font-mono text-[10px] font-bold">{student.attendanceCount}</span>
                           </div>
                         </td>
                         <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                             <div className={cn("w-1.5 h-1.5 rounded-full", student.isActive ? "bg-green-500" : "bg-red-500")} />
                             <span className="text-[10px] font-bold font-display uppercase tracking-wider">{student.isActive ? 'Active' : 'Inactive'}</span>
                           </div>
                         </td>
                         <td className="px-8 py-6">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 hover:bg-black/5 rounded-lg text-black/40 hover:text-black transition-colors"><Edit2 size={14} /></button>
                             <button className="p-2 hover:bg-red-50 rounded-lg text-black/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               {loading && (
                 <div className="py-20 flex justify-center items-center gap-3 text-black/20 font-display font-bold text-xs uppercase tracking-widest">
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-crimson border-t-transparent rounded-full" />
                   Syncing Records...
                 </div>
               )}
             </div>
          </motion.div>
        )}

        {activeTab === 'financials' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               {[
                 { label: 'Revenue (MTD)', value: '$12,450', trend: '+12%', color: 'text-green-500' },
                 { label: 'Pending Orders', value: '14', trend: 'Due', color: 'text-crimson' },
                 { label: 'Active Subscriptions', value: '184', trend: '+4', color: 'text-blue-500' },
               ].map((stat, i) => (
                 <div key={i} className="bg-white border border-black/5 p-10 rounded-[2.5rem] shadow-sm">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4">{stat.label}</p>
                   <div className="flex items-end justify-between">
                     <p className="text-4xl font-display font-bold">{stat.value}</p>
                     <p className={cn("text-[10px] font-bold px-2 py-1 bg-black/5 rounded", stat.color)}>{stat.trend}</p>
                   </div>
                 </div>
               ))}
             </div>

             <div className="bg-black text-white p-12 rounded-[3.5rem] flex flex-col md:row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                  <CreditCard size={150} />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-4">Send Payment Link</h2>
                  <p className="text-white/40 text-sm max-w-sm mb-8">Quickly generate a secure checkout link for gi orders, grading fees, or individual equipment.</p>
                  <div className="flex gap-4">
                    <input type="text" placeholder="Student Name" className="bg-white/10 border border-white/10 rounded-xl px-4 text-xs font-display focus:outline-none" />
                    <input type="number" placeholder="Amount" className="bg-white/10 border border-white/10 rounded-xl px-4 text-xs font-display focus:outline-none w-32" />
                    <button className="bg-crimson px-8 py-4 rounded-xl font-display font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-crimson-dark transition-colors">
                      <Send size={14} /> Send Link
                    </button>
                  </div>
                </div>
             </div>
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10">
                 <div className="flex justify-between items-center mb-10">
                   <h3 className="font-display font-bold uppercase tracking-widest text-xs">Dynamic Schedule Editor</h3>
                   <button className="text-[10px] font-bold text-crimson uppercase underline">Add Slot</button>
                 </div>
                 <div className="space-y-4">
                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                     <div key={day} className="flex items-center gap-6 p-6 border border-black/5 rounded-2xl hover:border-black/20 transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-display font-bold">{day}</div>
                        <div className="flex-grow">
                          <p className="text-sm font-bold">3 Active Classes</p>
                          <p className="text-[10px] text-black/40 uppercase">Last updated: 2 days ago</p>
                        </div>
                        <ChevronRight size={18} className="text-black/10" />
                     </div>
                   ))}
                 </div>
              </section>

              <section className="bg-white border border-black/5 rounded-[2.5rem] p-10">
                 <div className="flex justify-between items-center mb-10">
                   <h3 className="font-display font-bold uppercase tracking-widest text-xs">Instructor Bios</h3>
                   <button className="text-[10px] font-bold text-crimson uppercase underline">Manage Staff</button>
                 </div>
                 <div className="space-y-6">
                    {[
                      { name: 'Marcus Thorne', rank: '5th Dan', status: 'Full Time' },
                      { name: 'Sarah Chen', rank: '4th Dan', status: 'Part Time' },
                      { name: 'Robert Vance', rank: '4th Dan', status: 'Full Time' }
                    ].map((staff, i) => (
                      <div key={i} className="flex justify-between items-center pb-6 border-b border-black/5 last:border-0 last:pb-0">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-crimson/5 text-crimson flex items-center justify-center font-bold">{staff.name.charAt(0)}</div>
                           <div>
                             <p className="text-sm font-bold">{staff.name}</p>
                             <p className="text-[10px] text-black/40 uppercase">{staff.rank}</p>
                           </div>
                         </div>
                         <div className="text-[8px] font-bold uppercase px-3 py-1 bg-black/5 rounded-full">{staff.status}</div>
                      </div>
                    ))}
                 </div>
              </section>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function getRankColor(rank: Rank): string {
  switch (rank) {
    case 'White': return 'border-black/10 text-black/40 bg-white';
    case 'Yellow': return 'border-yellow-200 text-yellow-600 bg-yellow-50';
    case 'Orange': return 'border-orange-200 text-orange-600 bg-orange-50';
    case 'Green': return 'border-green-200 text-green-600 bg-green-50';
    case 'Blue': return 'border-blue-200 text-blue-600 bg-blue-50';
    case 'Purple': return 'border-purple-200 text-purple-600 bg-purple-50';
    case 'Brown': return 'border-amber-200 text-amber-900 bg-amber-50';
    case 'Black': return 'border-black text-black bg-black/5';
    default: return 'border-black/5 text-black/40';
  }
}

const MOCK_STUDENTS: Student[] = [
  { id: '1', userId: 'u1', name: 'James Wilson', email: 'james.w@example.com', rank: 'Brown', joinedAt: '2023-01-15', isActive: true, attendanceCount: 145, qrCode: 'JW-123' },
  { id: '2', userId: 'u2', name: 'Elena Rodriguez', email: 'elena.r@example.com', rank: 'Yellow', joinedAt: '2024-03-10', isActive: true, attendanceCount: 22, qrCode: 'ER-456' },
  { id: '3', userId: 'u3', name: 'Toby Smith', email: 'toby.s@example.com', rank: 'Green', joinedAt: '2023-06-22', isActive: false, attendanceCount: 58, qrCode: 'TS-789' },
  { id: '4', userId: 'u4', name: 'Akira Tanaka', email: 'akira.t@example.com', rank: 'Black', joinedAt: '2018-11-05', isActive: true, attendanceCount: 890, qrCode: 'AT-001' },
  { id: '5', userId: 'u5', name: 'Maya Peters', email: 'maya.p@example.com', rank: 'White', joinedAt: '2024-10-01', isActive: true, attendanceCount: 4, qrCode: 'MP-222' },
];
