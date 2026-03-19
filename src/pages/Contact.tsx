import { Mail, Github, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <div className="max-w-screen-md mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 display">Contato</h1>
        <p className="text-xl serif text-gray-600">
          Dúvidas, sugestões ou interesse em colaborar com o projeto? 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <Mail size={24} />
          </div>
          <h3 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-xs">E-mail</h3>
          <p className="text-gray-600 serif mb-4 text-sm">Para parcerias educacionais ou feedbacks detalhados.</p>
          <a href="mailto:contato@investsim.org" className="text-indigo-600 font-bold hover:underline">contato@investsim.org</a>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center mb-6">
            <Github size={24} />
          </div>
          <h3 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-xs">Open Source</h3>
          <p className="text-gray-600 serif mb-4 text-sm">Contribua com código ou reporte bugs em nosso repositório.</p>
          <a href="#" className="text-gray-900 font-bold hover:underline">github.com/investsim</a>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-2xl flex flex-col items-center text-center">
        <MessageSquare size={32} className="mb-4 text-indigo-300" />
        <h3 className="text-2xl font-bold mb-2 display">Comunidade</h3>
        <p className="text-indigo-200 serif mb-6">Participe de nossas discussões no canal oficial para investidores iniciantes.</p>
        <button className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-indigo-50 transition-colors">
          Entrar no Discord
        </button>
      </div>
    </div>
  );
}
