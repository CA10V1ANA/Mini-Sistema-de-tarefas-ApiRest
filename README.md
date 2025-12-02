# Mini Sistema de Tarefas (Grails + React)

Um sistema full-stack simples para gerenciar tarefas com backend REST em Grails e frontend interativo em React + Vite.

## 📋 Funcionalidades

- ✅ Listar tarefas
- ✅ Criar novas tarefas (com validação)
- ✅ Marcar tarefas como realizadas
- ✅ Deletar tarefas
- ✅ Interface responsiva e intuitiva
- ✅ CORS configurado para desenvolvimento seguro

## 🏗️ Arquitetura

### Backend (Grails 2.5.6)
- **Framework**: Grails
- **Banco de Dados**: H2 (embutido, em memória para desenvolvimento)
- **ORM**: GORM/Hibernate
- **API**: REST com JSON

**Estrutura do Domain:**
```groovy
class Tarefa {
    String titulo          // Obrigatório, não vazio
    Boolean realizada      // Padrão: false
    Date dataCriacao       // Preenchido automaticamente
}
```

**Endpoints REST:**
```
GET    /lista-tarefa/api/tarefas              // Listar todas as tarefas
POST   /lista-tarefa/api/tarefas              // Criar nova tarefa
GET    /lista-tarefa/api/tarefas/:id          // Obter tarefa por ID
PUT    /lista-tarefa/api/tarefas/:id          // Atualizar tarefa
DELETE /lista-tarefa/api/tarefas/:id          // Deletar tarefa
POST   /lista-tarefa/api/tarefas/:id/markDone // Marcar como realizada
```

### Frontend (React 18 + Vite)
- **Framework**: React
- **Build Tool**: Vite
- **Dev Server**: Localhost:3000
- **Componentes**: 
  - `App.jsx` - Container principal e lógica da API
  - `TarefaForm.jsx` - Formulário para criar tarefas
  - `TarefaList.jsx` - Lista de tarefas com ações

## 🚀 Quick Start

### Requisitos
- **JDK 8+** (testado com Java 8, 11, 17, 21)
- **Node.js 14+** e npm
- **Git** (opcional, para versionamento)

### 1. Iniciar o Backend (Grails)

Na raiz do projeto (`c:\Users\locem\lista-tarefa`):

```bash
# Limpar build antigo
rmdir /s /q target

# Compilar e iniciar
grailsw.bat clean
grailsw.bat run-app
```

**Saída esperada:**
```
| Server running. Browse to http://localhost:8080/lista-tarefa
| Application running. Type Ctrl-C to shutdown.
```

O Grails estará disponível em: `http://localhost:8080/lista-tarefa`

### 2. Iniciar o Frontend (React)

Em outro terminal, na pasta `frontend`:

```bash
cd c:\Users\locem\lista-tarefa\frontend
npm install
npm run dev -- --port 3000
```

**Saída esperada:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

Abra o navegador em: `http://localhost:3000`

### 3. Testar a Aplicação

No navegador em `http://localhost:3000`:

1. **Listar tarefas**: A página carrega e mostra a lista (vazia inicialmente)
2. **Criar tarefa**: 
   - Preencha o campo "Adicionar nova tarefa"
   - Clique em "Adicionar"
   - A tarefa aparece na lista em tempo real
3. **Marcar como realizada**: Clique no ✓ ao lado da tarefa
4. **Deletar**: Clique no × para remover

## 🔧 Configuração

### CORS (Cross-Origin Resource Sharing)

O sistema usa um filtro CORS seguro que whitelist origens conhecidas:

**Arquivo**: `grails-app/conf/CorsFilters.groovy`

Origens permitidas (padrão):
- `http://localhost:3000` (desenvolvimento frontend)
- `http://localhost:8080` (desenvolvimento backend)

Para **adicionar origem em produção**, edite o arquivo:
```groovy
def allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://seu-dominio.com',  // Adicionar aqui
]
```

### Banco de Dados

**Configuração**: `grails-app/conf/DataSource.groovy`

Por padrão, usa **H2 em memória** (dados perdidos ao reiniciar). Para persistência:

```groovy
production {
    dataSource {
        dbCreate = "update"
        url = "jdbc:h2:/app/lista-tarefa;MODE=MySQL"  // Arquivo no disco
        driverClassName = "org.h2.Driver"
        username = "sa"
        password = ""
    }
}
```

