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
