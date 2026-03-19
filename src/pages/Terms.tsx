export function Terms() {
  return (
    <div className="max-w-screen-md mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-8 display">Termos de Uso</h1>
      
      <div className="prose prose-indigo max-w-none serif text-gray-700 space-y-6">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
          <p className="text-amber-800 font-medium">
            Atenção: Todo o conteúdo deste site tem caráter puramente educativo e informativo.
          </p>
        </div>

        <section className="rule-mid pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Não constitui Recomendação</h2>
          <p>
            As simulações e artigos apresentados no InvestSim não constituem recomendação de investimento, assessoria jurídica ou tributária. 
            Decisões financeiras envolvem riscos e devem ser tomadas com cautela.
          </p>
        </section>

        <section className="rule-mid pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Precisão das Informações</h2>
          <p>
            Embora nos esforcemos para manter todos os índices (como CDI e Selic) atualizados, os resultados dos simuladores são estimativas baseadas em fórmulas matemáticas e podem variar conforme o cenário real do mercado.
          </p>
        </section>

        <section className="rule-mid pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Uso Permitido</h2>
          <p>
            O conteúdo deste projeto pode ser compartilhado para fins educacionais, desde que citada a fonte. O uso comercial de nossas ferramentas sem autorização prévia é proibido.
          </p>
        </section>
      </div>
    </div>
  );
}
