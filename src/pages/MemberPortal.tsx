import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, ShoppingBag, QrCode, LogOut, Settings, Award, Calendar as CalendarIcon, Package, CreditCard, ChevronRight, CheckCircle2, AlertCircle, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Standard library for QR
import { useAuth } from '../hooks/useAuth';
import { auth, db } from '../lib/firebase';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { cn } from '../lib/utils';
import { collection, query, getDocs, where, limit } from 'firebase/firestore';
import { Product, Order, Rank } from '../types';
import { toast } from 'react-hot-toast';

export function MemberPortal() {
  const { user, student, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-4 border-crimson border-t-transparent rounded-full" />
    </div>
  );

  if (!user) return <LoginView />;

  return (
    <div className="flex min-h-screen bg-dojo-gray text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-80 bg-dojo-black text-white p-10 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-10 bg-crimson flex items-center justify-center font-bold text-xl italic border border-white">道</div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">Bushido <span className="text-crimson">Portal</span></span>
          </div>

          <nav className="space-y-3">
            {[
              { name: 'Dashboard', path: '/portal', icon: LayoutDashboard },
              { name: 'Dojo Store', path: '/portal/store', icon: ShoppingBag },
              { name: 'Attendance QR', path: '/portal/qr', icon: QrCode },
              { name: 'Settings', path: '/portal/settings', icon: Settings },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-sm font-display font-bold text-[10px] uppercase tracking-widest transition-all",
                  location.pathname === item.path 
                    ? "bg-white text-dojo-black shadow-lg" 
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg italic text-crimson">
              {student?.name?.charAt(0) || user.email?.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-tight">{student?.name || 'Warrior'}</p>
              <p className="text-[9px] text-white/40 uppercase tracking-widest italic">{student?.rank || 'New Student'} Rank</p>
            </div>
          </div>
          
          <button
            onClick={() => signOut(auth).then(() => navigate('/'))}
            className="w-full flex items-center gap-4 px-6 py-4 border border-white/10 rounded-sm font-display font-bold text-[10px] uppercase tracking-widest text-white/40 hover:bg-crimson hover:text-white transition-all group"
          >
            <LogOut size={16} />
            Exit System
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-grow p-12 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardView student={student} />} />
          <Route path="/store" element={<StoreView />} />
          <Route path="/qr" element={<QRView student={student} />} />
          <Route path="/settings" element={<div className="text-slate-400 italic font-mono text-sm">[Settings configuration offline]</div>} />
        </Routes>
      </main>
    </div>
  );
}

function LoginView() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Welcome back, warrior!");
    } catch (error) {
      console.error(error);
      toast.error("Login failed.");
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] text-center"
      >
        <div className="w-20 h-20 bg-crimson rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-crimson/20">
          <Award size={40} />
        </div>
        <h1 className="text-4xl font-display font-bold uppercase tracking-tighter text-black mb-4">Member Portal</h1>
        <p className="text-black/50 mb-10 text-sm">Access your training schedule, track progress, and order equipment.</p>
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-5 rounded-full font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-crimson transition-colors"
        >
          Sign in with Google
        </button>
        <p className="mt-8 text-[10px] uppercase tracking-widest text-black/30">Don't have an account? Visit the dojo office to register.</p>
      </motion.div>
    </div>
  );
}

