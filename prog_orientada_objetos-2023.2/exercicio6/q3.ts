/*3. Altere as implementações da classe Banco das aulas anteriores para que:
a. O array de contas seja privado;
b. O método consulta por índice seja privado;
c. Os demais métodos sejam públicos. */
import { Conta } from "./q4";

class Banco {
	private contas: Conta[] = []; //array alterado para private

	inserir(conta: Conta): void {
		let contaConsultada = this.consultar(conta.numero);

		if (contaConsultada == null) {
			this.contas.push(conta);
		}
	}

	consultar(numero: String): Conta {
		let contaConsultada!: Conta;
		for (let conta of this.contas) {
			if (conta.numero == numero) {
				contaConsultada = conta;
				break;
			}
		}
		return contaConsultada;
	}

	private consultarPorIndice(numero: String): number { //método alterado para private
		let indice: number = -1;
		for (let i: number = 0; i < this.contas.length; i++) {
			if (this.contas[i].numero == numero) {
				indice = i;
				break;
			}
		}
		return indice;
	}

	alterar(conta: Conta): void {
		let indice: number = this.consultarPorIndice(conta.numero);

		if (indice != -1) {
			this.contas[indice] = conta;
		}
	}

	excluir(numero: string): void {
		let indice: number = this.consultarPorIndice(numero);

		if (indice != -1) {
			for (let i: number = indice; i < this.contas.length; i++) {
				this.contas[i] = this.contas[i + 1];
			}

			this.contas.pop();
		}
	}

	depositar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);

		if (contaConsultada != null) {
			contaConsultada.depositar(valor);
		}
	}

	sacar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);

		if (contaConsultada != null) {
			contaConsultada.sacar(valor);
		}
	}

	transferir(numeroCredito: string, numeroDebito: string, valor: number): void {
		let contaCredito = this.consultar(numeroCredito);
		let contaDebito = this.consultar(numeroDebito);

		if (contaDebito && contaCredito) {
			contaDebito.transferir(contaCredito, valor);
		}
	}

	getTotalDepositado(): number {
		let totalDepositado = 
			this.contas.reduce((totalAcumulado: number, conta: Conta) => {
				return totalAcumulado + conta.obterSaldo();
			}, 0);

		return totalDepositado;
	}

	getTotalContas(): number {
		return this.contas.length;
	}

	getMediaDepositada(): number {
		return this.getTotalDepositado()/this.getTotalContas();
	}

}

let b: Banco = new Banco();

//inserir
b.inserir(new Conta("11111-1", 100));
b.inserir(new Conta("22222-2", 100));
b.inserir(new Conta("33333-3", 100));
//sacar b.sacar("11111-1", 20);
//consultar
console.log(b.consultar("11111-1"));
console.log(b.consultar("22222-2"));
console.log(b.consultar("33333-3"));

export { Banco };