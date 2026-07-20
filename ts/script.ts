import { Aluno } from "./aluno.js";

let alunos: Aluno[] = [];

// CAMPOS
let txtId = document.querySelector("#txtId") as HTMLInputElement;
let txtNome = document.querySelector("#txtNome") as HTMLInputElement;
let txtIdade = document.querySelector("#txtIdade") as HTMLInputElement;
let txtCurso = document.querySelector("#txtCurso") as HTMLInputElement;

let txtPesquisar = document.querySelector("#txtPesquisar") as HTMLInputElement;

// BOTÕES
let btnCadastrar = document.querySelector("#btnCadastrar") as HTMLButtonElement;
let btnLimpar = document.querySelector("#btnLimpar") as HTMLButtonElement;
let btnOrdenar = document.querySelector("#btnOrdenar") as HTMLButtonElement;

// TABELA
let tbAlunos = document.querySelector("#tbAlunos") as HTMLTableSectionElement;

// CONTROLE DE EDIÇÃO
let posEditar = -1;

// CARREGA DADOS DO LOCALSTORAGE
let dados = localStorage.getItem("alunos");

if (dados != null) {

    alunos = JSON.parse(dados);

    listarAlunos();

}

// BOTÃO CADASTRAR
btnCadastrar.onclick = function () {

    if (posEditar == -1) {

        cadastrarAluno();

    }
    else {

        salvarEdicao();

    }

}

// BOTÃO LIMPAR
btnLimpar.onclick = function () {

    limparCampos();

}

// BOTÃO ORDENAR
btnOrdenar.onclick = function () {

    alunos.sort(function (a, b) {

        return a.nome.localeCompare(b.nome);

    });

    listarAlunos();

    localStorage.setItem("alunos", JSON.stringify(alunos));

}

// PESQUISA
txtPesquisar.onkeyup = function () {

    pesquisarAluno();

}

// CADASTRAR
function cadastrarAluno() {

    if (
        txtId.value == "" ||
        txtNome.value == "" ||
        txtIdade.value == "" ||
        txtCurso.value == ""
    ) {

        alert("Preencha todos os campos!");

        return;

    }

    if (Number(txtIdade.value) <= 0) {

        alert("Digite uma idade válida!");

        return;

    }

    let existe = alunos.find(function (aluno) {

        return aluno.id == Number(txtId.value);

    });

    if (existe != undefined) {

        alert("Já existe um aluno com esse ID!");

        return;

    }

    let aluno = new Aluno(

        Number(txtId.value),
        txtNome.value,
        Number(txtIdade.value),
        txtCurso.value

    );

    alunos.push(aluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    listarAlunos();

    limparCampos();

}

// LISTAR
function listarAlunos(lista = alunos) {

    tbAlunos.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {

        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.innerHTML = lista[i].id.toString();

        let tdNome = document.createElement("td");
        tdNome.innerHTML = lista[i].nome;

        let tdIdade = document.createElement("td");
        tdIdade.innerHTML = lista[i].idade.toString();

        let tdCurso = document.createElement("td");
        tdCurso.innerHTML = lista[i].curso;

        let tdAcoes = document.createElement("td");

        let btnEditar = document.createElement("button");

        btnEditar.innerHTML = "Editar";

        btnEditar.className = "btnEditar";

        btnEditar.onclick = function () {

            let indice = alunos.indexOf(lista[i]);

            editarAluno(indice);

        }

        let btnExcluir = document.createElement("button");

        btnExcluir.innerHTML = "Excluir";

        btnExcluir.className = "btnExcluir";

        btnExcluir.onclick = function () {

            let indice = alunos.indexOf(lista[i]);

            excluirAluno(indice);

        }

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdIdade);
        tr.appendChild(tdCurso);
        tr.appendChild(tdAcoes);

        tbAlunos.appendChild(tr);

    }

}

// PESQUISAR
function pesquisarAluno() {

    let texto = txtPesquisar.value.toLowerCase();

    let listaFiltrada = alunos.filter(function (aluno) {

        return aluno.nome.toLowerCase().includes(texto);

    });

    listarAlunos(listaFiltrada);

}

// EDITAR
function editarAluno(pos: number) {

    txtId.value = alunos[pos].id.toString();

    txtNome.value = alunos[pos].nome;

    txtIdade.value = alunos[pos].idade.toString();

    txtCurso.value = alunos[pos].curso;

    posEditar = pos;

    btnCadastrar.innerHTML = "Salvar";

}

// SALVAR
function salvarEdicao() {

    if (
        txtId.value == "" ||
        txtNome.value == "" ||
        txtIdade.value == "" ||
        txtCurso.value == ""
    ) {

        alert("Preencha todos os campos!");

        return;

    }

    for (let i = 0; i < alunos.length; i++) {

        if (i != posEditar && alunos[i].id == Number(txtId.value)) {

            alert("Já existe um aluno com esse ID!");

            return;

        }

    }

    alunos[posEditar].id = Number(txtId.value);

    alunos[posEditar].nome = txtNome.value;

    alunos[posEditar].idade = Number(txtIdade.value);

    alunos[posEditar].curso = txtCurso.value;

    localStorage.setItem("alunos", JSON.stringify(alunos));

    listarAlunos();

    limparCampos();

}

// EXCLUIR
function excluirAluno(pos: number) {

    if (confirm("Deseja realmente excluir este aluno?")) {

        alunos.splice(pos, 1);

        localStorage.setItem("alunos", JSON.stringify(alunos));

        listarAlunos();

    }

}

// LIMPAR
function limparCampos() {

    txtId.value = "";

    txtNome.value = "";

    txtIdade.value = "";

    txtCurso.value = "";

    posEditar = -1;

    btnCadastrar.innerHTML = "Cadastrar";

}