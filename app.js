const API = "http://localhost:8080/api";

function mostrarCadastro() {
    const loginArea = document.getElementById("login-area");
    const cadastroArea = document.getElementById("cadastro-area");
    const loginStatus = document.getElementById("login-status");
    const cadastroStatus = document.getElementById("cadastro-status");

    if (loginArea && cadastroArea) {
        loginArea.style.display = "none";
        cadastroArea.style.display = "block";
    }

    if (loginStatus) loginStatus.innerText = "";
    if (cadastroStatus) {
        cadastroStatus.innerText = "";
        cadastroStatus.classList.remove("text-danger", "text-success");
    }
}

function mostrarLogin() {
    const loginArea = document.getElementById("login-area");
    const cadastroArea = document.getElementById("cadastro-area");
    const cadastroStatus = document.getElementById("cadastro-status");

    if (loginArea && cadastroArea) {
        cadastroArea.style.display = "none";
        loginArea.style.display = "block";
    }

    if (cadastroStatus) {
        cadastroStatus.innerText = "";
        cadastroStatus.classList.remove("text-danger", "text-success");
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const status = document.getElementById("login-status");

    if (status) {
        status.innerText = "";
    }

    if (!email || !senha) {
        if (status) {
            status.innerText = "Preencha e-mail e senha.";
        }
        return;
    }

    try {
        const res = await fetch(API + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!res.ok) {
            if (status) status.innerText = "Credenciais inválidas";
            return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuarioId", data.usuarioId);
        // se o back estiver mandando também nome do usuário:
        if (data.nome) {
            localStorage.setItem("nomeUsuario", data.nome);
        }

        window.location.href = "dashboard.html";
    } catch (e) {
        if (status) status.innerText = "Erro ao conectar com o servidor.";
    }
}

async function cadastrar() {
    const nome = document.getElementById("nomeCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;
    const status = document.getElementById("cadastro-status");

    if (status) {
        status.innerText = "";
        status.classList.remove("text-danger", "text-success");
    }

    if (!nome || !email || !senha) {
        if (status) {
            status.innerText = "Preencha todos os campos.";
            status.classList.add("text-danger");
        }
        return;
    }

    try {
        const res = await fetch(API + "/auth/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        });

        if (!res.ok) {
            const texto = await res.text();
            if (status) {
                status.innerText = texto.includes("E-mail já cadastrado")
                    ? "E-mail já cadastrado."
                    : "Erro ao cadastrar.";
                status.classList.add("text-danger");
            }
            return;
        }

        if (status) {
            status.innerText = "Cadastro realizado com sucesso! Faça login.";
            status.classList.add("text-success");
        }

        document.getElementById("email").value = email;
        document.getElementById("senha").value = "";

    } catch (e) {
        if (status) {
            status.innerText = "Erro ao conectar com o servidor.";
            status.classList.add("text-danger");
        }
    }
}