function DashboardView({ student }: { student: any }) {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="mb-20 flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-crimson font-display">Member Operations Suite</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-[0.9] text-dojo-black">
            Welcome back, <br/>
            <span className="italic text-crimson">Warrior {student?.name?.split(' ')[0] || ''}</span>
          </h1>
        </motion.div>
        <div className="hidden lg:block text-right pb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 italic">Lineage Verified Since</p>
          <div className="flex items-center justify-end gap-3">
             <ShieldCheck size={20} className="text-crimson" />
             <p className="text-2xl font-display font-bold uppercase italic">{student?.joinedAt ? new Date(student.joinedAt).getFullYear() : '2024'}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 bg-white border border-dojo-black/5 p-12 flex flex-col justify-between relative overflow-hidden group shadow-sm transition-all hover:shadow-xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all scale-150 group-hover:rotate-12 duration-700">
            <Award size={180} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex px-4 py-1.5 bg-dojo-black text-white text-[9px] font-bold uppercase tracking-[0.3em] mb-16">
              Active Rank Profile
            </div>
            <h2 className="text-7xl md:text-8xl font-display font-bold uppercase tracking-tighter text-dojo-black mb-8 leading-none">
              {student?.rank || 'White'} <br/>
              <span className="text-crimson italic">Belt</span>
            </h2>
            
            <div className="max-w-md">
              <div className="flex justify-between items-center mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-2">Progress to {getNextRank(student?.rank || 'White')} <ChevronRight size={12} /></span>
                <span className="text-crimson font-mono">72%</span>
              </div>
              <div className="h-1 bg-dojo-black/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '72%' }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-crimson"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 bg-crimson text-white p-12 flex flex-col justify-between shadow-2xl shadow-crimson/20 group relative overflow-hidden"
        >
          <div className="absolute -bottom-10 -right-10 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <Zap size={200} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 mb-12">Legacy Points</p>
            <p className="text-7xl font-display font-bold italic leading-none mb-2">1,250</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Available for exchange</p>
          </div>
          <Link 
            to="/portal/store"
            className="w-full py-5 bg-white text-dojo-black font-display font-bold text-[10px] uppercase tracking-widest hover:bg-dojo-black hover:text-white transition-all text-center relative z-10"
          >
            Access Exchange
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-dojo-black/5 p-12 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all"
        >
          <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:rotate-12 transition-transform">
            <CalendarIcon size={100} />
          </div>
          <div className="flex justify-between items-center mb-12 pb-4 border-b border-dojo-black/5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest italic text-slate-400 font-display">Schedule</h3>
            <span className="text-[8px] bg-green-500/10 text-green-600 px-3 py-1 font-bold uppercase rounded-full tracking-widest">Live Now</span>
          </div>
          <p className="text-3xl font-display font-bold mb-3 uppercase tracking-tight">Advanced Kumite</p>
          <p className="text-xs text-slate-400 font-sans mb-10 leading-relaxed italic">
            Today at 18:30 <br/> 
            Sensei Thorne • Master Floor
          </p>
          
          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-crimson transition-all group">
            Session Details <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-dojo-black/5 p-12 shadow-sm relative group overflow-hidden hover:shadow-xl transition-all"
        >
           <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:-rotate-12 transition-transform">
            <ShieldCheck size={100} />
          </div>
           <div className="flex justify-between items-center mb-12 pb-4 border-b border-dojo-black/5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest italic text-slate-400 font-display">Performance</h3>
            <span className="text-[8px] bg-crimson/10 text-crimson px-3 py-1 font-bold uppercase rounded-full tracking-widest">Excellent</span>
          </div>
          <div className="flex items-end gap-3 mb-8">
            <p className="text-6xl font-display font-bold italic leading-none text-dojo-black">94.2%</p>
            <div className="mb-1">
              <p className="text-[9px] font-bold text-green-600 uppercase">+2.1%</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs font-sans italic">
            Maintaining eligibility for Winter Grading (Dec 15).
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dojo-black text-white p-12 shadow-xl relative group overflow-hidden hover:bg-crimson transition-colors duration-500"
        >
           <div className="absolute -bottom-4 -right-4 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <QrCode size={100} />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-10 pb-4 border-b border-white/5">Quick Access</h3>
          <p className="text-2xl font-display font-bold mb-8 uppercase tracking-tighter italic">Attendance QR</p>
          <Link to="/portal/qr" className="inline-flex items-center gap-3 px-6 py-3 bg-white text-dojo-black text-[9px] font-bold uppercase tracking-widest hover:bg-crimson hover:text-white transition-colors">
            Generate Signature
          </Link>
        </motion.section>
      </div>
    </div>
  );
}

