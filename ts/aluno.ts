import { IAluno } from "./IAluno.js";

export class Aluno implements IAluno {

    id: number;
    nome: string;
    idade: number;
    curso: string;

    constructor(id: number, nome: string, idade: number, curso: string) {

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