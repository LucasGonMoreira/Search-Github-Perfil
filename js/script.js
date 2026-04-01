const inputUsername = document.getElementById('input-usuario');
const botao = document.getElementById('pesquisar-btn');
const avatar = document.getElementById('avatar');
const nome = document.getElementById('nome');
const usuario = document.getElementById('usuario');
const biografia = document.getElementById('biografia');
const qtdeRepositorios = document.getElementById('qtdeRepositorios');
const qtdeSeguidores = document.getElementById('qtdeSeguidores');
const qtdeSeguindo = document.getElementById('qtdeSeguindo');
const blog = document.getElementById('blog');
const containerErro = document.getElementById('erro');
const containerCarregando = document.getElementById('carregando');
const containerResultado = document.getElementById('container-resultado');
const containerRepositorios = document.getElementById('container-repositorios');
const listOpcoes = document.getElementById('opcoes');

async function getInformacoesGithub(username) {
  try {
    containerCarregando.classList.remove('oculto');
    containerResultado.classList.add('oculto');
    containerErro.classList.add('oculto');

    const resposta = await fetch(`https://api.github.com/users/${username}`);

    if (!resposta.ok) {
      if (resposta.status === 400) {
        throw new Error("Usuário não encontrado");
      }

      throw new Error("Erro ao buscar usuário");
    }

    const usuario = await resposta.json();
    exibirInformacoesUsuario(usuario);
  } catch(error) {
    console.log(error);
    containerErro.textContent = error.message;
  } finally {
    containerCarregando.classList.add('oculto');
  }
}




async function getRepostoriosGithub(username, listOpcoes) {
  const resposta = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${listOpcoes}`)

  if (!resposta.ok) {
      if (resposta.status === 400) {
        throw new Error("Usuário não encontrado");
      }

      throw new Error("Erro ao buscar usuário");
    }

  const repositorios = await resposta.json();
  exibirRepositorios(repositorios);
}




function exibirRepositorios(repositorios) {
  containerRepositorios.innerHTML = "";
  
  repositorios.forEach(repositorio => {
    const divCard = document.createElement('div');

    const title = document.createElement('h3');
    const desc = document.createElement('p');
    const language = document.createElement('p');

    title.textContent = repositorio.name || "Nome do repositório não encontrado";
    desc.textContent = repositorio.description || "Descrição não encontrada";
    language.textContent = `Linguagem: ${repositorio.language || "Linguagem não encontrada"}`;
    desc.className = "descricao-repositorio";
    language.className = "linguagem-repositorio";


    divCard.appendChild(title);
    divCard.appendChild(desc);
    divCard.appendChild(language);

    containerRepositorios.appendChild(divCard);
  })
}




function exibirInformacoesUsuario(usuario) {
  avatar.src = usuario.avatar_url;
  nome.textContent = usuario.name || "Nome não encontrado";
  usuario.textContent = `@${usuario.login}`;
  usuario.href = usuario.html_url || "#";
  biografia.textContent = usuario.bio || "Bio não encontrada"
  qtdeRepositorios.textContent = usuario.public_repos;
  qtdeSeguidores.textContent = usuario.followers;
  qtdeSeguindo.textContent = usuario.following;
  blog.href = usuario.blog || "#" ;
  blog.textContent = "Ver blog" || "Blog não encontrado";

    containerResultado.classList.remove('oculto');
}





botao.addEventListener('click', () => {
  const termoBusca = inputUsername.value.trim();

  if (termoBusca) {
    getInformacoesGithub(termoBusca);
    getRepostoriosGithub(termoBusca, listOpcoes.value);
  }
})

listOpcoes.addEventListener('change', () => {
  const termoBusca = inputUsername.value.trim();

  if (termoBusca) {
    getRepostoriosGithub(termoBusca, listOpcoes.value);
  }
})