import { Link } from 'react-router-dom'
import Icone from '../components/Icone'

const cards = [
  { titulo: 'Regiões monitoradas', texto: 'Consulte regiões cadastradas e níveis de risco informados pela API.', rota: '/regioes', icone: 'mapa' as const },
  { titulo: 'Sensores e leituras', texto: 'Acompanhe sensores e registros hidrológicos disponíveis.', rota: '/monitoramento', icone: 'sensor' as const },
  { titulo: 'Prevenção e informação', texto: 'Entenda a proposta acadêmica e o uso responsável dos dados.', rota: '/sobre', icone: 'escudo' as const },
]

export default function Home() {
  return <main className="flex flex-1 flex-col">
    <section className="relative overflow-hidden bg-gradient-to-br from-[#123A56] via-[#175477] to-[#238DAA] px-6 py-20 text-white">
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border-[60px] border-white/5" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          <span className="inline-flex rounded-full border border-cyan-200/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-cyan-100">MONITORAMENTO INTELIGENTE</span>
          <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">Informação que antecipa riscos.<span className="block text-[#80DEF4]">Tecnologia que protege.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">O Pluvia reúne informações de regiões, sensores e leituras para apoiar o acompanhamento de condições associadas a alagamentos.</p>
          <div className="mt-10 flex flex-wrap gap-4"><Link to="/regioes" className="rounded-xl bg-[#55BEDD] px-7 py-4 font-bold text-[#123A56] hover:bg-[#8BDEEF]">Explorar regiões</Link><Link to="/monitoramento" className="rounded-xl border border-white/40 px-7 py-4 font-semibold hover:bg-white/10">Ver monitoramento</Link></div>
        </div>
        <div className="mx-auto flex w-full max-w-sm items-center justify-center">
          <img
            src="/logo-pluvia.png"
            alt="Logo do Pluvia"
            className="h-64 w-auto max-w-full object-contain"
            />
          </div>
      </div>
    </section>
    <section className="mx-auto w-full max-w-6xl px-6 py-16"><div className="grid gap-6 md:grid-cols-3">{cards.map(c => <Link key={c.rota} to={c.rota} className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#55BEDD] hover:shadow-lg"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E5F4FA] text-[#168DAD]"><Icone nome={c.icone} tamanho={30}/></div><h2 className="text-xl font-bold">{c.titulo}</h2><p className="mt-3 leading-7 text-slate-600">{c.texto}</p><span className="mt-6 inline-block font-semibold text-[#168DAD]">Saiba mais →</span></Link>)}</div></section>
  </main>
}
