# InsightTrack – Frontend

Frontend simples em **HTML + JavaScript + Bootstrap + Chart.js** para consumir a API do InsightTrack e exibir:

- Tela de **login**
- Tela de **cadastro de usuário**
- **Dashboard** com:
  - Listagem de campanhas do usuário logado
  - Criação de novas campanhas
  - Cadastro de resultados (alcance, engajamento, cliques, leads)
  - Geração de relatório com **gráfico** (Chart.js)
  - Exclusão de campanhas

---

## 🧱 Tecnologias utilizadas

- **HTML5** + **CSS3**
- **JavaScript** (puro, sem framework)
- **Bootstrap 5** (CDN)
- **Chart.js** (CDN)
- Consumo de API REST via `fetch`

Não é necessário Node/Angular/etc. para rodar o front – é tudo estático.

---

## 📂 Estrutura de pastas

```text
insighttrack-frontend/
 ├── index.html        # Tela de login + cadastro de usuário
 ├── dashboard.html    # Dashboard (campanhas, resultados, gráfico)
 ├── app.js            # Lógica de login e cadastro
 └── dashboard.js      # Lógica do dashboard (campanhas, resultados, gráficos)

⚙️ Pré-requisitos

Backend InsightTrack rodando em:

http://localhost:8080


Endpoints esperados pelo frontend:

Autenticação

POST /api/auth/login

POST /api/auth/registrar

Campanhas

POST /api/campanhas

GET /api/campanhas/usuario/{usuarioId}

DELETE /api/campanhas/{id}

Resultados

POST /api/resultados

GET /api/resultados/relatorio/{campanhaId}

🚀 Como rodar o frontend
Opção 1 – Abrir direto no navegador (mais simples)

Extraia o projeto em uma pasta, por exemplo:

C:\projetos\insighttrack-frontend


Dê duplo clique em index.html

A tela de login será aberta no navegador

Importante: o backend precisa estar rodando em http://localhost:8080.

Opção 2 – Usando um servidor estático (opcional, recomendado)

Se tiver Node instalado, na pasta do projeto:

cd insighttrack-frontend
npx serve .


Depois, acesse no navegador:

http://localhost:3000

🔧 Configuração da API

No topo dos arquivos app.js e dashboard.js existe a constante:

const API = "http://localhost:8080/api";


Se o backend estiver em outra URL ou porta (por exemplo em produção), basta alterar essa constante.

👤 Fluxo de autenticação
Login

Arquivo: app.js, função login().

Endpoint chamado:

POST /api/auth/login


Corpo enviado:

{
  "email": "usuario@teste.com",
  "senha": "123456"
}


Resposta esperada:

{
  "token": "jwt_ou_token_qualquer",
  "usuarioId": 1,
  "nome": "Nome do Usuário"
}


A resposta é salva em localStorage:

token

usuarioId

nomeUsuario (opcional, se vier do backend)

Em seguida o usuário é redirecionado para dashboard.html.

Cadastro de usuário

Na tela de login, botão “Cadastrar novo usuário”:

Endpoint chamado:

POST /api/auth/registrar


Corpo enviado:

{
  "nome": "Novo Usuário",
  "email": "novo@teste.com",
  "senha": "123456"
}


Em caso de sucesso, o frontend exibe:
“Cadastro realizado com sucesso! Faça login.”

Em caso de erro com e-mail duplicado, o backend deve retornar 400 com texto contendo E-mail já cadastrado, que o frontend trata.

📊 Dashboard – funcionalidades

Arquivo principal: dashboard.html
Lógica JS: dashboard.js

1. Listar campanhas do usuário logado

Ao carregar o dashboard, a função listarCampanhas() é chamada.

Endpoint:

GET /api/campanhas/usuario/{usuarioId}


usuarioId é lido do localStorage.

As campanhas aparecem em:

Uma lista (“Minhas Campanhas”) com botões:

Relatório

Excluir

Um <select> usado na área de “Cadastrar Resultado”.

2. Criar nova campanha

No bloco “Minhas Campanhas”, o usuário informa o nome da campanha e clica em Criar.

Endpoint:

POST /api/campanhas


Corpo enviado:

{
  "nome": "Campanha X",
  "usuarioId": 1
}


Após criar, a lista é recarregada.

3. Cadastrar resultado de campanha

Na seção “Cadastrar Resultado”:

Seleciona a campanha

Preenche:

Alcance

Engajamento

Cliques

Leads

Data

Endpoint:

POST /api/resultados


Corpo enviado:

{
  "campanhaId": 1,
  "alcance": 50000,
  "engajamento": 3200,
  "cliques": 1500,
  "leads": 450,
  "data": "2025-11-15"
}


Em caso de sucesso, é exibida a mensagem “Resultado salvo com sucesso!”.

4. Gerar relatório com gráfico

Na lista de campanhas, ao clicar em Relatório:

Endpoint:

GET /api/resultados/relatorio/{campanhaId}


Resposta esperada:

{
  "campanhaId": 1,
  "totalAlcance": 80000,
  "totalEngajamento": 5200,
  "totalCliques": 2300,
  "totalLeads": 650
}


O gráfico é renderizado com o Chart.js em um gráfico de barras, mostrando:

Alcance

Engajamento

Cliques

Leads

5. Excluir campanha

Na lista de campanhas, botão Excluir:

Mostra uma confirmação confirm("Tem certeza...?")

Endpoint:

DELETE /api/campanhas/{id}


Após apagar, a lista é recarregada e, se o gráfico estiver mostrando aquela campanha, é limpo.

👥 Usuários de demonstração (sugeridos)

No backend, foram cadastrados dois usuários iniciais para demonstração:

Administrador

E-mail: admin@insighttrack.com

Senha: 123456

Gestor de Marketing

E-mail: gestor@insighttrack.com

Senha: 123456

Cada um possui suas próprias campanhas e resultados.
Ao logar com cada usuário, o dashboard exibe apenas as campanhas daquele usuário, demonstrando o isolamento de dados por usuário.

🧪 Dicas para testes

Verifique a aba Network do navegador (F12) para acompanhar as requisições (status 200, 400, 401, 500 etc.).

Em caso de problemas de CORS, certifique-se de que o backend está anotado com:

@CrossOrigin("*")


nos controllers de auth, campanhas e resultados.