## 📦 Estrutura de Pastas

```
c:\Users\locem\lista-tarefa/
├── grails-app/
│   ├── conf/
│   │   ├── UrlMappings.groovy       # Rotas REST
│   │   ├── CorsFilters.groovy       # Configuração CORS
│   │   └── DataSource.groovy        # DB config
│   ├── controllers/
│   │   └── TarefaController.groovy  # API REST
│   ├── domain/
│   │   └── lista/tarefa/
│   │       └── Tarefa.groovy        # Model
│   └── views/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                  # Container React
│   │   ├── components/
│   │   │   ├── TarefaForm.jsx
│   │   │   └── TarefaList.jsx
│   │   ├── styles.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
├── grailsw.bat                      # Wrapper Grails (Windows)
├── BuildConfig.groovy               # Dependências Grails
└── README.md                        # Este arquivo
```

## 🔍 Testes da API (via curl)

### Listar tarefas
```bash
curl -X GET http://localhost:8080/lista-tarefa/api/tarefas \
  -H "Origin: http://localhost:3000"
```

Resposta (200 OK):
```json
[]
```

### Criar tarefa
```bash
curl -X POST http://localhost:8080/lista-tarefa/api/tarefas \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d "{\"titulo\": \"Fazer compras\"}"
```

Resposta (201 Created):
```json
{
  "id": 1,
  "titulo": "Fazer compras",
  "realizada": false,
  "dataCriacao": "2025-12-02T19:10:00Z"
}
```

### Marcar como realizada
```bash
curl -X POST http://localhost:8080/lista-tarefa/api/tarefas/1/markDone \
  -H "Origin: http://localhost:3000"
```

### Deletar tarefa
```bash
curl -X DELETE http://localhost:8080/lista-tarefa/api/tarefas/1 \
  -H "Origin: http://localhost:3000"
```

## 🐛 Troubleshooting

### Erro: "Connection refused" (porta 8080)
```bash
# Verificar se Grails está rodando
netstat -ano | findstr :8080

# Matar processo se travado (substitua <PID>)
taskkill /PID <PID> /F

# Reiniciar Grails
grailsw.bat clean
grailsw.bat run-app
```

### Erro: 404 na API
- Verifique se está usando `/lista-tarefa/api/tarefas` (com contexto)
- Confirme que Grails está rodando em `http://localhost:8080/lista-tarefa`

### Erro: CORS bloqueando requests
- Verifique se a origem está em `CorsFilters.groovy`
- Teste com `curl.exe -v` para ver os headers CORS

### Erro: "Não é possível conectar-se ao servidor" no frontend
- Certifique-se de que Grails está rodando (`grailsw.bat run-app`)
- Verifique se o frontend está apontando para `http://localhost:8080/lista-tarefa/api/tarefas` (em `App.jsx`)

### Erro: 422 Unprocessable Entity
- Verifique se o campo `titulo` está preenchido
- Validações de erro retornam JSON descritivo

## 📝 Dependências Principais

### Backend (Grails 2.5.6)
- `grails-core`
- `grails-gorm` (ORM)
- `grails-plugin-tomcat-7.0.70` (Servlet container)
- `h2` (Banco de dados em memória)

### Frontend
- `react` 18+
- `vite` 5+
- `react-dom`

## 🚢 Deploy (Produção)

### Compilar WAR
```bash
cd c:\Users\locem\lista-tarefa
grailsw.bat war
```

Gera: `target\lista-tarefa-0.1.war`

### Deploy em Tomcat/JBoss
1. Copie o arquivo `.war` para `$CATALINA_HOME/webapps/`
2. Reinicie o servidor
3. Acesse: `http://seu-servidor:8080/lista-tarefa`

### Deploy em Docker (exemplo)
```dockerfile
FROM tomcat:9
COPY target/lista-tarefa-0.1.war /usr/local/tomcat/webapps/
EXPOSE 8080
CMD ["catalina.sh", "run"]
```

## 📄 Licença

Projeto de exemplo educacional. Use livremente.

---

**Última atualização**: 2 de dezembro de 2025  
**Status**: ✅ Funcionando (backend + frontend integrados, CORS configurado)
