import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Trial } from './pages/Trial';
import { MemberPortal } from './pages/MemberPortal';
import { Instructors } from './pages/Instructors';
import { InstructorDashboard } from './pages/InstructorDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { Toaster } from 'react-hot-toast'; // I'll install this too

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-black flex flex-col">
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trial" element={<Trial />} />
            <Route path="/portal/*" element={<MemberPortal />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
