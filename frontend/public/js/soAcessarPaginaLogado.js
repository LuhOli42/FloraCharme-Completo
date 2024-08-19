if (!localStorage.getItem("token_usuario")) {
  window.location.href = "/acessoRestrito";
}
