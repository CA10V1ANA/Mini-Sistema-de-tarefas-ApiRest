class CorsFilters {
    def filters = {
        all(controller: '*', action: '*') {
            before = {
                // Permitir requisições do frontend em desenvolvimento (localhost:3000) e em produção
                def origin = request.getHeader('Origin')
                def allowedOrigins = ['http://localhost:3000', 'http://localhost:8080']
                
                if (origin in allowedOrigins) {
                    response.setHeader('Access-Control-Allow-Origin', origin)
                }
                response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
                response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
                response.setHeader('Access-Control-Allow-Credentials', 'true')
                response.setHeader('Access-Control-Max-Age', '3600')
                
                if(request.method == 'OPTIONS'){
                    response.status = 200
                    return false
                }
            }

            after = { Map model ->
                // Reaplica os headers no after para cobrir respostas com erro também
                def origin = request.getHeader('Origin')
                def allowedOrigins = ['http://localhost:3000', 'http://localhost:8080']
                
                if (origin in allowedOrigins) {
                    response.setHeader('Access-Control-Allow-Origin', origin)
                }
                response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
                response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
                response.setHeader('Access-Control-Allow-Credentials', 'true')
            }
        }
    }
}
