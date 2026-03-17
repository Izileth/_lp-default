import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
import type { 
  InvestmentType, 
  RentMode, 
  Unidade, 
  InvestmentResult, 
  ChartDataPoint, 
  ComparisonResult 
} from "./types/investment";

// Utils
import { 
  CDI, 
  fmt, 
  fmtN, 
  calcInvestment, 
  buildChartData 
} from "./lib/investment-utils";

// Components
import { Navbar } from "./components/layout/Navbar";
import { AnimCounter } from "./components/shared/AnimCounter";
import { Sparkline } from "./components/shared/Sparkline";
import { Field } from "./components/forms/Field";
import { TextInput } from "./components/forms/TextInput";

export default function InvestmentSimulator() {
  const [inicial, setInicial] = useState("10000");
  const [aporte, setAporte] = useState("500");
  const [tempo, setTempo] = useState("24");
  const [unidade, setUnidade] = useState<Unidade>("meses");
  const [tipo, setTipo] = useState<InvestmentType>("CDB");
  const [rentMode, setRentMode] = useState<RentMode>("cdi");
  const [pctCDI, setPctCDI] = useState("110");
  const [taxaAnual, setTaxaAnual] = useState("12");
  const [result, setResult] = useState<InvestmentResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[] | null>(null);
  const [comparison, setComp] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const meses = unidade === "anos" ? Number(tempo) * 12 : Number(tempo);
  const effectiveTaxa = rentMode === "cdi" ? (CDI * Number(pctCDI)) / 100 : Number(taxaAnual);

  const handleCalc = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const p = { 
        inicial: Number(inicial) || 0, 
        aporte: Number(aporte) || 0, 
        meses, 
        taxaAnual: effectiveTaxa,
        tipo
      };
      
      setResult(calcInvestment(p));
      setChartData(buildChartData(p.inicial, p.aporte, meses, effectiveTaxa));
      
      const rates: Record<InvestmentType, number> = { 
        CDB: effectiveTaxa, 
        LCI: effectiveTaxa * 0.97, 
        LCA: effectiveTaxa * 0.97 
      };
      
      const comp: Record<string, InvestmentResult & { taxa: number }> = {};
      (["CDB", "LCI", "LCA"] as InvestmentType[]).forEach((t) => {
        comp[t] = { 
          ...calcInvestment({ ...p, tipo: t, taxaAnual: rates[t] }), 
          taxa: rates[t] 
        };
      });
      
      const best = (["CDB", "LCI", "LCA"] as InvestmentType[]).reduce((a, b) => 
        comp[a].liquido >= comp[b].liquido ? a : b
      );
      
      setComp({ comp, best, rates });
      setLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, 500);
  }, [inicial, aporte, meses, tipo, effectiveTaxa]);

  const pctGain = result ? (result.liquido / result.totalInvestido - 1) * 100 : 0;

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

      <Navbar />

      {/* hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="max-w-3xl">
            <span className="tag">Simuladores · Renda Fixa</span>
            <h1 className="display text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-[1.05] mt-3 mb-5 text-gray-900" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
              Quanto seu dinheiro pode render em CDB, LCI e LCA?
            </h1>
            <p className="serif text-gray-500 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>
              Use nossa calculadora editorial para simular juros compostos, comparar investimentos em renda fixa e descobrir o impacto do Imposto de Renda regressivo no seu patrimônio.
            </p>
            <div className="flex items-center gap-3 mt-5 text-xs text-gray-400 font-medium flex-wrap">
              <span>Por <span className="text-gray-700 font-semibold">Redação InvestSim</span></span>
              <span>·</span>
              <span>{new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span className="text-indigo-600 font-semibold">CDI atual: {CDI}% a.a.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* main */}
          <main className="lg:col-span-8 space-y-6">

            {/* simulator */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="rule-thick" />
              <div className="px-6 pt-5 pb-2 flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Configure a simulação</h2>
                <span className="tag">Calculadora</span>
              </div>
              <div className="rule-mid mx-6 mb-5" />
              <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Valor inicial" note="Capital disponível para investir">
                  <TextInput value={inicial} onChange={setInicial} prefix="R$" placeholder="10.000" />
                </Field>
                <Field label="Aporte mensal" note="Valor adicional por mês (opcional)">
                  <TextInput value={aporte} onChange={setAporte} prefix="R$" placeholder="500" />
                </Field>
                <Field label="Período">
                  <div className="flex gap-2">
                    <input type="number" value={tempo} onChange={e => setTempo(e.target.value)}
                      className="flex-1 border border-gray-200 rounded bg-white px-3 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-all" />
                    <select value={unidade} onChange={e => setUnidade(e.target.value as Unidade)}
                      className="border border-gray-200 rounded bg-white px-3 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:border-indigo-500 transition-all">
                      <option value="meses">Meses</option>
                      <option value="anos">Anos</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-gray-400">{meses} meses no total</p>
                </Field>
                <Field label="Tipo de investimento">
                  <div className="grid grid-cols-3 gap-2">
                    {(["CDB", "LCI", "LCA"] as InvestmentType[]).map(t => (
                      <button key={t} onClick={() => setTipo(t)}
                        className={`py-3 text-sm font-bold border rounded transition-all ${tipo === t ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400">{tipo === "CDB" ? "IR regressivo de 15% a 22,5% sobre o rendimento" : "Isento de Imposto de Renda para pessoa física ✓"}</p>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Rentabilidade">
                    <div className="flex gap-2 mb-3">
                      {( [["cdi", "% do CDI"], ["anual", "Taxa anual"]] as [RentMode, string][]).map(([m, l]) => (
                        <button key={m} onClick={() => setRentMode(m)}
                          className={`px-4 py-2 text-xs font-bold border rounded transition-all ${rentMode === m ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                    {rentMode === "cdi" ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "monospace" }}>{pctCDI}% do CDI</span>
                          <span className="text-xs text-gray-500" style={{ fontFamily: "monospace" }}>≈ {effectiveTaxa.toFixed(2)}% a.a.</span>
                        </div>
                        <input type="range" min="80" max="150" value={pctCDI} onChange={e => setPctCDI(e.target.value)} className="w-full h-1.5 rounded-full cursor-pointer" />
                        <div className="flex justify-between text-[10px] text-gray-400" style={{ fontFamily: "monospace" }}>
                          <span>80% CDI</span><span>CDI: {CDI}% a.a.</span><span>150% CDI</span>
                        </div>
                      </div>
                    ) : (
                      <TextInput value={taxaAnual} onChange={setTaxaAnual} placeholder="12" />
                    )}
                  </Field>
                </div>
              </div>
              <div className="px-6 pb-6">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handleCalc} disabled={loading}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-sm uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2">
                  {loading ? (
                    <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M21 12a9 9 0 11-9-9" strokeLinecap="round" />
                    </motion.svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                    </svg>
                  )}
                  {loading ? "Calculando..." : "Calcular investimento"}
                </motion.button>
              </div>
            </div>

            {/* results */}
            <AnimatePresence>
              {result && (
                <motion.div key="res" ref={resultsRef} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

                  {/* headline numbers */}
                  <div className="bg-white border border-gray-200 overflow-hidden">
                    <div className="rule-thick" />
                    <div className="px-6 py-5">
                      <span className="tag">Resultado da simulação</span>
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-end gap-6 flex-wrap">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Valor final líquido</p>
                          <div className="text-4xl sm:text-5xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                            <AnimCounter value={result.liquido} />
                          </div>
                          <p className="text-sm text-green-600 font-semibold mt-1">+{fmtN(pctGain)}% sobre o capital investido</p>
                        </div>
                        <div className="flex gap-5 sm:pb-1 flex-wrap">
                          {[
                            { l: "Total investido", v: fmt(result.totalInvestido), c: "text-gray-900" },
                            { l: "Rendimento bruto", v: fmt(result.juros), c: "text-green-600" },
                            ...(tipo === "CDB" ? [{ l: "IR descontado", v: fmt(result.ir), c: "text-red-500" }] : [{ l: "IR", v: "Isento", c: "text-green-600" }]),
                          ].map(item => (
                            <div key={item.l}>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.l}</p>
                              <p className={`text-base font-semibold ${item.c}`} style={{ fontFamily: "monospace" }}>{item.v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {chartData && (
                      <div className="px-6 pb-6">
                        <div className="rule-mid mb-4" />
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Evolução do patrimônio — {meses} meses</p>
                        <div className="h-52 sm:h-64">
                          <Sparkline data={chartData} accent="#4F46E5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* comparador */}
                  {comparison && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                      className="bg-white border border-gray-200 overflow-hidden">
                      <div className="rule-thick" />
                      <div className="px-6 pt-5 pb-2 flex items-center justify-between">
                        <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                          Comparador: CDB vs LCI vs LCA
                        </h2>
                        <span className="tag">Análise</span>
                      </div>
                      <div className="px-5 py-3 bg-indigo-50 border-y border-indigo-100 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-indigo-600 shrink-0">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <p className="text-sm font-semibold text-indigo-700">
                          Melhor opção: <span className="font-black">{comparison.best}</span>
                          {" "}— retorno líquido de {fmt(comparison.comp[comparison.best].liquido)}
                        </p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              {["Produto", "Investido", "Rendimento", "IR", "Líquido", "Taxa a.a."].map(h => (
                                <th key={h} className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(["CDB", "LCI", "LCA"] as InvestmentType[]).map(t => {
                              const r = comparison.comp[t];
                              const isBest = t === comparison.best;
                              return (
                                <motion.tr key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                  className={`border-b border-gray-100 transition-colors ${isBest ? "bg-indigo-50/50" : "hover:bg-gray-50"}`}>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                      <span className={`font-black ${isBest ? "text-indigo-700" : "text-gray-900"}`}>{t}</span>
                                      {isBest && <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.5 rounded font-black uppercase tracking-wider">Melhor</span>}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-gray-600" style={{ fontFamily: "monospace" }}>{fmt(r.totalInvestido)}</td>
                                  <td className="px-4 py-4 text-green-600 font-semibold" style={{ fontFamily: "monospace" }}>{fmt(r.juros)}</td>
                                  <td className="px-4 py-4" style={{ fontFamily: "monospace" }}>
                                    {t === "CDB" ? <span className="text-red-500">{fmt(r.ir)}</span> : <span className="text-green-600 font-bold">Isento</span>}
                                  </td>
                                  <td className="px-4 py-4 font-black text-gray-900" style={{ fontFamily: "monospace" }}>{fmt(r.liquido)}</td>
                                  <td className="px-4 py-4 text-gray-500" style={{ fontFamily: "monospace" }}>{fmtN(comparison.rates[t])}%</td>
                                </motion.tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="px-5 py-3 text-[10px] text-gray-400 border-t border-gray-100 flex flex-wrap gap-4">
                        <span>CDI de referência: {CDI}% a.a.</span>
                        <span>IR regressivo: 22,5% (até 6m) → 15% (acima de 24m)</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* insights editorial */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="rule-thick" />
              <div className="px-6 py-5">
                <span className="tag">Análise editorial</span>
                <h2 className="text-2xl font-black text-gray-900 mt-2 mb-5" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                  O que você precisa saber antes de investir
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      n: "01", title: "LCI e LCA vencem na maioria dos perfis",
                      text: "A isenção de IR pode compensar taxas um pouco menores. Para prazos acima de 12 meses, verifique sempre o retorno líquido antes de decidir."
                    },
                    {
                      n: "02", title: "CDB acima de 110% do CDI é competitivo",
                      text: "Em prazos superiores a 2 anos, a alíquota cai para 15%. Um CDB de 115% do CDI pode superar LCI de 97% do CDI após a tabela regressiva."
                    },
                    {
                      n: "03", title: "Todos têm cobertura do FGC",
                      text: "O Fundo Garantidor de Créditos cobre até R$250.000 por CPF por instituição financeira em CDB, LCI e LCA."
                    },
                  ].map(item => (
                    <div key={item.n} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                      <span className="text-3xl font-black text-gray-200 leading-none mt-0.5 shrink-0" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{item.n}</span>
                      <div>
                        <h3 className="text-base font-black text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{item.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* sidebar */}
          <aside className="lg:col-span-4 space-y-5">

            {/* newsletter */}
            <div className="bg-indigo-600 text-white overflow-hidden">
              <div className="border-t-4 border-indigo-400" />
              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-1">Exclusivo</p>
                <h3 className="text-xl font-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                  Análises de renda fixa toda semana
                </h3>
                <p className="text-indigo-200 text-sm leading-relaxed mb-4">Alertas de taxa CDI, oportunidades de CDB e dicas para otimizar seu IR.</p>
                {sent ? (
                  <div className="flex items-center gap-2 text-indigo-200 text-sm font-semibold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><polyline points="20 6 9 17 4 12" /></svg>
                    Cadastrado com sucesso!
                  </div>
                ) : (
                  <>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com"
                      className="w-full bg-indigo-700/60 border border-indigo-500/50 rounded px-3 py-2.5 text-sm text-white placeholder-indigo-300 focus:outline-none focus:border-white transition-all mb-2" />
                    <button onClick={() => email.includes("@") && setSent(true)}
                      className="w-full py-2.5 bg-white hover:bg-indigo-50 text-indigo-700 font-black text-xs uppercase tracking-widest rounded transition-colors">
                      Quero receber
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* taxas referência */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="border-t-4 border-gray-900" />
              <div className="p-5">
                <p className="tag mb-3">Taxas de referência</p>
                <div className="space-y-0">
                  {[
                    { l: "CDI", v: `${CDI}%`, note: "ao ano" },
                    { l: "Selic", v: "10,5%", note: "ao ano" },
                    { l: "IPCA (12m)", v: "4,83%", note: "inflação" },
                    { l: "Poupança", v: "6,17%", note: "ao ano" },
                  ].map(item => (
                    <div key={item.l} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-xs font-bold text-gray-600">{item.l}</span>
                      <div className="text-right">
                        <span className="font-black text-gray-900 text-sm" style={{ fontFamily: "monospace" }}>{item.v}</span>
                        <span className="text-[10px] text-gray-400 ml-1">{item.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* IR table */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="border-t-4 border-amber-500" />
              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-3">Tabela IR Regressivo — CDB</p>
                <div className="space-y-1.5">
                  {[
                    { prazo: "Até 6 meses", ir: "22,5%", best: false },
                    { prazo: "6 a 12 meses", ir: "20,0%", best: false },
                    { prazo: "12 a 24 meses", ir: "17,5%", best: false },
                    { prazo: "Acima de 24 meses", ir: "15,0%", best: true },
                  ].map(row => (
                    <div key={row.prazo} className={`flex justify-between items-center px-3 py-2 rounded text-xs ${row.best ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}>
                      <span className="text-gray-600 font-medium">{row.prazo}</span>
                      <span className={`font-black ${row.best ? "text-green-600" : "text-red-500"}`} style={{ fontFamily: "monospace" }}>{row.ir}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-3">LCI e LCA são isentos de IR para pessoa física.</p>
              </div>
            </div>

            {/* quick facts */}
            <div className="bg-gray-900 text-white overflow-hidden">
              <div className="border-t-4 border-white" />
              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Sabia que?</p>
                <div className="space-y-4">
                  {[
                    "O FGC cobre até R$250.000 por CPF por banco — diversifique para maximizar a proteção.",
                    "Um CDB de 110% do CDI rende mais que o dobro da poupança no longo prazo.",
                    "Aportes mensais regulares podem triplicar seu patrimônio via juros compostos.",
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                      <span className="text-2xl font-black text-gray-700 leading-none shrink-0" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>{i + 1}</span>
                      <span style={{ fontFamily: "'Source Serif 4',Georgia,serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* footer */}
      <footer className="border-t border-gray-200 bg-white mt-4">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Invest</span>
          <p className="text-xs text-gray-400 text-center">
            Simulações com fins educativos. Não constitui recomendação de investimento. CDI: {CDI}% a.a. © {new Date().getFullYear()}
          </p>
          <div className="flex gap-4 text-xs font-semibold text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Sobre</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
