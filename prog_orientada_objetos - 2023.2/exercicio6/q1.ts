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
  }

  class Gerente extends Funcionario {
    cargo: string; 

    constructor(_nome: string, _idade: number, _cpf: string, _valorSalario: number, cargo: string) {
        super(_nome, _idade, _cpf, _valorSalario);
        this.cargo = cargo;
    }

    calcularSalario(): number {
        return this.valorSalario + (this.valorSalario * (15/100));
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
  }

  console.log('\n--------Funcionários----------\n');

  let gerente1: Gerente = new Gerente('Rodrigo', 20, '0000-1', 1500, 'Gerente');
  console.log(`Nome: ${gerente1.nome}, Idade: ${gerente1.idade},\nCpf: ${gerente1.cpf}, Cargo: ${gerente1.cargo},\nSalario: R$ ${gerente1.calcularSalario().toFixed(2)}`);

  console.log('\n');
  
  let supervisor1: Supervisor = new Supervisor('Karol', 19, '0001-1', 1330, 'Supervisor');
  console.log(`Nome: ${supervisor1.nome}, Idade: ${supervisor1.idade},\nCpf: ${supervisor1.cpf}, Cargo: ${supervisor1.cargo},\nSalario: R$ ${supervisor1.calcularSalario().toFixed(2)}`);

  console.log('\n');