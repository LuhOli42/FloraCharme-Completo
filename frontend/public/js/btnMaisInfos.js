const btnMaisInfos = document.querySelectorAll(".app__produto-saiba-mais");

const urlImageProdutos = document.querySelectorAll(".app__produto-img");
const descricaoProdutos = document.querySelectorAll(".app__produto-descricao");

for (let i = 0; i < btnMaisInfos.length; i++) {
  btnMaisInfos[i].addEventListener("click", () => {
    const itemId = descricaoProdutos[i].children[0].innerHTML;

    window.location.href = `/produto/${itemId}`;
  });
}
