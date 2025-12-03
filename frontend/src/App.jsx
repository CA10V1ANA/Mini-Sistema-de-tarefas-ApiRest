import React, { useEffect, useState } from 'react'
import TarefaForm from './components/TarefaForm'
import TarefaList from './components/TarefaList'

const API = 'http://localhost:8080/lista-tarefa/api/tarefas'

export default function App() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTarefas = async () => {
    setLoading(true)
    try {
      const res = await fetch(API)
      const data = await res.json()
      setTarefas(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTarefas() }, [])

  const addTarefa = async (titulo) => {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo })
      })
      if (res.status === 201) {
        const t = await res.json()
        setTarefas(prev => [t, ...prev])
        return null
      }
      if (res.status === 422) {
        const { errors } = await res.json()
        return errors
      }
      return [{ message: 'Erro ao criar tarefa' }]
    } catch (e) {
      console.error(e)
      return [{ message: 'Erro de rede' }]
    }
  }

  const markDone = async (id) => {
    await fetch(`${API}/${id}/markDone`, { method: 'POST' })
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, realizada: true } : t))
  }

  const deleteTarefa = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setTarefas(prev => prev.filter(t => t.id !== id))
  }


  const reorderTarefas = async (ids) => {
  try {
    await fetch('http://localhost:8080/lista-tarefa/api/tarefas/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids)
    })

    // Atualiza o estado local IMEDIATAMENTE
    const novaLista = ids.map(id => tarefas.find(t => t.id === id))
    setTarefas(novaLista)

    // Opcional: recarrega do backend para garantir consistência
    // fetchTarefas()

  } catch (error) {
    console.error("Erro ao reordenar:", error)
  }
}

  return (
    <div className="app">
      <div className="app-header">
        <h1>Minhas Tarefas</h1>
        <p>Organize e acompanhe suas atividades</p>
      </div>
      <div className="app-content">
        <TarefaForm onAdd={addTarefa} />
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#667eea' }}>
            <p>Carregando tarefas...</p>
          </div>
        ) : (
          <TarefaList 
            tarefas={tarefas}
            onMarkDone={markDone}
            onDelete={deleteTarefa}
            onReorder={reorderTarefas}
          />
        )}
      </div>
    </div>
  )
}
