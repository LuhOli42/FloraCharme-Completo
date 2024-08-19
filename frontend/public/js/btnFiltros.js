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
