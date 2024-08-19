const textoFavoritoVazio = document.querySelector(".favoritos__vazio");
const favoritoListaProduto = document.querySelector(".produtos__lista");
const favoritosListaDeProdutos = document.querySelector(
  ".produtos__favoritos-main"
);

const bearerToke = JSON.parse(localStorage.getItem("token_usuario")) || null;

async function favoritosDbRequest() {
  try {
    const rawResponse = await fetch(
      `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/favoritos`,
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

const favoritos = (await favoritosDbRequest()) || [];
if (favoritos.length > 0) {
  textoFavoritoVazio.classList.add("disable");
  favoritosListaDeProdutos.classList.remove("disable");
  favoritos.forEach((element) => {
    favoritoListaProduto.append(criarElementoFavorito(element));
  });
}

function criarElementoFavorito(elemento) {
  const li = document.createElement("li");
  li.classList.add("produtos__card");

  li.innerHTML = `
<div class="produtos__card-container app__produto-descricao">
  <p class="produto__id">${elemento._id}</p>
  <h3 class="produto__titulo">${elemento.nome}</h3>
  <p class="produto__descricao">${elemento.descricao}</p>
  <p class="produto__preco">${elemento.valor.toFixed(2)}</p>
  <p class="produto__categoria">${elemento.categoria}</p>
</div>
<div class="produtos__card-container">
  <div class="produtos__imagem-container">
    <img
      src="${elemento.img_url}"
      alt="Creme de mão limons hand's"
      class="app__produto-img"
    />
  </div>
  <ul class="produtos__btns">
    <li>
      <button class="produtos__btn produtos__btn-secundario app__produto-saiba-mais">

          <img src="../assets/images/icons/+.png" alt="Saiba mais"
        />
      </button>
    </li>
    <li>
    <button class="produtos__btn produtos__btn-secundario favoritos__lista-delete-btn">

    <img
      src="../assets/images/icons/Lixeira.png"
      alt="Deletar"

</button>
    </li>
    <li>
      <button class="produtos__btn app__produto-carrinho">
        <img
          src="../assets/images/icons/Carrinho.png"
          alt="Carrinho"
          class="produtos__btn-carrinho"
        />
      </button>
    </li>
  </ul>
</div>
`;

  return li;
}

const btnLixeira = document.querySelectorAll(".favoritos__lista-delete-btn");

for (let i = 0; i < btnLixeira.length; i++) {
  btnLixeira[i].addEventListener("click", () => {
    async function deletarProdutoDosFavorito() {
      try {
        const rawResponse = await fetch(
          `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/favoritos/${favoritos[i]._id}`,
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
    deletarProdutoDosFavorito();
  });
}

const btnsCarrinhosProduto = document.querySelectorAll(
  ".app__produto-carrinho"
);

//Essa parte do codigo tem q ser reduntante n sei pq????
const descricaoProdutos = document.querySelectorAll(".app__produto-descricao");
const popCarrinho = document.querySelector(".popup__carrinho");

for (let i = 0; i < btnsCarrinhosProduto.length; i++) {
  btnsCarrinhosProduto[i].addEventListener("click", () => {
    console.log(descricaoProdutos);
    const idProduto = descricaoProdutos[i].children[0].innerHTML;

    async function addProdutoNoCarrinho() {
      try {
        const rawResponse = await fetch(
          `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/carrinho/${idProduto}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${bearerToke}`,
            },
          }
        );

        if (rawResponse.status === 201) {
          popCarrinho.classList.remove("disable");
        }

        if (rawResponse.status !== 201) {
          window.location.href = "/erro500";
        }
      } catch (error) {
        console.log(error);
        window.location.href = "/erro500";
      }
    }
    addProdutoNoCarrinho();
  });
}

const btnMaisInfos = document.querySelectorAll(".app__produto-saiba-mais");

const urlImageProdutos = document.querySelectorAll(".app__produto-img");

for (let i = 0; i < btnMaisInfos.length; i++) {
  btnMaisInfos[i].addEventListener("click", () => {
    const itemId = descricaoProdutos[i].children[0].innerHTML;

    window.location.href = `/produto/${itemId}`;
  });
}

const btnsFiltros = document.querySelectorAll(".filtros_btn");
const produtosCard = document.querySelectorAll(".produtos__card");

btnsFiltros.forEach((btn) => {
  if (btn.innerHTML === "Todos") {
    btn.addEventListener("click", () => {
      produtosCard.forEach((produto) => {
        produto.classList.remove("disable");
      });
    });
  } else {
    btn.addEventListener("click", () => {
      produtosCard.forEach((produto) => {
        produto.classList.remove("disable");
        if (produto.children[0].children[4].innerHTML !== btn.innerHTML) {
          produto.classList.add("disable");
        }
      });
    });
  }
});
