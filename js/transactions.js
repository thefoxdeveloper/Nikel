const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};
document.getElementById("button-logout").addEventListener("click", logout);

checkLogged();
getTransactions();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }
  if (!logged) {
    window.location.href = "index.html";
    return;
  }
  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }
  //console.log(data);
}
function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
}
//adicionar lançamento
document
  .getElementById("transaction-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector(
      'input[name="type-input"]:checked'
    ).value;

    data.transactions.unshift({
      value: value,
      type: type,
      description: description,
      date: date,
    });
    saveData(data);
    e.target.reset();
    myModal.hide();
    alert("Lançamento adicionado com sucesso");
    getTransactions();
  });

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item) => {
      let type = "Entrada";
      if (item.type === "2") {
        type = "Saida";
      }

      transactionsHtml += `
                        <tr>
                          <th scope="row">${item.date}</th>
                          <td>R$ ${item.value.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}</td>
                          <td>${type}</td>
                          <td>${item.description}</td>
                          <td><button class="btn btn-danger btn-remove" data-index="${item}">Remover</button></td>
                        </tr>
      `;
    });
  }
  document.getElementById("transactions-list").innerHTML = transactionsHtml;
  const removeButtons = document.getElementsByClassName("btn-remove");
  for (const button of removeButtons) {
    button.addEventListener("click", removeTransaction);
  }
}

function removeTransaction(event) {
  const index = event.target.dataset.index;
  if (index !== undefined) {
    data.transactions.splice(index, 1);
    saveData(data);
    getTransactions();
  }
}
