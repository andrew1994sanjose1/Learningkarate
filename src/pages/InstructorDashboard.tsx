import { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, UserCheck, Shield, History, MapPin, Search, CheckCircle2 } from 'lucide-react';
import { QrReader } from 'react-qr-reader';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp, increment } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';

export function InstructorDashboard() {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (result: any) => {
    if (result && !isProcessing) {
      setIsProcessing(true);
      const qrData = result?.text;
      
      try {
        const studentsRef = collection(db, 'students');
        const q = query(studentsRef, where('qrCode', '==', qrData));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          toast.error("Invalid Signature: Identity Registry Mismatch");
          setIsProcessing(false);
          return;
        }

        const studentDoc = querySnapshot.docs[0];
        const studentData = studentDoc.data();

        await addDoc(collection(db, 'attendance'), {
          studentId: studentDoc.id,
          studentName: studentData.name,
          timestamp: serverTimestamp(),
          classType: 'General Training',
          instructorId: 'MOCK_INSTRUCTOR_ID'
        });

        await updateDoc(doc(db, 'students', studentDoc.id), {
          attendanceCount: increment(1)
        });

        setLastScanned({ id: studentDoc.id, ...studentData });
        toast.success(`Access Authorized: ${studentData.name}`);
        setIsScanning(false);
      } catch (error) {
        console.error(error);
        toast.error("Registry sync failed.");
      } finally {
        setTimeout(() => setIsProcessing(false), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dojo-black text-white p-10 lg:p-20 relative overflow-hidden">
      {/* Decorative Branding */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] text-[20rem] font-bold italic select-none pointer-events-none">道</div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:row justify-between items-start md:items-end gap-10">
          <div>
            <div className="flex items-center gap-3 text-crimson mb-6">
              <Shield size={18} className="animate-pulse" />
              <span className="font-display font-bold text-[10px] uppercase tracking-[0.4em] italic">Secure Instructor Terminal 04</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none">
              Sensei <span className="text-crimson italic">Command</span>
            </h1>
          </div>
          <div className="flex gap-4">
             <button className="bg-white/5 border border-white/10 px-8 py-5 rounded-sm flex items-center gap-4 transition-all hover:bg-white/10 group">
               <History size={18} className="text-crimson" />
               <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em]">Session Records</span>
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Scanner View */}
          <section className="lg:col-span-7">
            <div className="bg-white/[0.03] border border-white/5 p-16 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-crimson/20" />
               <div className="mb-12">
                 <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-3">Syncing Signal...</h2>
                 <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold italic">Awaiting student cryptographic signature</p>
               </div>

               <div className="aspect-square w-full max-w-sm mx-auto bg-black rounded-none overflow-hidden border border-white/10 relative group shadow-2xl">
                  {isScanning ? (
                    <div className="w-full h-full relative">
                      <QrReader
                        onResult={(result, error) => {
                          if (!!result) handleScan(result);
                        }}
                        constraints={{ facingMode: 'environment' }}
                        className="w-full h-full grayscale opacity-80"
                      />
                      <motion.div
                        animate={{ y: [0, 400, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute top-0 left-0 right-0 h-0.5 bg-crimson shadow-[0_0_20px_rgba(220,20,60,1)] z-10"
                      />
                      {/* Corner Accents for Scanner */}
                      <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-crimson z-20" />
                      <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-crimson z-20" />
                      <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-crimson z-20" />
                      <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-crimson z-20" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsScanning(true)}
                      className="w-full h-full flex flex-col items-center justify-center gap-8 group-hover:bg-white/[0.02] transition-colors relative"
                    >
                      <div className="relative">
                        <QrCode size={100} className="text-white/10 group-hover:text-crimson/40 transition-all duration-700" strokeWidth={0.5} />
                        <motion.div 
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Zap size={40} className="text-crimson" />
                        </motion.div>
                      </div>
                      <span className="font-display font-bold text-[10px] uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">Initiate Optical Link</span>
                    </button>
                  )}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-30">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-2 border-crimson border-t-transparent rounded-full mb-6" />
                      <span className="font-display font-bold text-[10px] uppercase tracking-[0.4em] text-crimson">Validating Registry</span>
                    </div>
                  )}
               </div>

               <div className="mt-16 flex flex-col md:row justify-center gap-8">
                 <button className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white transition-colors group">
                   <Search size={14} className="text-crimson" /> Manual Registry Override
                 </button>
                 <button className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white transition-colors group">
                   <MapPin size={14} className="text-crimson" /> Re-assign Node Location
                 </button>
               </div>
            </div>
          </section>

          {/* Records & Status */}
          <section className="lg:col-span-5 space-y-12">
            <motion.div 
              layout
              className="bg-white/[0.03] border border-white/5 p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-crimson/40" />
              <h3 className="font-display font-bold uppercase tracking-[0.3em] text-[10px] mb-12 text-white/30 italic">Active Verification</h3>
              {lastScanned ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center gap-8 mb-12">
                    <div className="w-24 h-24 bg-white/5 border border-crimson/30 flex items-center justify-center text-4xl font-display font-bold italic text-crimson shadow-2xl shadow-crimson/10 relative">
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-crimson" />
                      {lastScanned.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-4xl font-display font-bold uppercase tracking-tighter leading-none mb-2">{lastScanned.name}</h4>
                      <p className="text-crimson font-display font-bold text-[10px] uppercase tracking-[0.4em] italic leading-none">{lastScanned.rank} Level Access</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 bg-white/5 border border-white/5">
                      <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-3 italic">Lineage Points</p>
                      <p className="text-3xl font-display font-bold italic leading-none">{lastScanned.attendanceCount || 0}</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/5">
                      <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-3 italic">Node Status</p>
                      <p className="text-3xl font-display font-bold text-green-500 italic leading-none">VERIFIED</p>
                    </div>
                  </div>
                  <div className="mt-12 pt-12 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-green-500 font-display font-bold text-[10px] uppercase tracking-[0.3em] italic">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Registry Updated
                    </div>
                    <button className="text-[9px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors underline underline-offset-4">Reset Buffer</button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-white/10 italic text-sm text-center">
                  <UserCheck size={60} className="mb-6 opacity-5" strokeWidth={0.5} />
                  <p className="font-display font-bold uppercase tracking-[0.2em] text-[10px] max-w-[200px]">Node idle. Awaiting incoming optical data.</p>
                </div>
              )}
            </motion.div>

            <div className="bg-white/[0.03] border border-white/5 p-12 rounded-sm">
              <h3 className="font-display font-bold uppercase tracking-[0.3em] text-[10px] mb-10 text-white/30 italic">Live Feed (Recent)</h3>
              <div className="space-y-6">
                {[
                  { name: 'John Doe', rank: 'Brown', time: '12:45' },
                  { name: 'Elena R.', rank: 'Yellow', time: '12:42' },
                  { name: 'Kenji Sato', rank: 'Black', time: '12:38' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center p-5 bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-[10px] font-bold italic text-white/40">{item.name.charAt(0)}</div>
                      <div>
                        <p className="text-xs font-bold font-display uppercase tracking-tight">{item.name}</p>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest italic">{item.time} • {item.rank} Belt</p>
                      </div>
                    </div>
                    <div className="text-[8px] px-3 py-1 bg-green-500/10 text-green-500 font-bold uppercase tracking-widest italic">Authorized</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
