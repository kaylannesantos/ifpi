#include <stdio.h>

int main() {
    int idade = 25;
    float altura = 1.75;

    // Imprimir texto simples
    printf("Olá, Mundo!\n");

    // Imprimir variáveis com especificadores
    printf("Idade: %d anos\n", idade);
    printf("Altura: %.2f metros\n", altura); // .2 limita a 2 casas decimais

    return 0;
}
