export function About() {
  return (
    <div className="max-w-screen-md mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <span className="tag mb-4 inline-block">Nossa Missão</span>
        <h1 className="text-5xl font-black mb-6 display">Sobre a INVEST</h1>
        <p className="text-xl serif text-gray-600 leading-relaxed">
          Uma iniciativa educacional sem fins lucrativos dedicada a democratizar o acesso à inteligência financeira no Brasil.
        </p>
      </div>

      <div className="prose prose-indigo max-w-none serif text-lg text-gray-700 space-y-8">
        <div className="rule-thick pt-8">
          <h2 className="text-2xl font-black text-gray-900 display mb-4 uppercase tracking-tight">O Projeto</h2>
          <p>
            O InvestSim nasceu da convicção de que a educação financeira é um pilar fundamental para a liberdade individual. 
            Em um cenário econômico complexo, ferramentas simples e transparentes podem fazer a diferença entre o endividamento e a prosperidade.
          </p>
        </div>

        <div className="rule-mid pt-8">
          <h2 className="text-2xl font-black text-gray-900 display mb-4 uppercase tracking-tight">Sem Fins Lucrativos</h2>
          <p>
            Este é um projeto **totalmente gratuito e independente**. Não vendemos cursos, não somos corretora e não recebemos comissões por indicações. 
            Nosso único objetivo é fornecer simuladores precisos e análises imparciais para que você tome suas próprias decisões.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl italic">
          "A melhor forma de prever o futuro financeiro é criá-lo com conhecimento e ferramentas adequadas."
        </div>
      </div>
    </div>
  );
}
