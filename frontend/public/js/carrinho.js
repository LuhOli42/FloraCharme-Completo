const textoCarrinhoVazio = document.querySelector(".carrinho__vazio");
const tabelaCarrinho = document.querySelector(".append__list");
const tabelaAparecer = document.querySelector(".carrinho__formulario");
const valorTotalTexto = document.querySelector(".valor-total");

const bearerToke = JSON.parse(localStorage.getItem("token_usuario")) || null;

async function carrinhoDbRequest() {
  try {
    const rawResponse = await fetch(
      `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/carrinho`,
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
      return response.produtos_id;
    }
  } catch (error) {
    window.location.href = "/erro500";
  }
}
const carrinhoDb = (await carrinhoDbRequest()) || [];
const carrinho = [];
const contadorDeQuantidade = {};
carrinhoDb.forEach((produto) => {
  contadorDeQuantidade[produto._id] =
    (contadorDeQuantidade[produto._id] || 0) + 1;
});

carrinhoDb.forEach((produto) => {
  if (
    carrinho.findIndex((e) => {
      return e._id === produto._id;
    }) === -1
  ) {
    carrinho.push({
      ...produto,
      quantidade: contadorDeQuantidade[produto._id],
    });
  }
});
let valorTotal = 0;

if (carrinho.length > 0) {
  textoCarrinhoVazio.classList.add("disable");
  tabelaAparecer.classList.remove("disable");
  carrinho.forEach((element) => {
    tabelaCarrinho.append(criarElementoCarrinho(element));
  });
}

for (let produto of carrinho) {
  valorTotal += Number(produto.valor) * Number(produto.quantidade);
}

valorTotalTexto.innerHTML = valorTotal.toFixed(2);

function criarElementoCarrinho(elemento) {
  const li = document.createElement("li");
  li.classList.add("carrinho__lista-produtos");

  li.innerHTML = `<h3 class="carrinho__lista-produto-nome">${elemento.nome}</h3>
    <div class="carrinho__lista-produto-quantidade">${elemento.quantidade}</div>
    <div class="carrinho__lista-container">
      <button class="carrinho__lista-delete-btn">
        <img
          src="../assets/images/icons/Lixeira.png"
          alt="Deletar item"
        />
      </button>
      <p class="carrinho__lista-produto-preço">R$ ${elemento.valor.toFixed(
        2
      )}</p>
    </div>`;

  return li;
}

//lixeira botao
const btnLixeira = document.querySelectorAll(".carrinho__lista-delete-btn");

for (let i = 0; i < btnLixeira.length; i++) {
  btnLixeira[i].addEventListener("click", () => {
    async function deletarProdutoDoCarrinho() {
      try {
        const rawResponse = await fetch(
          `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/carrinho/${carrinho[i]._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${bearerToke}`,
            },
          }
        );

        if (rawResponse.status !== 201) {
          window.location.href = "/erro500";
        }

        if (rawResponse.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        window.location.href = "/erro500";
      }
    }
    deletarProdutoDoCarrinho();
  });
}

//Finalizar Compra botao
const btnComprar = document.querySelector(".carrinho__btn-submit");
const popFinalizarCompra = document.querySelector(".popup__finalizado");

btnComprar.addEventListener("click", () => {
  async function finalizarCompra() {
    try {
      const rawResponse = await fetch(
        `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/compras`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToke}`,
          },
        }
      );

      if (rawResponse.status !== 201) {
        window.location.href = "/erro500";
      }

      if (rawResponse.status === 201) {
        popFinalizarCompra.classList.remove("disable");
      }
    } catch (error) {
      window.location.href = "/erro500";
    }
  }
  finalizarCompra();
});
