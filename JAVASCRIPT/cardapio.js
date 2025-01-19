//------------- O CPF-----------------------------

document.getElementById("cpfFormFinalizacao").addEventListener("submit", function (e) {
    e.preventDefault();
    const cpf = document.getElementById("cpfFinalizacao").value;

//--------------- Verifica se o CPF está cadastrado ----------------
    if (cpf === "12345678901") {
        alert("Compra finalizada com sucesso! Desconto aplicado.");
        document.getElementById("finalizacao").style.display = "none";
    } else {
        document.getElementById("finalizacaoError").style.display = "block";
    }
});

//----------------- Fechar o carrinho e finalizar compra ----------------------
document.getElementById("finalizarCompra").addEventListener("click", () => {
    document.getElementById("conteudo").style.display = "none";
    document.getElementById("finalizacao").style.display = "block";
});

let cart = [];

//----------------- Atualização do Carrinho ----------------------
const updateCart = () => {
    const cartContainer = document.getElementById("carrinhoItens");
    const resumoContainer = document.getElementById("resumoCarrinho");
    const subtotalElement = document.getElementById("subtotal");
    const descontoElement = document.getElementById("desconto");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        resumoContainer.style.display = "none";
    } else {
        cartContainer.innerHTML = cart
            .map(
                (item) =>
                    `<div>
                        <span>${item.name}</span>
                        <span>${item.quantity} x R$ ${item.price.toFixed(2)}</span>
                    </div>`
            )
            .join("");

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const desconto = subtotal > 100 ? subtotal * 0.1 : 0; // Desconto de 10% para compras acima de R$ 100
        const total = subtotal - desconto;

        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        descontoElement.textContent = `R$ ${desconto.toFixed(2)}`;
        totalElement.textContent = `R$ ${total.toFixed(2)}`;

        resumoContainer.style.display = "block";
    }
};

//------- Adiciona eventos aos botões do carrinho -------------
document.querySelectorAll(".mais").forEach((button) => {
    button.addEventListener("click", (e) => {
        const itemName = e.target.closest(".item").querySelector("h3").textContent;
        const itemPrice = parseFloat(
            e.target.closest(".item").querySelector(".preco").textContent.replace("R$ ", "").replace(",", ".")
        );

        const existingItem = cart.find((item) => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        updateCart();
    });
});

document.querySelectorAll(".menos").forEach((button) => {
    button.addEventListener("click", (e) => {
        const itemName = e.target.closest(".item").querySelector("h3").textContent;

        const existingItem = cart.find((item) => item.name === itemName);
        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            cart = cart.filter((item) => item.name !== itemName);
        }
        updateCart();
    });
});

document.querySelectorAll(".esvaziar").forEach((button) => {
    button.addEventListener("click", (e) => {
        const itemName = e.target.closest(".item").querySelector("h3").textContent;
        cart = cart.filter((item) => item.name !== itemName);
        updateCart();
    });
});

