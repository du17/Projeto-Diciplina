// Script básico para o cardápio

document.addEventListener("DOMContentLoaded", () => {
    console.log("Cardápio carregado com sucesso!");

    // Exemplo: adicionando funcionalidade para destacar itens ao passar o mouse
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
