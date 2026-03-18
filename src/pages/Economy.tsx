export function Economy() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Economia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex gap-4 border-b border-gray-100 pb-6">
            <div className="w-24 h-24 bg-gray-200 shrink-0 rounded"></div>
            <div>
              <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Cenário {i}</div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Impacto da Selic na Economia Real e no seu Bolso em 2026</h2>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>Análise profunda sobre os indicadores macroeconômicos e o que esperar para o próximo trimestre.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
