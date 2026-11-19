const perguntas = [
  {p:'O que é o Pluvia?', r:'Uma plataforma acadêmica para consulta de regiões, sensores e leituras relacionadas ao risco de alagamentos.'},
  {p:'Como funciona o monitoramento?',r:'A API recebe leituras de sensores cadastrados e atualiza a classificação de risco de uma região de acordo com os limites configurados.'},
  {p:'Quais são os níveis de risco?',r:'NORMAL, ATENCAO, ALERTA e EMERGENCIA.'},
  {p:'O projeto utiliza inteligência artificial?',r:'O projeto acadêmico inclui modelos de aprendizado de máquina. A integração dos modelos à interface depende da disponibilidade do serviço de IA.'},
  {p:'As informações substituem alertas oficiais?',r:'Não. Este é um protótipo acadêmico e não substitui a Defesa Civil ou outras autoridades.'},
]
export default function FAQ() { return <main className="mx-auto w-full max-w-4xl px-6 py-16"><span className="font-semibold text-[#269DBB]">CENTRAL DE AJUDA</span><h1 className="mt-3 text-4xl font-bold">Perguntas frequentes</h1><p className="mt-5 text-lg text-slate-600">Conheça o funcionamento e os limites do Pluvia.</p><div className="mt-10 space-y-4">{perguntas.map(item=><details key={item.p} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{item.p}<span className="text-2xl text-[#55BEDD] group-open:rotate-45">+</span></summary><p className="mt-4 leading-7 text-slate-600">{item.r}</p></details>)}</div></main> }
