class Veiculo {
    constructor(public placa: string, public ano: number) {
        this.placa = placa;
        this.ano = ano;
    }
}

class Carro extends Veiculo {
    modelo: string; 

    constructor(placa: string, ano: number, modelo: string) {
        super(placa, ano);
        this.modelo = modelo;
    }
}

class CarroEletrico extends Veiculo {
    modelo: string;
    anatomiaBateria: number;

    constructor(placa: string, ano: number, modelo: string, anatomiaBateria: number) {
        super(placa, ano);
        this.modelo = modelo;
        this.anatomiaBateria = anatomiaBateria;
        
    }
}
