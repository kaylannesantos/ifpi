interface Impressora{
    imprimirDoc();
}

interface Copiadora{
    copiarDoc();
}

interface Grampeador{
    grampearDoc();
}

class ImpressoraSimples implements Impressora{
    imprimirDoc() {
        //implementação
    }
}

class ImpresssoraMultifuncional implements Impressora,Copiadora,Grampeador{
    imprimirDoc() {
        //implementação
    }
    copiarDoc() {
        //implementação
    }
    grampearDoc() {
        //implementação
    }
}