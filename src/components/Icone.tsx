import type { ReactNode } from 'react'

type Nome = 'mapa' | 'sensor' | 'escudo' | 'codigo' | 'cerebro' | 'servidor'

const caminhos: Record<Nome, ReactNode> = {
  mapa: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></>,
  sensor: <><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5"/></>,
  escudo: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  codigo: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/></>,
  cerebro: <><path d="M12 18V5a3 3 0 0 0-6 0 4 4 0 0 0-2 7 4 4 0 0 0 2 7 3 3 0 0 0 6-1ZM12 18V5a3 3 0 0 1 6 0 4 4 0 0 1 2 7 4 4 0 0 1-2 7 3 3 0 0 1-6-1Z"/><path d="M8 9a3 3 0 0 0-3 3M16 9a3 3 0 0 1 3 3"/></>,
  servidor: <><rect x="3" y="3" width="18" height="8" rx="2"/><rect x="3" y="13" width="18" height="8" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/></>,
}
export default function Icone({ nome, tamanho = 26 }: { nome: Nome; tamanho?: number }) {
 return <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{caminhos[nome]}</svg>
}
