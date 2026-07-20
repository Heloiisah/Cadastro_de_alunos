import { Aluno } from "./aluno.js";

let alunos: Aluno[] = [];

let txtId = document.querySelector("#txtId") as HTMLInputElement;
let txtNome = document.querySelector("#txtNome") as HTMLInputElement;
let txtIdade = document.querySelector("#txtIdade") as HTMLInputElement;
let txtCurso = document.querySelector("#txtCurso") as HTMLInputElement;

let btnCadastrar = document.querySelector("#btnCadastrar") as HTMLButtonElement;
let btnLimpar = document.querySelector("#btnLimpar") as HTMLButtonElement;

let tbAlunos = document.querySelector("#tbAlunos") as HTMLTableSectionElement;

let posEditar = -1;

btnCadastrar.onclick = function () {

    if (posEditar == -1) {

        cadastrarAluno();

    } else {

        salvarEdicao();

    }

}

btnLimpar.onclick = function () {

    limparCampos();

}

function cadastrarAluno() {

    let aluno = new Aluno(

        Number(txtId.value),
        txtNome.value,
        Number(txtIdade.value),
        txtCurso.value

    );

    alunos.push(aluno);

    listarAlunos();

    limparCampos();

}

function listarAlunos() {

    tbAlunos.innerHTML = "";

    for (let i = 0; i < alunos.length; i++) {

        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.innerHTML = alunos[i].id.toString();

        let tdNome = document.createElement("td");
        tdNome.innerHTML = alunos[i].nome;

        let tdIdade = document.createElement("td");
        tdIdade.innerHTML = alunos[i].idade.toString();

        let tdCurso = document.createElement("td");
        tdCurso.innerHTML = alunos[i].curso;

        let tdAcoes = document.createElement("td");

        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar";
        btnEditar.className = "btnEditar";

        btnEditar.onclick = function () {

            editarAluno(i);

        }

        let btnExcluir = document.createElement("button");
        btnExcluir.innerHTML = "Excluir";
        btnExcluir.className = "btnExcluir";

        btnExcluir.onclick = function () {

            excluirAluno(i);

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

function editarAluno(pos: number) {

    txtId.value = alunos[pos].id.toString();
    txtNome.value = alunos[pos].nome;
    txtIdade.value = alunos[pos].idade.toString();
    txtCurso.value = alunos[pos].curso;

    posEditar = pos;

    btnCadastrar.innerHTML = "Salvar";

}

function salvarEdicao() {

    alunos[posEditar].id = Number(txtId.value);
    alunos[posEditar].nome = txtNome.value;
    alunos[posEditar].idade = Number(txtIdade.value);
    alunos[posEditar].curso = txtCurso.value;

    listarAlunos();

    limparCampos();

}

function excluirAluno(pos: number) {

    alunos.splice(pos, 1);

    listarAlunos();

}

function limparCampos() {

    txtId.value = "";
    txtNome.value = "";
    txtIdade.value = "";
    txtCurso.value = "";

    posEditar = -1;

    btnCadastrar.innerHTML = "Cadastrar";

}