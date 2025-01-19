//-------------------parte do login-------------------
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
          login();
        }
        form.classList.add('was-validated');
      });
    });
  })();
  
  function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
  
    if (email === storedEmail && password === storedPassword) {
      alert("Login bem-sucedido!");
      window.location.href = "cardapio.html";
    } else {
      alert("Email ou senha incorretos.");
    }
  }

//-------------------ADM-------------------
const adminUser = {
  username: "admin",
  password: "1234" // Substituir por um método seguro em produção!
};

document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === adminUser.username && password === adminUser.password) {
    // Login bem-sucedido
    alert("Bem-vindo, Admin!");
    document.querySelector(".admin-section").style.display = "block";
    document.getElementById("login-form").style.display = "none";
  } else {
    // Login falhou
    alert("Usuário ou senha incorretos.");
  }
});