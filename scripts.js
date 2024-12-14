const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();

})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name});
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }
        leitor.readAsDataURL(arquivo);
    })
}
const imagemPrincipal = document.querySelector(".imagem_editor");
const nomeDaImagem = document.querySelector(".container__imagem_texto");
// Quando acontecer uma mudança dentro do nosso input de imagem vai acontecer uma funcionalidade que vai ser a leitura do arquivo
inputUpload.addEventListener("change", async (evento) => {
     const arquivo = evento.target.files[0]; //pega o evento do envio entra dentro do evento e pega o arquivo que esta sendo enviado

     if(arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url; //substituir a imagem principal pela imagem que o usuario selecionar
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo:", erro)
        }
     }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");
//quando a pessoa digitar o enter, o texto dentro do input vai ser add como tag

listaTags.addEventListener("click", (evento) => {
    if(evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

const tagsDisponiveis = ["Front-end", "Back-end", "Fullstack", "Mobile", "DevOps", "Gestão", "Marketing", "UI/UX", "Data Science", "JavaScript", "HTML", "Programação"];

async function verificarTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
           resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    })
}
inputTags.addEventListener("keypress", async (evento) => {
    if(evento.key === "Enter") {
        evento.preventDefault(); //previne o comportamento padrão do input
        const tagTexto = inputTags.value.trim(); //pega o valor do input e remove os espaços
        if(tagTexto !== "") {
            try {
                const tagExiste = await verificarTagsDisponiveis(tagTexto);
                if(tagExiste){
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src ="./assests/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = ""; //limpa o input
                } else {
                    alert("A tag não foi encontrada");
                }
            } catch(error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console");
                }
        } 
    }
})

//simulação de um envio pra banco de dados
async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto,tagsProjeto) {
    return new Promise ((resolve, reject) => {   
        setTimeout(() => {
           const deuCerto = Math.random() > 0.5; //simula se deu certo ou não
           
           if (deuCerto) {
                resolve("Projeto publicado com sucesso")
           }else {
                reject("Erro ao publicar o projeto")
           }
        }, 2000);
    })
}

// para ter acesso a todas informações do formulario

const botaoPublicar = document.querySelector(".botao__publicar");
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();
    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
//lista de tags
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent); // map é para percorrer a lista e pegar só o elemento textual e não a tag inteira, paragrafo

//console.log(nomeDoProjeto); p ver se ta funcionando a função no botao publicar
//console.log(descricaoDoProjeto)
//console.log(tagsProjeto)

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo")
    } catch(error) {
        console.log("Deu errado")
    }
})

const botaoDescartar = document.querySelector(".botao__descartar")

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const confirmação = confirm("Tem certeza que deseja descartar o projeto?");
    if (confirmação) {
        const formulario = document.querySelector("form");
        formulario.reset();
        imagemPrincipal.src = "./assests/imagem1.png";
        nomeDaImagem.textContent = "image_projeto.png";
        listaTags.innerHTML = "";
    } else {
        alert("Projeto não descartado")
    }

})