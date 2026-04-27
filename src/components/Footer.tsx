import { Link } from 'react-router-dom';
import { Sword, Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-crimson rounded-lg flex items-center justify-center text-white">
                <Sword size={20} strokeWidth={2.5} />
              </div>
              <span className="font-display font-medium text-xl tracking-tighter uppercase">
                Bushido<span className="text-crimson">Dojo</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Traditional Shotokan Karate excellence since 1984. Building character, discipline, and strength in the heart of the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-crimson mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/trial" className="text-sm text-white/70 hover:text-white transition-colors">Free Trial</Link></li>
              <li><Link to="/instructors" className="text-sm text-white/70 hover:text-white transition-colors">Instructors</Link></li>
              <li><Link to="/portal" className="text-sm text-white/70 hover:text-white transition-colors">Member Portal</Link></li>
              <li><Link to="/admin" className="text-sm text-white/70 hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-crimson mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-crimson shrink-0" />
                <span className="text-sm text-white/70">123 Dojo Street, Martial Arts District, City 45678</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-crimson shrink-0" />
                <span className="text-sm text-white/70">(555) 012-3456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-crimson shrink-0" />
                <span className="text-sm text-white/70">info@bushidodojo.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-crimson mb-6">Follow Us</h4>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-crimson hover:border-crimson transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-4 text-white/30 text-[10px] uppercase tracking-widest font-display">
          <p>© 2026 Bushido Dojo School of Karate. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
