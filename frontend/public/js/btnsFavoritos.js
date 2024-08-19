const descricaoProdutos = document.querySelectorAll(".app__produto-descricao");
const urlImageProdutos = document.querySelectorAll(".app__produto-img");
const btnsFavoritosProduto = document.querySelectorAll(
  ".app__produto-favorito"
);
const popFavorito = document.querySelector(".popup__favorito");

const bearerToke = JSON.parse(localStorage.getItem("token_usuario")) || null;

for (let i = 0; i < btnsFavoritosProduto.length; i++) {
  btnsFavoritosProduto[i].addEventListener("click", () => {
    const idProduto = descricaoProdutos[i].children[0].innerHTML;

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
}
