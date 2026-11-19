export const API_BASE = (import.meta.env.VITE_API_URL || 'https://pluvial-api.onrender.com').replace(/\/$/, '')

export type Regiao = { id: number; nome: string; cidade: string; nivelRisco: string; dataCadastro?: string }
export type Sensor = { id: number; regiaoId: number; nome: string; tipo: 'PLUVIOMETRO' | 'NIVEL_RIO'; localizacao: string; limiteAlerta: number; status: 'ATIVO' | 'INATIVO'; dataInstalacao?: string }
export type Leitura = { id: number; sensorId: number; valor: number; dataLeitura?: string }
export type RegiaoPayload = Pick<Regiao, 'nome' | 'cidade'>
export type SensorPayload = Pick<Sensor, 'regiaoId' | 'nome' | 'tipo' | 'localizacao' | 'limiteAlerta' | 'status'>

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    throw new Error('Não foi possível conectar à API. Confira se o serviço Java está disponível.')
  }
  if (!response.ok) {
    let message = `Erro HTTP ${response.status}`
    try {
      const data = await response.json()
      message = data.mensagem || data.message || data.erro || data.error || message
    } catch { /* resposta sem JSON */ }
    throw new Error(message)
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const listarRegioes = () => request<Regiao[]>('/api/regioes')
export const criarRegiao = (data: RegiaoPayload) => request<Regiao>('/api/regioes', { method: 'POST', body: JSON.stringify(data) })
export const atualizarRegiao = (id: number, data: RegiaoPayload) => request<Regiao>(`/api/regioes/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const excluirRegiao = (id: number) => request<void>(`/api/regioes/${id}`, { method: 'DELETE' })
export const listarSensores = () => request<Sensor[]>('/api/sensores')
export const criarSensor = (data: SensorPayload) => request<Sensor>('/api/sensores', { method: 'POST', body: JSON.stringify(data) })
export const listarLeituras = () => request<Leitura[]>('/api/leituras')
export const criarLeitura = (sensorId: number, valor: number) => request<Leitura>(`/api/sensores/${sensorId}/leituras`, { method: 'POST', body: JSON.stringify({ valor }) })
