import { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Simulator } from "./pages/Simulator";
import { Investments } from "./pages/Investments";
import { Finance } from "./pages/Finance";
import { Economy } from "./pages/Economy";
import { Tech } from "./pages/Tech";
import { Career } from "./pages/Career";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Simuladores");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "Simuladores":
        return <Simulator />;
      case "Investimentos":
        return <Investments />;
      case "Finanças":
        return <Finance />;
      case "Economia":
        return <Economy />;
      case "Tecnologia":
        return <Tech />;
      case "Carreira":
        return <Career />;
      default:
        return <Simulator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        body { font-family:'DM Sans',sans-serif; background:#f9fafb; }
        .serif { font-family:'Source Serif 4',Georgia,serif; }
        .display { font-family:'Playfair Display',Georgia,serif; }
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
        input[type=range]{accent-color:#4F46E5}
        .tag{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#4F46E5}
        .rule-thick{border-top:3px solid #111827}
        .rule-mid{border-top:1px solid #e5e7eb}
      `}</style>

      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />

      <main>
        {renderPage()}
      </main>

      {currentPage !== "Simuladores" && (
        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-3xl font-black mb-3" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Fique por dentro do mercado</h3>
              <p className="text-indigo-100 serif" style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>Receba análises exclusivas e as melhores oportunidades de investimento diretamente no seu e-mail.</p>
            </div>
            <div className="w-full max-w-sm">
              {sent ? (
                <div className="bg-indigo-700/50 p-4 rounded-lg text-center font-bold">✓ Inscrição confirmada!</div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:border-white transition-all"
                  />
                  <button
                    onClick={() => email.includes("@") && setSent(true)}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-indigo-50 transition-colors"
                  >
                    Assinar
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <span className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>INVEST</span>
              <p className="text-gray-500 mt-4 max-w-sm serif" style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>
                O InvestSim é o seu portal de inteligência financeira, focado em trazer clareza e ferramentas práticas para o investidor brasileiro.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">Seções</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                {["Simuladores", "Investimentos", "Finanças", "Economia"].map(s => (
                  <li key={s}><button onClick={() => setCurrentPage(s)} className="hover:text-indigo-600 transition-colors">{s}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-gray-400 text-center sm:text-left">
              Simulações com fins educativos. Não constitui recomendação de investimento. CDI: 11,25% a.a. © {new Date().getFullYear()} InvestSim. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 bg-gray-100 rounded-full"></div>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
