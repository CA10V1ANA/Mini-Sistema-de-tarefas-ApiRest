import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

export default function TarefaItem({ tarefa, index, onMarkDone, onDelete }) {

const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    })
}

return (
    <Draggable draggableId={String(tarefa.id)} index={index}>
    {(provided) => (
        <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={tarefa.realizada ? 'done' : ''}
    >
        <div className="titulo-section">
            <span className="numero">{tarefa.id}.</span>
            <span className="titulo">{tarefa.titulo}</span>

            {tarefa.dataCriacao && (
              <div className="data">{formatDate(tarefa.dataCriacao)}</div>
            )}
          </div>

          <div className="actions">
            {!tarefa.realizada && (
              <button
                className="btn-done"
                onClick={() => onMarkDone(tarefa.id)}
              > ✓ Concluir
            </button>
        )}
        <button
            className="btn-delete"
            onClick={() => onDelete(tarefa.id)}
        >
            🗑 Excluir
        </button>
        </div>
    </li>
    )}
</Draggable>
)
}
