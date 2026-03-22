import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSent(true);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md text-center md:text-left">
          <h3 
            className="text-3xl font-black mb-3" 
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
          >
            Fique por dentro do mercado
          </h3>
          <p 
            className="text-indigo-100 serif" 
            style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}
          >
            Receba análises exclusivas e as melhores oportunidades de investimento diretamente no seu e-mail.
          </p>
        </div>
        <div className="w-full max-w-sm">
          {sent ? (
            <div className="bg-indigo-700/50 p-4 rounded-lg text-center font-bold">✓ Inscrição confirmada!</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:border-white transition-all"
              />
              <button
                type="submit"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-indigo-50 transition-colors"
              >
                Assinar
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
