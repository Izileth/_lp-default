import { useState } from "react";
import { Menu, X, Bell, Newspaper } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MAIN_NAV_LINKS } from "../../config/navigation";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handlePageSelect = (page: string) => {
    onPageChange(page);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="p-1 -ml-1 text-gray-500 hover:text-gray-900 focus:outline-none md:hidden"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
              <div className="text-xs text-gray-400 font-medium hidden sm:block">
                {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>

            <div 
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }} 
              className="text-3xl font-black tracking-tight text-gray-900 select-none cursor-pointer"
              onClick={() => handlePageSelect("Simuladores")}
            >
              INVEST
            </div>

            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors">
                <Newspaper size={14} />
                Newsletter
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <Bell size={20} />
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center overflow-x-auto py-1 gap-0" style={{ scrollbarWidth: "none" }}>
            {MAIN_NAV_LINKS.map(l => (
              <button 
                key={l} 
                onClick={() => handlePageSelect(l)}
                className={`text-[11px] font-bold uppercase tracking-widest px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
                  currentPage === l 
                    ? "text-gray-900 border-gray-900" 
                    : "text-gray-500 hover:text-gray-900 border-transparent hover:border-gray-900"
                }`}
              >
                {l}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 py-1.5 border-t border-gray-100 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 whitespace-nowrap">Trending</span>
            {["CDI 2026", "CDB vs LCI", "Tesouro Selic", "IR sobre Investimentos"].map(t => (
              <button key={t} className="text-[10px] font-semibold text-gray-500 hover:text-indigo-600 whitespace-nowrap transition-colors">{t}</button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <span className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                  INVEST
                </span>
                <button onClick={toggleSidebar} className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <div className="px-6 mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Seções</h3>
                  <div className="flex flex-col gap-1">
                    {MAIN_NAV_LINKS.map(l => (
                      <button
                        key={l}
                        onClick={() => handlePageSelect(l)}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                          currentPage === l
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Populares</h3>
                  <div className="flex flex-col gap-4">
                    {["CDI 2026", "CDB vs LCI", "Tesouro Selic"].map(t => (
                      <button key={t} className="text-left group">
                        <span className="block text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{t}</span>
                        <span className="text-[10px] text-gray-400">Tudo sobre as taxas atuais</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-4 rounded-xl transition-colors">
                  <Newspaper size={16} />
                  Assinar Newsletter
                </button>
                <p className="mt-4 text-[10px] text-gray-400 text-center">
                  Acesso ilimitado à inteligência financeira.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
