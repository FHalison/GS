import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { API_BASE, atualizarRegiao, criarRegiao, excluirRegiao, listarRegioes, type Regiao } from '../services/api'

const riscoCor: Record<string, string> = { NORMAL: 'bg-emerald-100 text-emerald-800', ATENCAO: 'bg-yellow-100 text-yellow-800', ALERTA: 'bg-orange-100 text-orange-800', EMERGENCIA: 'bg-red-100 text-red-800' }
const vazio = { nome: '', cidade: '' }

export default function Regioes() {
  const [regioes, setRegioes] = useState<Regiao[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [form, setForm] = useState(vazio)
  const [editando, setEditando] = useState<number | null>(null)
  const [busca, setBusca] = useState('')

  const carregar = useCallback(async () => {
    setLoading(true); setErro('')
    try { setRegioes(await listarRegioes()) }
    catch (e) { setErro(e instanceof Error ? e.message : 'Falha ao carregar as regiões.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void carregar() }, [carregar])

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSalvando(true); setErro(''); setMensagem('')
    try {
      const dados = { nome: form.nome.trim(), cidade: form.cidade.trim() }
      if (editando === null) { await criarRegiao(dados); setMensagem('Região cadastrada na API.') }
      else { await atualizarRegiao(editando, dados); setMensagem('Região atualizada na API.') }
      setForm(vazio); setEditando(null); await carregar()
    } catch (e) { setErro(e instanceof Error ? e.message : 'Erro ao salvar região.') }
    finally { setSalvando(false) }
  }

  function editar(r: Regiao) { setEditando(r.id); setForm({ nome: r.nome, cidade: r.cidade }); setMensagem(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  async function remover(r: Regiao) {
    if (!window.confirm(`Excluir a região ${r.nome}? Regiões com sensores não podem ser excluídas.`)) return
    setErro(''); setMensagem('')
    try { await excluirRegiao(r.id); setMensagem('Região excluída.'); await carregar() }
    catch (e) { setErro(e instanceof Error ? e.message : 'Erro ao excluir região.') }
  }

  const filtradas = regioes.filter(r => `${r.nome} ${r.cidade}`.toLowerCase().includes(busca.toLowerCase()))

  return <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
    <span className="font-semibold tracking-widest text-[#168DAD]">ÁREAS DE MONITORAMENTO</span>
    <h1 className="mt-3 text-4xl font-extrabold">Regiões monitoradas</h1>
    <p className="mt-4 max-w-3xl text-slate-600">Consulte, cadastre, edite e exclua regiões diretamente na API Java do Pluvia.</p>
    <div className="mt-6 text-xs text-slate-400">Fonte: {API_BASE}/api/regioes</div>

    <form onSubmit={enviar} className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_1fr_auto] md:items-end">
      <label className="block text-sm font-semibold">Nome da região<input required maxLength={100} value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="Ex.: Centro" /></label>
      <label className="block text-sm font-semibold">Cidade<input required maxLength={100} value={form.cidade} onChange={e=>setForm({...form,cidade:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="Ex.: São Paulo" /></label>
      <div className="flex gap-2"><button disabled={salvando} className="rounded-xl bg-[#123A56] px-5 py-3 font-semibold text-white disabled:opacity-60">{salvando ? 'Salvando...' : editando === null ? 'Cadastrar' : 'Salvar edição'}</button>{editando !== null && <button type="button" onClick={()=>{setEditando(null);setForm(vazio)}} className="rounded-xl border border-slate-300 px-4 py-3">Cancelar</button>}</div>
    </form>

    {mensagem && <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-800">{mensagem}</p>}
    {erro && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"><p>{erro}</p><button onClick={()=>void carregar()} className="mt-2 font-bold underline">Tentar novamente</button></div>}

    <div className="mt-10 flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-bold">Registros da API {loading ? '' : `(${regioes.length})`}</h2><input aria-label="Buscar região" value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar bairro ou cidade" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 sm:w-72" /></div>
    {loading ? <p className="mt-6 rounded-xl bg-white p-8 text-slate-600">Carregando regiões...</p> : regioes.length === 0 && !erro ? <p className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-slate-600">Nenhuma região cadastrada. Utilize o formulário acima para adicionar a primeira.</p> : filtradas.length === 0 && !erro ? <p className="mt-6 rounded-xl bg-white p-8">Nenhum resultado para sua busca.</p> : <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtradas.map(r=><article key={r.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><h3 className="text-xl font-bold">{r.nome}</h3><span className={`rounded-full px-3 py-1 text-xs font-bold ${riscoCor[r.nivelRisco] || 'bg-slate-100 text-slate-700'}`}>{r.nivelRisco || 'SEM DADOS'}</span></div><p className="mt-2 text-slate-600">{r.cidade}</p><p className="mt-4 text-xs text-slate-400">ID: {r.id}</p><div className="mt-6 flex gap-3"><button onClick={()=>editar(r)} className="rounded-lg border border-[#168DAD] px-4 py-2 text-sm font-semibold text-[#168DAD] hover:bg-[#E5F4FA]">Editar</button><button onClick={()=>void remover(r)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Excluir</button></div></article>)}</div>}
  </main>
}
