const popup = document.querySelectorAll(".popup");
const btnVoltar = document.querySelectorAll(".popup__btn-voltar ");

btnVoltar.forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.forEach((item) => {
      item.classList.add("disable");
    });
  });
});
