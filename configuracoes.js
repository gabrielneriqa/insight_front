const API = "http://localhost:8080/api";
const token = localStorage.getItem("token");
const usuarioId = localStorage.getItem("usuarioId");

if (!token) window.location.href = "index.html";



// mostrar somente a área clicada
function mostrar(tipo) {


    document.getElementById("box-nome").classList.add("d-none");
    document.getElementById("box-email").classList.add("d-none");
    document.getElementById("box-senha").classList.add("d-none");

    document.getElementById(`box-${tipo}`).classList.remove("d-none");
}

// ---------- Atualizar Nome ----------
async function salvarNome() {
    const novoNome = document.getElementById("novoNome").value;
    await atualizar({ valor: novoNome },"nome");
}



// ---------- Atualizar Email ----------
async function salvarEmail() {
    const inputEmail = document.getElementById('novoEmail');
    const status = document.getElementById('status');
    if (!inputEmail.checkValidity()) {
        status.textContent = "Por favor, insira um endereço de e-mail válido.";
        status.className = "text-danger mt-3 d-block";
        return;
    }
    status.textContent = "Alteração feita com sucesso!";
    status.className = "text-success mt-3 d-block";

    setTimeout(() => {
        // ✨ CORREÇÃO 3: Use a variável 'status' aqui também
        status.textContent = "";
        status.className = "mt-3 d-block";
    }, 2000);

    const novoEmail = inputEmail.value;
    await atualizar({ valor: novoEmail }, "email");
}



// ---------- Atualizar Senha ----------
async function salvarSenha() {

    const nova = document.getElementById("novaSenha", ).value;
    const atual= document.getElementById("senhaAtual").value;

    await atualizar({ senhaAtual: atual,
                            novaSenha: nova}, "senha");
}




// ---------- Função Reutilizada ----------
async function atualizar(body,atributo) {
    const res = await fetch(`${API}/update/${usuarioId}/${atributo}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    });

    const status = document.getElementById("status");

    if (res.ok) {
        status.textContent = "Alteração salva com sucesso!";
        console.log(res.statusText);
        status.className = "text-success mt-3 d-block";
        setTimeout(() => {
            status.textContent = "";
            status.className = "mt-3 d-block"; // Mantém apenas as classes de espaçamento
        }, 2000);
    } else {
        status.textContent = "Erro ao salvar.";
        console.log(res.statusText);
        status.className = "text-danger mt-3 d-block";
    }
}
