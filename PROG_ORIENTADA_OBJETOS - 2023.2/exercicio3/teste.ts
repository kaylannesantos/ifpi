function imparPar(num: number) :boolean {
    switch (num % 2 ) {
        case 0 :
            return true;    
        default:
            return false;
    }
}

console.log(imparPar(4));