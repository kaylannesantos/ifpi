/*4. Pesquise e exemplifique com um exemplo porque dizemos que a linguagem C,
mesmo tendo tipagem estática, possui tipagem fraca.*/
#include <stdio.h>

int main() {
    int n1 = 5;
    float n2 = 3.14;

    int resultado = n1 + n2;
    
    printf("Resultado: %d\n", resultado);
    
    return 0;
}

