const textoCarrinhoVazio = document.querySelector(".carrinho__vazio");
const tabelaCarrinho = document.querySelector(".append__list");
const tabelaAparecer = document.querySelector(".carrinho__formulario");
const valorTotalTexto = document.querySelector(".valor-total");

const bearerToke = JSON.parse(localStorage.getItem("token_usuario")) || null;

async function comprasDbRequest() {
  try {
    const rawResponse = await fetch(
      `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/compras`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToke}`,
        },
      }
    );

    const response = await rawResponse.json();

    if (rawResponse.status !== 200) {
      window.location.href = "/erro500";
    }

    if (rawResponse.status === 200) {
      return response;
    }
  } catch (error) {
    window.location.href = "/erro500";
  }
}
const compras = (await comprasDbRequest()) || [];

if (compras.length > 0) {
  textoCarrinhoVazio.classList.add("disable");
  tabelaAparecer.classList.remove("disable");
  compras.forEach((element) => {
    tabelaCarrinho.append(criarElementoCarrinho(element));
  });
}

function criarElementoCarrinho(elemento) {
  const li = document.createElement("li");

  let valorTotal = 0;

  elemento.produtos_id.forEach((produto) => (valorTotal += produto.valor));

  li.classList.add("carrinho__lista-produtos");

  li.innerHTML = `<h3 class="carrinho__lista-produto-nome">${elemento._id}</h3>
    <div class="carrinho__lista-produto-quantidade">${
      elemento.produtos_id.length
    }</div>
    <div class="carrinho__lista-container">
      <button class="carrinho__lista-mais-btn carrinho__lista-delete-btn">
        <img
          src="../assets/images/icons/+.png"
          alt="Ver mais"
        />
      </button>
      <p class="carrinho__lista-produto-preço">R$ ${valorTotal.toFixed(2)}</p>
    </div>`;

  return li;
}

//botao mais
const btnMais = document.querySelectorAll(".carrinho__lista-mais-btn");
const idDaCompra = document.querySelectorAll(".carrinho__lista-produto-nome");

for (let i = 0; i < btnMais.length; i++) {
  btnMais[i].addEventListener("click", () => {
    window.location.href = `/compra/${
      idDaCompra[i].innerHTML
    }?tkn=${localStorage.getItem("token_usuario")}`;
  });
}
