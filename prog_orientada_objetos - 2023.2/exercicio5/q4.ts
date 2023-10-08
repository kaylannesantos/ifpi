/*4. Altere também a sua classe Conta dos exercícios anteriores para:
a. Ter atributos privados e métodos “get” para leitura;
b. Verifique se sua implementação da classe Banco e os testes precisarão ser
adaptados para ter métodos de leitura e escrita, visto que os atributos que
agora são privados. */

class Conta {
	private _numero: String; // alterado para private
	private _saldo: number; // alterado para private

	constructor(_numero: String, _saldoInicial: number) {
		this._numero = _numero;
		this._saldo = _saldoInicial;
	}

	get numero(): String {
		return this._numero
	}

	get saldo(): number {
		return this._saldo
	}

	sacar(valor: number): void {
		if (this.saldo >= valor) {
			this._saldo = this.saldo - valor;
		}
	}

	depositar(valor: number): void {
		this._saldo = this.saldo + valor;
	}

	transferir(contaDestino: Conta, valor: number): void {
		this.sacar(valor);
		contaDestino.depositar(valor);
	}

	obterSaldo(): number {
		return this.saldo;
	}

}

export { Conta };