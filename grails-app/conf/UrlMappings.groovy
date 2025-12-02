class UrlMappings {

    static mappings = {
        // API mappings para frontend React (mapeamento por método HTTP)
        "/api/tarefas"(controller: 'tarefa') {
            action = [GET: 'index', POST: 'save']
        }

        "/api/tarefas/$id"(controller: 'tarefa') {
            action = [GET: 'show', PUT: 'update', DELETE: 'delete']
        }

        "/api/tarefas/$id/markDone"(controller: 'tarefa') {
            action = [POST: 'markDone']
        }

        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
