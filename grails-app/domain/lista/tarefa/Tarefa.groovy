package lista.tarefa

class Tarefa {
    String titulo
    Boolean realizada = false
    Date dataCriacao
    static transients = ['binding']

    static constraints = {
        titulo blank: false, nullable: false
        dataCriacao nullable: true
    }

    def beforeInsert() {
        dataCriacao = new Date()
    }

    static mapping = {
        dataCriacao column: 'data_criacao'
    }
}
