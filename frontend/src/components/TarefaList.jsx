import React from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import TarefaItem from './TarefaItem'

export default function TarefaList({ tarefas, onMarkDone, onDelete, onReorder }) {
  if (!tarefas || tarefas.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 Nenhuma tarefa por enquanto. Crie uma para começar!</p>
      </div>
    )
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const newOrder = Array.from(tarefas)
    const [moved] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, moved)

    onReorder(newOrder.map(t => t.id))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tarefas">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className="list">
            {tarefas.map((t, index) => (
              <TarefaItem
                key={t.id}
                tarefa={t}
                index={index}
                onMarkDone={onMarkDone}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
