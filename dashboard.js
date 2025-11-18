const API = "http://localhost:8080/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

let grafico = null; // manter referência do gráfico para atualizar depois

async function criarCampanha() {
    const nome = document.getElementById("nomeCampanha").value;
    const usuarioId = localStorage.getItem("usuarioId");

    if (!nome) return;

    await fetch(API + "/campanhas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ nome, usuarioId })
    });

    document.getElementById("nomeCampanha").value = "";
    listarCampanhas();
}

async function listarCampanhas() {
    const usuarioId = localStorage.getItem("usuarioId");
    const res = await fetch(API + "/campanhas/usuario/" + usuarioId, {
        headers: { "Authorization": "Bearer " + token }
    });

    const campanhas = await res.json();

    const lista = document.getElementById("listaCampanhas");
    lista.innerHTML = "";

    const select = document.getElementById("campanhaSelect");
    select.innerHTML = '<option value="">Selecione uma campanha</option>';

    campanhas.forEach(c => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
      <span>${c.nome}</span>
      <div>
        <button class="btn btn-sm btn-outline-primary me-2" onclick="gerarRelatorio(${c.id})">
          Relatório
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deletarCampanha(${c.id})">
          Excluir
        </button>
      </div>
    `;

        lista.appendChild(li);

        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.nome;
        select.appendChild(opt);
    });
}


async function salvarResultado() {
    const campanhaId = document.getElementById("campanhaSelect").value;
    const alcance = document.getElementById("alcance").value;
    const engajamento = document.getElementById("engajamento").value;
    const cliques = document.getElementById("cliques").value;
    const leads = document.getElementById("leads").value;
    const data = document.getElementById("dataResultado").value;
    const statusSpan = document.getElementById("resultadoStatus");

    if (!campanhaId || !alcance || !engajamento || !cliques || !leads || !data) {
        statusSpan.textContent = "Preencha todos os campos.";
        statusSpan.classList.remove("text-success");
        statusSpan.classList.add("text-danger");
        return;
    }

    const body = {
        campanhaId: parseInt(campanhaId),
        alcance: parseInt(alcance),
        engajamento: parseInt(engajamento),
        cliques: parseInt(cliques),
        leads: parseInt(leads),
        data: data
    };

    const res = await fetch(API + "/resultados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        statusSpan.textContent = "Resultado salvo com sucesso!";
        statusSpan.classList.remove("text-danger");
        statusSpan.classList.add("text-success");

        // limpa campos
        document.getElementById("alcance").value = "";
        document.getElementById("engajamento").value = "";
        document.getElementById("cliques").value = "";
        document.getElementById("leads").value = "";
        document.getElementById("dataResultado").value = "";

    } else {
        statusSpan.textContent = "Erro ao salvar resultado.";
        statusSpan.classList.remove("text-success");
        statusSpan.classList.add("text-danger");
    }
}

async function gerarRelatorio(id) {
    const res = await fetch(API + "/resultados/relatorio/" + id, {
        headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();

    const ctx = document.getElementById("grafico");

    // se já existir gráfico, destrói antes de criar outro
    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Alcance", "Engajamento", "Cliques", "Leads"],
            datasets: [{
                label: "Resultado",
                data: [
                    data.totalAlcance,
                    data.totalEngajamento,
                    data.totalCliques,
                    data.totalLeads
                ]
            }]
        }
    });
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
async function deletarCampanha(id) {
    const confirma = confirm("Tem certeza que deseja excluir esta campanha? Isso também apagará os resultados dela.");
    if (!confirma) return;

    await fetch(API + "/campanhas/" + id, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });

    if (grafico) {
        grafico.destroy();
        grafico = null;
    }

    listarCampanhas();
}


// carrega campanhas ao abrir o dashboard
listarCampanhas();
