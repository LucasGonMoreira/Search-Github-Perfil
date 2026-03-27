const inputUsername = document.getElementById('input-usuario');
const botao = document.getElementById('pesquisar-btn');

botao.addEventListener('click', () => {
  console.log(inputUsername.value);
})