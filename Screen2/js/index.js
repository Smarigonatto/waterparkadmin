document.getElementById("cadastroForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeAc").value.trim();
    const email = document.getElementById("emailAc").value.trim();
    const senha = document.getElementById("senhaAc").value;
    const senhaConfirmada = document.getElementById("senhaConfirmadaAc").value;
    const statusEl = document.getElementById("statusMensagem");

    statusEl.classList.remove("sucesso", "erro", "alerta", "mostrar");

    if (senha !== senhaConfirmada) {
        statusEl.textContent = "❌ As senhas não coincidem.";
        statusEl.classList.add("erro", "mostrar");
        return;
    }

    const url = "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/registar";
    const dados = { email, senha, senhaConfirmada };

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const texto = await resposta.text();

        if (resposta.ok) {
            statusEl.textContent = "✅ Cadastro realizado com sucesso!";
            statusEl.classList.add("sucesso", "mostrar");

        } else {
            statusEl.textContent = texto || "❌ Erro ao cadastrar. Verifique os dados.";
            statusEl.classList.add("erro", "mostrar");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        statusEl.textContent = "⚠️ Erro de conexão com o servidor.";
        statusEl.classList.add("alerta", "mostrar");
    }
});
