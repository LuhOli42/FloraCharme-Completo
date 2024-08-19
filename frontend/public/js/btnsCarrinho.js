const descricaoProdutos = document.querySelectorAll(".app__produto-descricao");
const popCarrinho = document.querySelector(".popup__carrinho");

const btnsCarrinhosProduto = document.querySelectorAll(
  ".app__produto-carrinho"
);

const bearerToke = JSON.parse(localStorage.getItem("token_usuario")) || null;

for (let i = 0; i < btnsCarrinhosProduto.length; i++) {
  btnsCarrinhosProduto[i].addEventListener("click", () => {
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
        window.location.href = "/erro500";
      }
    }
    addProdutoNoCarrinho();
  });
}
