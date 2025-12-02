import grails.converters.JSON
import lista.tarefa.Tarefa

class TarefaController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", markDone: "POST", index: "GET", show: "GET"]

    def index() {
        def tarefas = Tarefa.list(sort: 'dataCriacao', order: 'desc')
        render tarefas as JSON
    }

    def show(Long id) {
        def t = Tarefa.get(id)
        if(!t) { render(status:404, text: 'Not found'); return }
        render t as JSON
    }

    def save() {
        def json = request.JSON
        def t = new Tarefa(titulo: json?.titulo)
        if(!t.save(flush:true)) {
            response.status = 422
            render([errors: t.errors.allErrors.collect { [field: it?.field, message: message(error: it)] }] as JSON)
            return
        }
        response.status = 201
        render t as JSON
    }

    def update(Long id) {
        def t = Tarefa.get(id)
        if(!t) { render(status:404, text: 'Not found'); return }
        def json = request.JSON
        t.titulo = json?.titulo ?: t.titulo
        if(json?.realizada != null) t.realizada = json.realizada
        if(!t.save(flush:true)) {
            response.status = 422
            render([errors: t.errors.allErrors.collect { [field: it?.field, message: message(error: it)] }] as JSON)
            return
        }
        render t as JSON
    }

    def markDone(Long id) {
        def t = Tarefa.get(id)
        if(!t) { render(status:404, text: 'Not found'); return }
        t.realizada = true
        t.save(flush:true)
        render t as JSON
    }

    def delete(Long id) {
        def t = Tarefa.get(id)
        if(!t) { render(status:404, text: 'Not found'); return }
        t.delete(flush:true)
        render(status:204, text: '')
    }
}
