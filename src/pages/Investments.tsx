export function Investments() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Investimentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Categoria {i}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Título do Artigo de Investimento {i}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">Breve descrição sobre as melhores oportunidades do mercado financeiro atual e como diversificar sua carteira.</p>
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest">Leia mais →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
