// Autenticação
// registrarUsuario("user@example.com", "minhaSenha123", "minhaSenha123");

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita o recarregamento da página
    console.log("Submit interceptado com sucesso!");

    const email = document.getElementById("emailAc").value;
    const senha = document.getElementById("senhaAc").value;
    const statusEl = document.getElementById("statusMensagem");

    statusEl.classList.remove("sucesso", "erro", "alerta", "mostrar")

    const url = "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar";

    const dados = { email, senha };


    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const texto = await resposta.text(); // Recebe como texto sempre
        statusEl.classList.remove("sucesso", "erro", "alerta", "mostrar");

        if (resposta.ok) {
            let json;
            try {
                json = JSON.parse(texto);
            } catch (e) {
                console.warn("Resposta não era JSON válido", e);
            }

            if (json?.token) {
                localStorage.setItem("token", json.token);
                statusEl.textContent = "✅ Login realizado com sucesso! Redirecionando...";
                statusEl.classList.add("sucesso", "mostrar");

                setTimeout(() => {
                    window.location.href = "welcome.html";
                }, 2000);
            } else {
                statusEl.textContent = texto || "✔️ Login efetuado.";
                statusEl.classList.add("sucesso", "mostrar");
            }

        } else {
            statusEl.textContent = texto || "❌ Erro no login. Verifique seus dados.";
            statusEl.classList.add("erro", "mostrar");
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        statusEl.textContent = "⚠️ Erro de conexão com o servidor.";
        statusEl.classList.add("alerta", "mostrar");
    }
});
