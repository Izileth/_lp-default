export function Career() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Carreira</h1>
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Oportunidades no Setor Financeiro</h2>
        <div className="space-y-4">
          {[
            { role: "Analista de Investimentos Sênior", location: "São Paulo, SP", type: "Presencial" },
            { role: "Desenvolvedor Fintech Fullstack", location: "Remoto", type: "Full-time" },
            { role: "Gerente de Wealth Management", location: "Rio de Janeiro, RJ", type: "Híbrido" },
          ].map((job, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:border-indigo-200 transition-colors cursor-pointer group">
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{job.role}</h3>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">{job.location} · {job.type}</p>
              </div>
              <button className="text-xs font-black uppercase text-gray-400 group-hover:text-indigo-600">Candidatar-se</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
