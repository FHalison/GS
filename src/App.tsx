import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Regioes from './pages/Regioes'
import Monitoramento from './pages/Monitoramento'
import FAQ from './pages/FAQ'
import Contato from './pages/Contato'
import Equipe from './pages/Equipe'

const links = [
  ['/', 'Início'], ['/sobre', 'Sobre'], ['/regioes', 'Regiões'],
  ['/monitoramento', 'Monitoramento'], ['/faq', 'FAQ'],
  ['/contato', 'Contato'], ['/equipe', 'Equipe'],
]

export default function App() {
  return <BrowserRouter>
    <div className="flex min-h-screen flex-col bg-[#F8FBFD] text-[#123A56]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src="/logo-pluvia.png"
              alt="Pluvia"
              className="h-14 w-auto object-contain"
              />
          </NavLink>
          <nav aria-label="Navegação principal" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium">
            {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'font-bold text-[#168DAD] underline underline-offset-8' : 'text-slate-600 transition hover:text-[#168DAD]'}>{label}</NavLink>)}
          </nav>
        </div>
      </header>
      <div className="flex w-full flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/regioes" element={<Regioes />} />
          <Route path="/monitoramento" element={<Monitoramento />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="*" element={<main className="mx-auto max-w-5xl p-12"><h1 className="text-4xl font-bold">Página não encontrada</h1><NavLink to="/" className="mt-6 inline-block underline">Voltar ao início</NavLink></main>} />
        </Routes>
      </div>
      <footer className="mt-auto border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">© 2026 Pluvia — FIAP Global Solution · Projeto acadêmico, não substitui alertas oficiais</footer>
    </div>
  </BrowserRouter>
}
