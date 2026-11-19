import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { API_BASE, criarLeitura, criarSensor, listarLeituras, listarRegioes, listarSensores, type Leitura, type Regiao, type Sensor } from '../services/api'

export default function Monitoramento() {
 const [regioes,setRegioes]=useState<Regiao[]>([])
 const [sensores,setSensores]=useState<Sensor[]>([])
 const [leituras,setLeituras]=useState<Leitura[]>([])
 const [loading,setLoading]=useState(true)
 const [saving,setSaving]=useState(false)
 const [erro,setErro]=useState('')
 const [mensagem,setMensagem]=useState('')
 const [novoSensor,setNovoSensor]=useState({regiaoId:'',nome:'',tipo:'PLUVIOMETRO',localizacao:'',limiteAlerta:'',status:'ATIVO'})
 const [novaLeitura,setNovaLeitura]=useState({sensorId:'',valor:''})

 const carregar=useCallback(async()=>{
  setLoading(true);setErro('')
  const resultados=await Promise.allSettled([listarRegioes(),listarSensores(),listarLeituras()])
  if(resultados[0].status==='fulfilled')setRegioes(resultados[0].value)
  if(resultados[1].status==='fulfilled')setSensores(resultados[1].value)
  if(resultados[2].status==='fulfilled')setLeituras(resultados[2].value)
  const falhas=resultados.filter(r=>r.status==='rejected')
  if(falhas.length){setErro(`Não foi possível carregar ${falhas.length} consulta(s) da API. Verifique se o backend e o banco estão disponíveis.`)}
  setLoading(false)
 },[])
 useEffect(()=>{void carregar()},[carregar])

 async function salvarSensor(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setSaving(true);setErro('');setMensagem('')
  try{await criarSensor({regiaoId:Number(novoSensor.regiaoId),nome:novoSensor.nome.trim(),tipo:novoSensor.tipo as Sensor['tipo'],localizacao:novoSensor.localizacao.trim(),limiteAlerta:Number(novoSensor.limiteAlerta),status:novoSensor.status as Sensor['status']});setMensagem('Sensor cadastrado na API.');setNovoSensor({regiaoId:'',nome:'',tipo:'PLUVIOMETRO',localizacao:'',limiteAlerta:'',status:'ATIVO'});await carregar()}
  catch(e){setErro(e instanceof Error?e.message:'Falha ao cadastrar sensor.')}
  finally{setSaving(false)}
 }
 async function salvarLeitura(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setSaving(true);setErro('');setMensagem('')
  try{await criarLeitura(Number(novaLeitura.sensorId),Number(novaLeitura.valor));setMensagem('Leitura registrada. O risco da região pode ter sido atualizado.');setNovaLeitura({sensorId:'',valor:''});await carregar()}
  catch(e){setErro(e instanceof Error?e.message:'Falha ao registrar leitura.')}
  finally{setSaving(false)}
 }
 const nomeRegiao=(id:number)=>regioes.find(r=>r.id===id)?.nome||`Região #${id}`
 const nomeSensor=(id:number)=>sensores.find(s=>s.id===id)?.nome||`Sensor #${id}`
 return <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-14">
  <span className="font-semibold tracking-widest text-[#168DAD]">DADOS EM TEMPO DE CONSULTA</span>
  <h1 className="mt-3 text-4xl font-extrabold">Monitoramento</h1>
  <p className="mt-4 max-w-3xl text-slate-600">Consulte sensores e leituras registrados na API Java. Cadastre sensores ou envie novas leituras para atualizar a base de dados.</p>
  <p className="mt-3 text-xs text-slate-400">Fonte: {API_BASE}</p>
  <div className="mt-8 grid gap-5 sm:grid-cols-3">{[{titulo:'Regiões',n:regioes.length},{titulo:'Sensores',n:sensores.length},{titulo:'Leituras',n:leituras.length}].map(item=><div key={item.titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="font-semibold text-slate-500">{item.titulo}</p><p className="mt-2 text-4xl font-extrabold text-[#168DAD]">{loading?'—':item.n}</p></div>)}</div>
  {mensagem&&<p role="status" className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-800">{mensagem}</p>}
  {erro&&<div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"><p>{erro}</p><button onClick={()=>void carregar()} className="mt-2 font-bold underline">Tentar novamente</button></div>}
  <section className="mt-10 grid gap-6 lg:grid-cols-2">
   <form onSubmit={salvarSensor} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><h2 className="text-2xl font-bold">Cadastrar sensor</h2>
    <label className="block text-sm font-semibold">Região<select required value={novoSensor.regiaoId} onChange={e=>setNovoSensor({...novoSensor,regiaoId:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3"><option value="">Selecione uma região</option>{regioes.map(r=><option key={r.id} value={r.id}>{r.nome} — {r.cidade}</option>)}</select></label>
    <label className="block text-sm font-semibold">Nome<input required maxLength={100} value={novoSensor.nome} onChange={e=>setNovoSensor({...novoSensor,nome:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" placeholder="Sensor da ponte" /></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold">Tipo<select value={novoSensor.tipo} onChange={e=>setNovoSensor({...novoSensor,tipo:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3"><option value="PLUVIOMETRO">Pluviômetro</option><option value="NIVEL_RIO">Nível de rio</option></select></label><label className="block text-sm font-semibold">Status<select value={novoSensor.status} onChange={e=>setNovoSensor({...novoSensor,status:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3"><option value="ATIVO">Ativo</option><option value="INATIVO">Inativo</option></select></label></div>
    <label className="block text-sm font-semibold">Localização<input required maxLength={200} value={novoSensor.localizacao} onChange={e=>setNovoSensor({...novoSensor,localizacao:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" placeholder="Ex.: próximo à ponte" /></label>
    <label className="block text-sm font-semibold">Limite de alerta<input required type="number" min="0.01" step="0.01" value={novoSensor.limiteAlerta} onChange={e=>setNovoSensor({...novoSensor,limiteAlerta:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" placeholder="Ex.: 100" /></label>
    <button disabled={saving||loading||regioes.length===0} className="rounded-xl bg-[#123A56] px-6 py-3 font-bold text-white disabled:opacity-50">Cadastrar sensor</button>
   </form>
   <form onSubmit={salvarLeitura} className="self-start space-y-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><h2 className="text-2xl font-bold">Registrar leitura</h2><p className="text-sm leading-6 text-slate-600">Uma nova leitura em um sensor ativo pode atualizar o nível de risco da região.</p>
    <label className="block text-sm font-semibold">Sensor<select required value={novaLeitura.sensorId} onChange={e=>setNovaLeitura({...novaLeitura,sensorId:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3"><option value="">Selecione um sensor ativo</option>{sensores.filter(s=>s.status==='ATIVO').map(s=><option key={s.id} value={s.id}>{s.nome} — {nomeRegiao(s.regiaoId)}</option>)}</select></label>
    <label className="block text-sm font-semibold">Valor<input required type="number" min="0" step="0.01" value={novaLeitura.valor} onChange={e=>setNovaLeitura({...novaLeitura,valor:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" placeholder="Ex.: 56.50" /></label>
    <button disabled={saving||loading||!sensores.some(s=>s.status==='ATIVO')} className="rounded-xl bg-[#168DAD] px-6 py-3 font-bold text-white disabled:opacity-50">Enviar leitura</button>
   </form>
  </section>
  <section className="mt-12"><h2 className="text-2xl font-bold">Sensores cadastrados</h2>{loading?<p className="mt-4">Carregando sensores...</p>:sensores.length===0?<p className="mt-4 rounded-xl bg-white p-6 text-slate-600">Nenhum sensor disponível.</p>:<div className="mt-5 grid gap-4 md:grid-cols-2">{sensores.map(s=><article key={s.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-bold">{s.nome}</h3><span className={`rounded-full px-3 py-1 text-xs font-bold ${s.status==='ATIVO'?'bg-emerald-100 text-emerald-800':'bg-slate-100 text-slate-600'}`}>{s.status}</span></div><p className="mt-2 text-sm text-slate-600">{nomeRegiao(s.regiaoId)} · {s.localizacao}</p><p className="mt-3 text-sm">{s.tipo==='PLUVIOMETRO'?'Pluviômetro':'Nível do rio'} · Limite: {s.limiteAlerta}</p></article>)}</div>}</section>
  <section className="mt-12"><h2 className="text-2xl font-bold">Últimas leituras</h2>{loading?<p className="mt-4">Carregando leituras...</p>:leituras.length===0?<p className="mt-4 rounded-xl bg-white p-6 text-slate-600">Nenhuma leitura cadastrada.</p>:<div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full text-left"><thead className="bg-[#E5F4FA] text-sm"><tr><th className="p-4">ID</th><th className="p-4">Sensor</th><th className="p-4">Valor</th><th className="p-4">Data</th></tr></thead><tbody>{[...leituras].sort((a,b)=>b.id-a.id).slice(0,15).map(l=><tr key={l.id} className="border-t border-slate-100"><td className="p-4">#{l.id}</td><td className="p-4">{nomeSensor(l.sensorId)}</td><td className="p-4">{l.valor}</td><td className="p-4 text-sm text-slate-500">{l.dataLeitura?new Date(l.dataLeitura).toLocaleString('pt-BR'):'—'}</td></tr>)}</tbody></table></div>}</section>
 </main>
}
