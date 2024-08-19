const btnLogin = document.querySelector(".login__btn-login");
const paragrafoErro = document.querySelector(".paragrafo__erro");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const form = document.getElementById("login__form");

if (localStorage.getItem("token_usuario") !== null) {
  window.location.href = "/perfil";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const jsonObjeto = JSON.stringify({
    email: inputEmail.value,
    senha: inputSenha.value,
  });

  async function postLogin() {
    try {
      const rawResponse = await fetch(
        `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonObjeto,
        }
      );
      const response = await rawResponse.json();
      if (rawResponse.status === 404) {
        paragrafoErro.classList.remove("disable");
      }

      if (rawResponse.status === 200) {
        localStorage.setItem("token_usuario", JSON.stringify(response.token));
        window.location.href = "/perfil";
      }
    } catch (error) {
      window.location.href = "/erro500";
    }
  }

  postLogin();
});
