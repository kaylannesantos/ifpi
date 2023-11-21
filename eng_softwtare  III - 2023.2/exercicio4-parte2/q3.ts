import * as fs from 'fs';

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
        this.persistencia.salvar(dados,arquivo);

        let dadosFormatados = JSON.stringify({
            dados
        });
        fs.writeFileSync(arquivo.replace('.txt', '_formatado.json'), dadosFormatados);
        console.log(`Salvando no formato desejado: ${dados}`);
    }
}

let persistencia: Persistencia = new Persistencia();
let persistenciaJSON: PersistenciaJSON = new PersistenciaJSON(persistencia);
persistenciaJSON.salvar('{"nome": "John", "idade": 30}', 'dados.txt');