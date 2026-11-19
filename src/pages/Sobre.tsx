export default function Sobre() {
 const cards = [
  {titulo: 'Monitoramento', descricao: 'Cadastro e consulta de regiões, sensores e suas leituras.'},
  {titulo: 'Prevenção', descricao: 'Classificação de risco conforme os limites definidos para os sensores.'},
  {titulo: 'Inteligência', descricao: 'Modelos de aprendizado de máquina desenvolvidos como parte da solução acadêmica.'},
 ]
 return <main className="mx-auto w-full max-w-6xl px-6 py-16"><span className="font-semibold text-[#269DBB]">SOBRE O PROJETO</span><h1 className="mt-3 text-4xl font-bold">Tecnologia a serviço da prevenção.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">O Pluvia é uma solução acadêmica da FIAP Global Solution 2026, dedicada ao acompanhamento de condições que podem indicar riscos de alagamento.</p><section className="mt-12 grid gap-6 md:grid-cols-3">{cards.map(c=><article key={c.titulo} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-4 h-2 w-12 rounded-full bg-[#55BEDD]"/><h2 className="text-xl font-bold">{c.titulo}</h2><p className="mt-3 leading-7 text-slate-600">{c.descricao}</p></article>)}</section><section className="mt-14 rounded-2xl bg-[#123A56] p-8 text-white"><h2 className="text-2xl font-bold">Nosso objetivo</h2><p className="mt-4 max-w-3xl leading-8 text-slate-200">Transformar dados de monitoramento em informações acessíveis, contribuindo para o entendimento de situações de risco. O Pluvia não substitui os alertas da Defesa Civil.</p></section>
 
<section className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
  <span className="text-sm font-semibold tracking-widest text-[#168DAD]">
    NOSSA SOLUÇÃO
  </span>

  <h2 className="mt-3 text-2xl font-bold text-[#123A56]">
    Como o Pluvia funciona?
  </h2>

  <p className="mt-5 leading-8 text-slate-600">
    O Pluvia reúne informações de regiões monitoradas,
    sensores e leituras hidrológicas para apoiar o
    acompanhamento de condições relacionadas a alagamentos.
  </p>

  <p className="mt-4 leading-8 text-slate-600">
    A interface desenvolvida com React permite consultar
    e gerenciar registros por meio de uma API REST em Java,
    responsável pelas validações e regras de classificação
    de risco, com persistência de dados em Oracle.
  </p>

  <p className="mt-4 leading-8 text-slate-600">
    O projeto também contempla modelos de inteligência
    artificial voltados à previsão hidrológica e um módulo
    administrativo em Python para cadastro, moderação
    e análise de relatos de alagamentos.
  </p>

  <p className="mt-4 font-medium leading-8 text-[#123A56]">
    Nosso objetivo é demonstrar como diferentes tecnologias
    podem contribuir para o monitoramento e a prevenção
    de riscos relacionados às enchentes.
  </p>
</section>

 </main>
}
