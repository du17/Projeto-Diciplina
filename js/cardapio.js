document.addEventListener("DOMContentLoaded", function () { 
    const botaoEsvaziar = document.querySelector('#carrinho-esvaziar'); // Botão de esvaziar carrinho
    const botaoFinalizarCompra = document.querySelector('#finalizar-compra'); // Botão de finalizar compra
    const carrinho = {}; // Objeto para armazenar os itens do carrinho

    // Função para atualizar a exibição do carrinho
    function atualizarCarrinho() {
        let carrinhoExibicao = document.querySelector("#carrinho-lista"); 
        carrinhoExibicao.innerHTML = "";

        let total = 0;
        let temItens = false;

        for (const item in carrinho) {
            const quantidade = carrinho[item].quantidade;
            const preco = carrinho[item].preco;
            const subtotal = preco * quantidade;

            total += subtotal;
            temItens = true;

            carrinhoExibicao.innerHTML += `
                <div class="item-carrinho">
                    <span>${item} x ${quantidade} - R$ ${subtotal.toFixed(2)}</span>
                    <button class="btn btn-danger remover-item" data-item="${item}">Remover</button> 
                </div>
            `;
        }

        if (temItens) {
            carrinhoExibicao.innerHTML += `<div id="carrinho-total">Total: R$ ${total.toFixed(2)}</div>`;
            botaoEsvaziar.style.display = "block";
        } else {
            carrinhoExibicao.innerHTML += `<div>Carrinho vazio</div>`;
            botaoEsvaziar.style.display = "none";
        }

        const botoesRemoverCarrinho = document.querySelectorAll('.remover-item');
        botoesRemoverCarrinho.forEach((botao) => {
            botao.addEventListener("click", function() {
                const itemNome = botao.dataset.item;
                removerItem(itemNome);
            });
        });
    }

    // Função para adicionar item ao carrinho
    function adicionarItem(nome, preco) {
        if (!carrinho[nome]) {
            carrinho[nome] = { quantidade: 0, preco: preco };
        }
        carrinho[nome].quantidade++;
        atualizarCarrinho();
    }

    // Função para remover item do carrinho
    function removerItem(nome) {
        if (carrinho[nome] && carrinho[nome].quantidade > 0) {
            carrinho[nome].quantidade--;
            if (carrinho[nome].quantidade === 0) {
                delete carrinho[nome];
            }
        }
        atualizarCarrinho();
    }

    // Função para esvaziar o carrinho
    function esvaziarCarrinho() {
        for (const item in carrinho) {
            delete carrinho[item];
        }
        atualizarCarrinho();
    }

    // Função para verificar se o usuário está logado e aplicar desconto
    function verificarDesconto(total) {
        const usuarioLogado = localStorage.getItem("userEmail");
        const entrouSemCadastro = localStorage.getItem("entrarSemCadastro");

        // Se entrou sem cadastro, não aplica o desconto
        if (entrouSemCadastro === "true") {
            alert("Você entrou sem cadastro, então não há desconto disponível.");
            return total; // Retorna o total sem desconto
        }

        // Se estiver logado, aplica o desconto
        if (usuarioLogado) {
            const desconto = total * 0.1; // Desconto de 10%
            total -= desconto;
            alert(`Desconto de 10% aplicado! Total com desconto: R$ ${total.toFixed(2)}`);
        } else {
            alert("Você precisa estar logado para obter o desconto!");
        }

        return total;
    }

    // Função para gerar ID de comanda baseado no total
    function gerarIdComanda(total) {
        const idComanda = `COMANDA-${Math.floor(Math.random() * 100000)}-${total.toFixed(2).replace('.', '')}`;
        return idComanda;
    }

    // Função de finalizar compra
    function finalizarCompra() {
        let total = 0;

        for (const item in carrinho) {
            total += carrinho[item].preco * carrinho[item].quantidade;
        }

        if (total > 0) {
            total = verificarDesconto(total); // Aplica o desconto se o usuário estiver logado
            const idComanda = gerarIdComanda(total); // Gera um ID único para a comanda

            alert(`Compra finalizada! Seu ID de comanda é: ${idComanda}. Total a pagar: R$ ${total.toFixed(2)}`);
            esvaziarCarrinho(); // Esvazia o carrinho após a compra
        } else {
            alert("Seu carrinho está vazio! Adicione itens antes de finalizar.");
        }
    }

    // Adicionando event listener para o botão de esvaziar o carrinho
    botaoEsvaziar.addEventListener("click", function() {
        esvaziarCarrinho();
    });

    // Adicionando event listener para o botão de finalizar a compra
    botaoFinalizarCompra.addEventListener("click", function() {
        finalizarCompra();
    });

    // Carregando o cardápio a partir do JSON
    fetch('Data/menu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o menu');
            }
            return response.json();
        })
        .then(menu => {
            const entradasContainer = document.querySelector('#entradas');
            const pratosPrincipaisContainer = document.querySelector('#pratos-principais');
            const sobremesasContainer = document.querySelector('#sobremesas');

            menu.itens.forEach(item => {
                const itemCardapio = document.createElement('div');
                itemCardapio.classList.add('item');

                itemCardapio.innerHTML = `
                    <h3 class="card-title">${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <span class="preco">R$ ${item.preco.toFixed(2)}</span>
                    <button class="btn btn-success mais"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg></button>
                    <button class="btn btn-danger menos"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg></</button>
                `;

                if (item.categoria === "Entrada") {
                    entradasContainer.appendChild(itemCardapio);
                } else if (item.categoria === "Prato Principal") {
                    pratosPrincipaisContainer.appendChild(itemCardapio);
                } else if (item.categoria === "Sobremesa") {
                    sobremesasContainer.appendChild(itemCardapio);
                }

                itemCardapio.querySelector('.mais').addEventListener("click", function() {
                    adicionarItem(item.nome, item.preco);
                });

                itemCardapio.querySelector('.menos').addEventListener("click", function() {
                    removerItem(item.nome);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o menu:', error);
        });

    // Inicializando o carrinho
    atualizarCarrinho();
});
