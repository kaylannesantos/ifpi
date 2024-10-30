import * as fs from 'fs';

class InvalidArgumentError extends Error{
    constructor(message: string) {
        super(message);
    }
}

class Persistencia{
    salvar(dados: string, arquivo: string):void{
        fs.writeFileSync(arquivo,dados);
    }
}

class PersistenciaJSON{
    private _persistencia: Persistencia;
    constructor(persistencia: Persistencia) {
        this._persistencia = persistencia;
    }

    get persistencia():Persistencia{ return this._persistencia};

    salvar(dados:string, arquivo:string):void{
        if (!dados.startsWith("{")) {
            throw new InvalidArgumentError("Os dados não estão no formato JSON.");
        }
        this.persistencia.salvar(dados,arquivo);

        let dadosJson = JSON.stringify({dados});
        

        fs.writeFileSync(arquivo.replace('.txt', '.json'), dadosJson);
        console.log(`Salvando no formato desejado: ${dados}`);
    }
}

let persistencia: Persistencia = new Persistencia();
let persistenciaJSON: PersistenciaJSON = new PersistenciaJSON(persistencia);
persistenciaJSON.salvar('{"nome": "John", "idade": 30}', 'dados.txt');
persistenciaJSON.salvar('{"nome": "Maria", "idade": 12}', 'dados.txt');