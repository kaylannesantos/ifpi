"use strict";
function imparPar(num) {
    switch (num % 2) {
        case 0:
            return true;
        default:
            return false;
    }
}
console.log(imparPar(4));
