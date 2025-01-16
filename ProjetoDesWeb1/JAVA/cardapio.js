// Controle de Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        alert("Bem-vindo, ADMIN!");
        document.getElementById("login").style.display = "none";
        document.getElementById("conteudo").style.display = "block";
    } else if (username === "funcionario" && password === "1234") {
        alert("Bem-vindo, Funcionário!");
        document.getElementById("login").style.display = "none";
        document.getElementById("conteudo").style.display = "block";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

// Estrutura de dados e geração dinâmica do cardápio
const cardapio = [
    { categoria: "entradas", nome: "Salada Caprese", descricao: "Tomates frescos, mussarela de búfala e manjericão.", preco: 25.0 },
    { categoria: "pratos-principais", nome: "Filé ao molho madeira", descricao: "Filé mignon servido com arroz e batatas.", preco: 55.0 },
    { categoria: "sobremesas", nome: "Pudim de Leite", descricao: "Clássico pudim de leite condensado.", preco: 15.0 }
];

document.addEventListener("DOMContentLoaded", () => {
    console.log("Cardápio carregado com sucesso!");

    cardapio.forEach(item => {
        const section = document.getElementById(item.categoria);
        if (section) {
            section.querySelector("ul").innerHTML += `
                <li>
                    <div class="item">
                        <h3>${item.nome}</h3>
                        <p>${item.descricao}</p>
                        <span class="preco">R$ ${item.preco.toFixed(2)}</span>
                    </div>
                </li>`;
        }
    });

    // Adicionando funcionalidade para destacar itens ao passar o mouse
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = "#fff3e0"; // Cor de destaque
        });
        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "white"; // Volta ao normal
        });
    });
});

// Geração de relatório JSON
document.getElementById("baixarRelatorio").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(cardapio, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio-cardapio.json";
    a.click();
    URL.revokeObjectURL(url);
});
