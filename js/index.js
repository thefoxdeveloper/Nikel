const myModal = new bootstrap.Modal("#registerModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();
//Logar conta
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email-login-input").value;
  const password = document.getElementById("pass-login-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccout(email);

  if (!account) {
    alert("Ops! Verifique o usuario ou a senha.");
    return;
  }
  if (account) {
    if (account.password !== password) {
      alert("Ops! Verifique o usuario ou a senha.");
      return;
    }
    saveSession(email, checkSession);
    window.location.href = "home.html";
  }
});

//Criar conta
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("pass-create-input").value;

  if (email.length < 5) {
    alert("Preencha o campo com um e-mail valido");
    return;
  }
  if (password.length < 4) {
    alert("Preencha o campo com um e-mail valido");
    return;
  }
  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });
  myModal.hide();
  alert("Conta criada com sucesso");
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
function getAccout(key) {
  const account = localStorage.getItem(key);
  if (account) {
    return JSON.parse(account);
  }
  return "";
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }
  sessionStorage.setItem("logged", data);
}
function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }
  if (logged) {
    saveSession(logged, session);
    window.location.href = "home.html";
  }
}
