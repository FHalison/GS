import Icone from '../components/Icone'

const equipe = [
  { nome: 'Francisco Halison', sigla: 'FH', RM: '573616' , area: 'Front-end e Python', descricao: 'Interface web em React e módulo administrativo de relatos de alagamento.', icone: 'codigo' as const },
  { nome: 'Pedro Martins', sigla: 'PM', RM: '573299' , area: 'IA e Banco de Dados', descricao: 'Modelos de análise hidrológica e estrutura de dados do projeto.', icone: 'cerebro' as const },
  { nome: 'Gustavo Santos', sigla: 'GS', RM: '572560' , area: 'Java e Engenharia de Software', descricao: 'API REST para regiões, sensores e leituras, e arquitetura do sistema.', icone: 'servidor' as const },
]

export default function Equipe() {
  return <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
    <span className="font-semibold tracking-widest text-[#168DAD]">QUEM FAZ ACONTECER</span>
    <h1 className="mt-3 text-4xl font-extrabold">Nossa equipe</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Três estudantes de Análise e Desenvolvimento de Sistemas da FIAP unindo interface, dados e engenharia para desenvolver o Pluvia.</p>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {equipe.map((p) => <article key={p.nome} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
        <div className="h-2 bg-gradient-to-r from-[#123A56] to-[#55BEDD]" />
        <div className="p-8"><div className="mb-6 flex items-center justify-between"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F4FA] text-3xl font-bold text-[#168DAD]">{p.sigla}</div><span className="rounded-xl bg-slate-100 p-3 text-[#168DAD]"><Icone nome={p.icone}/></span></div>
        <h2 className="text-2xl font-extrabold">{p.nome}</h2><p className="mt-2 text-sm font-semibold text-[#168DAD]">RM: {p.RM}</p><p className="mt-1 font-semibold text-[#168DAD]">{p.area}</p><p className="mt-5 min-h-24 leading-7 text-slate-600">{p.descricao}</p><p className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-400">FIAP · Global Solution 2026</p></div>
      </article>)}
    </div>
  </main>
}
