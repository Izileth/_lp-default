import React from 'react';
import { FOOTER_SECTIONS, LEGAL_LINKS } from "../../config/navigation";

interface FooterProps {
  onPageChange: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <span 
              className="text-2xl font-black text-gray-900 cursor-pointer" 
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }} 
              onClick={() => onPageChange("Simuladores")}
            >
              INVEST
            </span>
            <p className="text-gray-500 mt-4 max-w-sm serif" style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>
              O InvestSim é o seu portal de inteligência financeira, focado em trazer clareza e ferramentas práticas para o investidor brasileiro. Projeto educacional sem fins lucrativos.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">Seções</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              {FOOTER_SECTIONS.map(s => (
                <li key={s}>
                  <button onClick={() => onPageChange(s)} className="hover:text-indigo-600 transition-colors">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              {LEGAL_LINKS.map(l => (
                <li key={l}>
                  <button onClick={() => onPageChange(l)} className="hover:text-indigo-600 transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col sm:row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-400 text-center sm:text-left">
            Simulações com fins educativos. Não constitui recomendação de investimento. CDI: 11,25% a.a. © {new Date().getFullYear()} InvestSim. Projeto sem fins lucrativos.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 bg-gray-100 rounded-full"></div>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
