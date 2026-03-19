export function Privacy() {
  return (
    <div className="max-w-screen-md mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-8 display">Política de Privacidade</h1>
      
      <div className="prose prose-indigo max-w-none serif text-gray-700 space-y-6">
        <p className="font-bold text-gray-900">Última atualização: Março de 2026</p>
        
        <section className="rule-mid pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Coleta de Dados</h2>
          <p>
            Como um projeto educacional sem fins lucrativos, minimizamos ao máximo a coleta de dados. 
            Os dados inseridos em nossos simuladores (valores, prazos, taxas) são processados localmente no seu navegador e não são armazenados em nossos servidores.
          </p>
        </section>

        <section className="rule-mid pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Newsletter</h2>
          <p>
            Caso você opte por assinar nossa newsletter, solicitamos apenas o seu endereço de e-mail. 
            Este dado é utilizado exclusivamente para o envio de conteúdos educativos e nunca será vendido ou compartilhado com terceiros.
          </p>
        </section>

        <section className="rule-mid pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Cookies</h2>
          <p>
            Utilizamos apenas cookies essenciais para o funcionamento técnico do site e análises anônimas de tráfego para entender quais ferramentas são mais úteis para a comunidade.
          </p>
        </section>
      </div>
    </div>
  );
}
