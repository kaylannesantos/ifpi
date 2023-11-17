/*1. Em um sistema bancário temos as seguintes classes:
public class ContaBancaria {
    private double saldo;
    public ContaBancaria(double saldoInicial) {
        this.saldo = saldoInicial;
    }
    public void depositar(double valor) { saldo += valor; }
    public void sacar(double valor) { saldo -= valor; }
    }
    public class ContaPoupanca extends ContaBancaria {
    public ContaPoupanca(double saldoInicial) {
        super(saldoInicial);
    }

    @Override
    public void sacar(double valor) {
        if (valor > 1000) {
        throw new
        RuntimeException("Não pode sacar mais de 1000 em uma poupança");
    }
    super.sacar(valor);
    }
}
Explique por que motivo a herança entre as classes não é justificada e proponha uma solução.
*/