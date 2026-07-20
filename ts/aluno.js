"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
class Aluno {
    constructor(id, nome, idade, curso) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
    }
    exibirDados() {
        console.log("ID: " + this.id);
        console.log("Nome: " + this.nome);
        console.log("Idade: " + this.idade);
        console.log("Curso: " + this.curso);
    }
}
exports.Aluno = Aluno;
