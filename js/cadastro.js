//-----------------------parte do cadastro-----------------
(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach((form) => {
      form.addEventListener('submit', (event) => {
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          } else {
              event.preventDefault();
              cadastrar();
          }
          form.classList.add('was-validated');
      });
  });
})();

function cadastrar() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
      alert("A senha deve ter 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
      return;
  }

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("Cadastro realizado com sucesso!");
  window.location.href = "index.html";
}

// Função para entrar sem cadastro
document.addEventListener("DOMContentLoaded", function () {
  const entrarSemCadastroBtn = document.querySelector('#entrar-sem-cadastro-btn');

  if (entrarSemCadastroBtn) {
      entrarSemCadastroBtn.addEventListener("click", function() {
          // Marca que o usuário entrou sem cadastro
          localStorage.setItem("entrarSemCadastro", "true");
          window.location.href = "cardapio.html"; // Redireciona para a página do cardápio
      });
  }
});
