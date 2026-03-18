export function Tech() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Tecnologia</h1>
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-indigo-600 aspect-video rounded-xl shadow-2xl"></div>
          <div>
            <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">Inovação</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4 leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>IA Generativa no Mercado Financeiro: Revolução ou Hype?</h2>
            <p className="text-gray-500 text-lg serif mb-6" style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>Como as novas ferramentas de inteligência artificial estão mudando a forma como investimos e gerimos nossos ativos.</p>
            <button className="px-6 py-3 bg-gray-900 text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-indigo-600 transition-colors">Ver Detalhes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
