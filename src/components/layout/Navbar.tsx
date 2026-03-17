export function Navbar() {
  const links = ["Simuladores", "Investimentos", "Finanças", "Economia", "Tecnologia", "Carreira"];
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="text-xs text-gray-400 font-medium hidden sm:block">
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif" }} className="text-3xl font-black tracking-tight text-gray-900 select-none">
            InvestSim
          </div>
          <button className="text-xs font-bold uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors">
            Newsletter
          </button>
        </div>
        <nav className="flex items-center overflow-x-auto py-1 gap-0" style={{ scrollbarWidth: "none" }}>
          {links.map(l => (
            <button key={l} className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 px-3 py-2.5 whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-gray-900">
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
  );
}