function StoreView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), limit(10));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setProducts(data.length > 0 ? data : MOCK_PRODUCTS);
      } catch (e) {
        setProducts(MOCK_PRODUCTS);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-crimson font-display">Digital Dojo Supply</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-dojo-black leading-none">
            Official <br/>
            <span className="text-crimson italic">Equipment</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="bg-white px-8 py-5 border border-dojo-black/5 shadow-sm flex items-center gap-4 transition-all hover:shadow-xl">
              <ShoppingBag size={20} className="text-crimson group-hover:scale-110 transition-transform" />
              <div>
                <span className="block font-display font-bold text-[11px] tracking-widest text-dojo-black uppercase leading-none mb-1">{cartCount} ITEMS</span>
                <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest">Active Inventory</span>
              </div>
            </div>
            {cartCount > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-crimson border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold font-mono"
              >
                {cartCount}
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group flex flex-col bg-white border border-dojo-black/5 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-sm"
          >
            <div className="aspect-[4/5] bg-dojo-gray relative overflow-hidden p-12 flex items-center justify-center">
               <img 
                 src={product.imageUrl} 
                 alt={product.name} 
                 loading="lazy"
                 className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000" 
               />
               <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <div className="bg-dojo-black text-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] italic">
                   {product.category}
                 </div>
               </div>
               <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/5 transition-colors duration-500" />
            </div>
            <div className="p-8 flex flex-col flex-grow relative">
              <h3 className="font-display font-bold text-base md:text-sm uppercase tracking-tight text-dojo-black mb-3 group-hover:text-crimson transition-colors duration-300">{product.name}</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-10 flex-grow font-sans italic opacity-80">{product.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-6 border-t border-dojo-black/5">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1 italic">Contribution</span>
                  <span className="font-display font-bold text-2xl text-dojo-black tracking-tighter">${product.price}</span>
                </div>
                <button 
                  onClick={() => { setCartCount(c => c + 1); toast.success('Added to inventory!'); }}
                  className="w-14 h-14 bg-dojo-black text-white flex items-center justify-center hover:bg-crimson transition-all shadow-lg active:scale-90 group/btn rounded-sm"
                >
                  <Package size={20} className="group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function QRView({ student }: { student: any }) {
  return (
    <div className="max-w-xl mx-auto text-center pt-20 pb-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-2 h-2 bg-crimson rounded-full animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-crimson font-display">Cryptographic Signature Loop</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter text-dojo-black leading-[0.8] mb-6">
          Digital <br/>
          <span className="text-crimson italic">Verification</span>
        </h1>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold italic">Session logging authorization required.</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-dojo-black/5 relative mb-20 overflow-hidden rounded-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-crimson" />
        <div className="aspect-square w-full max-w-[320px] mx-auto bg-white flex items-center justify-center relative z-10 p-4 border border-dojo-black/5">
           <QRCodeSVG 
             value={student?.qrCode || 'BUSHIDO-MEMBER-MOCK-ID'} 
             size={320}
             fgColor="#000000"
             level="H"
             imageSettings={{
               src: "/favicon.ico",
               height: 50,
               width: 50,
               excavate: true,
             }}
           />
        </div>
        
        {/* Decorative corner accents - Polished Style */}
        <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-dojo-black/20" />
        <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-dojo-black/20" />
        <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-dojo-black/20" />
        <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-dojo-black/20" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-6 mb-20"
      >
        <p className="font-display font-bold text-2xl uppercase tracking-tighter text-dojo-black italic">{student?.name || 'Authorized Member Signature'}</p>
        <div className="inline-flex items-center gap-4 px-8 py-3 bg-dojo-black text-white text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl">
          <ShieldCheck size={14} className="text-crimson" />
          MEMBER_UID: {student?.qrCode || 'BUS-7892-XT'}
        </div>
      </motion.div>

      <div className="p-12 border border-dojo-black/10 bg-white text-left relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
          <ShieldCheck size={120} />
        </div>
        <div className="flex gap-8 items-start relative z-10">
          <div className="w-16 h-16 bg-crimson flex items-center justify-center text-white shrink-0 shadow-xl group-hover:rotate-12 transition-transform duration-500">
            <AlertCircle size={32} />
          </div>
          <div>
            <h4 className="font-display font-bold text-base uppercase tracking-tight text-dojo-black mb-3 italic">Terminal Protocol</h4>
            <p className="text-slate-500 text-[13px] leading-relaxed font-sans max-w-sm italic opacity-80">
              Align this signal with the instructor's scanning aperture. Ideal range: 10-20cm. If detection fails, initiate manual verification at the administrative terminal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock Data
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Heavyweight Gi', price: 120, category: 'Uniforms', stock: 15, imageUrl: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&w=800', description: 'Traditional heavy-cut canvas Gi for intermediate and advanced training. Reinforced stitching for durability.' },
  { id: '2', name: 'Training Focus Mitts', price: 65, category: 'Equipment', stock: 12, imageUrl: 'https://images.unsplash.com/photo-1549444464-32f22b0c4412?auto=format&fit=crop&w=800', description: 'High-density impact foam with ergonomic grip technology. Essential for striking precision.' },
  { id: '3', name: 'Competition Shin Guards', price: 75, category: 'Sparring Gear', stock: 8, imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=800', description: 'WKF style competition protection. Lightweight design for maximum agility and safety.' },
  { id: '4', name: 'Dojo Master Belt', price: 35, category: 'Belts', stock: 20, imageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800', description: 'Hand-sewn 100% cotton master belt. 12 rows of stitching for a lifetime of discipline.' },
];

function getNextRank(rank: Rank): string {
  const ranks: Rank[] = ["White", "Yellow", "Orange", "Green", "Blue", "Purple", "Brown", "Black"];
  const idx = ranks.indexOf(rank);
  return idx < ranks.length - 1 ? ranks[idx + 1] : "Godan (Master)";
}
