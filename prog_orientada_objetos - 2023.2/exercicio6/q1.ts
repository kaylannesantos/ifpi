 import PromptSync from "prompt-sync";
 const input = PromptSync();
 
 class Funcionario {
    constructor(private _nome: string, private _idade: number, private _cpf: string, private _valorSalario: number) {
      this._nome = _nome;
      this._idade = _idade;
      this._cpf = _cpf;
      this._valorSalario = _valorSalario;
    }

    get nome(): string {
        return this._nome;
    }

    get idade(): number {
        return this._idade;
    }

    get cpf(): string {
        return this._cpf;
    }

    get valorSalario(): number {
        return this._valorSalario;
    }

    calcularSalario(): number {
        return this.valorSalario
    }

    toString(): string {
        return '';
    }
  }

  class Gerente extends Funcionario {
    cargo: string; 

    constructor(_nome: string, _idade: number, _cpf: string, _valorSalario: number, cargo: string) {
        super(_nome, _idade, _cpf, _valorSalario);
        this.cargo = cargo;
    }

    calcularSalario(): number { //polimorfismo - sobrescrita
        let abonoSalarial: number = parseFloat(input("Digite o valor do abono salarial: "));
        return abonoSalarial + (this.valorSalario + (this.valorSalario * (15/100)));
    }

    toString(): string {
        return 'Nome: ' + this.nome + ', ' + 'Idade: ' + this.idade + ', ' + 'Cpf: ' + this.cpf + ', ' + 'Cargo: ' + this.cargo + ', ' + 'Salario: ' + this.valorSalario;
    }
  }

  class Supervisor extends Funcionario {
    cargo: string;

    constructor(_nome: string, _idade: number, _cpf: string, _valorSalario: number, cargo: string) {
        super(_nome, _idade, _cpf, _valorSalario);
        this.cargo = cargo;
    }

    calcularSalario(): number {
        return this.valorSalario + (this.valorSalario * (6/100));
    }

    toString(): string {
        return 'Nome: ' + this.nome + ', ' + 'Idade: ' + this.idade + ', ' + 'Cpf: ' + this.cpf + ', ' + 'Cargo: ' + this.cargo + ', ' + 'Salario: ' + this.valorSalario;
    }
  }

  console.log('\n--------Funcionários----------\n');

  let g1: Gerente = new Gerente('Rodrigo', 20, '0000-1', 1500, 'Gerente');
  let g2: Gerente = new Gerente('Mari', 25, '0000-2', 1350, 'Gerente'); 

  console.log(g1.toString());
  console.log(g2.toString());
  

  console.log('------------------------------------');
  
  let s1: Supervisor = new Supervisor('Karol', 19, '0001-1', 1330, 'Supervisor');
  let s2: Supervisor = new Supervisor('Junior', 21, '0002-2', 1300, 'Supervisor');

console.log(s1.toString());
console.log(s2.toString());
