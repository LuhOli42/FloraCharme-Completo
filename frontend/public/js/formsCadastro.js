const iniciarBtnCamera = document.querySelector(".cadastro__abrir-camera");
const btnTirarFoto = document.querySelector(".cadastro__tirar-foto");
const campoCamera = document.querySelector(".cadastro__foto");
const video = document.querySelector(".cadastro__camera");
const canvas = document.querySelector(".cadastro__canvas");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const listaRepostas = {
    nome: evento.target.elements["nome"].value,
    email: evento.target.elements["email"].value,
    senha: evento.target.elements["senha"].value,
    telefone: evento.target.elements["telefone"].value,
    cep: evento.target.elements["cep"].value,
    endereco: evento.target.elements["endereco"].value,
    complemento: evento.target.elements["complemento"].value,
    // imagem: imagemUrl,
  };

  try {
    async function cadastro() {
      const rawResponse = await fetch(
        `https://flora-charme-backend-api-4e93afdd6a9a.herokuapp.com/usuario`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listaRepostas),
        }
      );
      const response = await rawResponse.json();

      console.log(rawResponse);

      if (rawResponse.status === 201) {
        window.location.href = "/login";
      }
      if (rawResponse.status !== 201) {
        window.location.href = "/erro500";
      }
    }
    cadastro();
  } catch (error) {
    window.location.href = "/erro500";
  }
});
