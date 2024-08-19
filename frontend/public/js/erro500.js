const btnRelogar = document.querySelector(".erro500__btn-relogar");

btnRelogar.addEventListener("click", () => {
  console.log("oi");
  localStorage.removeItem("token_usuario");
  window.location.href = "/login";
});
