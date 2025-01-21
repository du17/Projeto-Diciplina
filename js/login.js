document.addEventListener("DOMContentLoaded", function () {
    // Dados de administrador
    const adminUser = {
      username: "admin",
      password: "1234",
    };
  
    // Formulário de login
    const form = document.querySelector("#login-form");
    const entrarSemCadastroButton = document.getElementById("entrarSemCadastro");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const emailOrUsername = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Verificar se é login de administrador
      if (emailOrUsername === adminUser.username && password === adminUser.password) {
        alert("Bem-vindo, Admin!");
        window.location.href = "admin.html"; // Página para administradores
        return;
      }
  
      // Verificar login de usuário normal
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");
  
      if (emailOrUsername === storedEmail && password === storedPassword) {
        alert("Login bem-sucedido!");
        localStorage.removeItem("entrarSemCadastro");
        window.location.href = "cardapio.html";
      } else {
        alert("Email, nome de usuário ou senha inválidos.");
      }
    });
  
    // Entrar sem cadastro
    entrarSemCadastroButton.addEventListener("click", function () {
      alert("Você entrou sem cadastro!");
      localStorage.setItem("entrarSemCadastro", "true");
      window.location.href = "cardapio.html";
    });
  });
  