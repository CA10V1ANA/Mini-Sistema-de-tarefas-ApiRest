import React, { useState } from 'react'

export default function TarefaForm({ onAdd }) {
  const [titulo, setTitulo] = useState('')
  const [errors, setErrors] = useState(null)
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrors(null)
    const resp = await onAdd(titulo)
    setSaving(false)
    if (resp && resp.length) {
      setErrors(resp)
    } else {
      setTitulo('')
    }
  }

  return (
    <>
      <form className="form" onSubmit={submit}>
        <input 
          value={titulo} 
          onChange={e => setTitulo(e.target.value)} 
          placeholder="Digite uma nova tarefa..."
          disabled={saving}
        />
        <button type="submit" disabled={saving}>
          {saving ? '⏳ Salvando...' : '+ Adicionar'}
        </button>
      </form>
      {errors && (
        <div className="errors">
          {errors.map((err, i) => (
            <div key={i}>
              {err.field ? `${err.field}: ` : ''}{err.message}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
