import React, { useState } from 'react';
import { BarChart3, Activity, Cpu, Lightbulb, Menu, X } from 'lucide-react';

export type MainSection = 'npci' | 'phonepe' | 'models' | 'insights';

interface NavbarProps {
  activeSection: MainSection;
  setActiveSection: (sec: MainSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: MainSection; label: string; icon: React.ElementType }[] = [
    { id: 'npci', label: 'NPCI Analytics', icon: BarChart3 },
    { id: 'phonepe', label: 'PhonePe Pulse Analytics', icon: Activity },
    { id: 'models', label: 'Models', icon: Cpu },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
  ];

  const handleNavClick = (id: MainSection) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo / Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              ⚡
            </div>
            <div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavClick('npci'); }}
                className="text-base font-bold tracking-tight text-white whitespace-nowrap"
              >
                UPI Transaction Intelligence
              </a>
            </div>
          </div>

          {/* Desktop 4-Item Menu Bar */}
          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {(item.id === 'models' || item.id === 'insights') && (
                    <span className="text-[10px] bg-slate-800 text-amber-400 font-mono px-1.5 py-0.2 rounded-xs border border-amber-500/30">
                      DEV
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold ${
                  isActive ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {(item.id === 'models' || item.id === 'insights') && (
                  <span className="text-[10px] bg-slate-800 text-amber-400 font-mono px-1.5 py-0.2 rounded-xs border border-amber-500/30">
                    DEV
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
