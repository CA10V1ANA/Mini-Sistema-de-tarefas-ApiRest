import React from 'react'

export default function TarefaList({ tarefas, onMarkDone, onDelete }) {
  if (!tarefas || tarefas.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 Nenhuma tarefa por enquanto. Crie uma para começar!</p>
      </div>
    )
  }

  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  return (
    <ul className="list">
      {tarefas.map(t => (
        <li key={t.id} className={t.realizada ? 'done' : ''}>
          <div className="titulo-section">
            <span className="titulo">{t.titulo}</span>
            {t.dataCriacao && <div className="data">{formatDate(t.dataCriacao)}</div>}
          </div>
          <div className="actions">
            {!t.realizada && (
              <button className="btn-done" onClick={() => onMarkDone(t.id)}>
                ✓ Concluir
              </button>
            )}
            <button className="btn-delete" onClick={() => onDelete(t.id)}>
              🗑 Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
