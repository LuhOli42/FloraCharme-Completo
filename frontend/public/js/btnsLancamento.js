const lancamentoInfo = document.querySelector(".lancamentos__container");

const btnCarrinhoLancamentos = document.querySelector(
  ".lancamento__btn-carrinho"
);
const btnFavoritosLancamentos = document.querySelector(".lancamentos__btn-fav");
const btnSaibaMais = document.querySelector(".lancamentos__btn-saiba-mais");
const popFavorito = document.querySelector(".popup__favorito");
const popCarrinho = document.querySelector(".popup__carrinho");

const bearerToke = JSON.parse(localStorage.getItem("token_usuario")) || null;

btnCarrinhoLancamentos.addEventListener("click", () => {
  const idProduto = lancamentoInfo.children[0].innerHTML;
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
      window.location.href = "/erro500";
    }
  }
  addProdutoNoCarrinho();
});

btnFavoritosLancamentos.addEventListener("click", () => {
  const idProduto = lancamentoInfo.children[0].innerHTML;

  async function addProdutoNoCarrinho() {
    try {
      const rawResponse = await fetch(
        `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/favoritos/${idProduto}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToke}`,
          },
        }
      );

      if (rawResponse.status === 201) {
        popFavorito.classList.remove("disable");
      }

      if (rawResponse.status !== 201 && rawResponse.status !== 400) {
        window.location.href = "/erro500";
      }

      if (rawResponse.status === 400) {
        popFavorito.children[0].innerHTML =
          "Produto ja foi adicionado no favorito";
        popFavorito.classList.remove("disable");
      }
    } catch (error) {
      window.location.href = "/erro500";
    }
  }
  addProdutoNoCarrinho();
});

btnSaibaMais.addEventListener("click", () => {
  const lancamentoId = lancamentoInfo.children[0].innerHTML;

  window.location.href = `/produto/${lancamentoId}`;
});
