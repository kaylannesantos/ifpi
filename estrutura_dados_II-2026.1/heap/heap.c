#include <stdio.h>
#include <stdlib.h>

#define MAX 100

// Estrutura do heap
typedef struct {
    int vet[MAX];
    int tamanho;
} Heap;

// Função para trocar valores
void troca(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

//HEAPIFY
void heapify(Heap *h, int i) {
    int maior = i;
    int esq = 2 * i + 1;
    int dir = 2 * i + 2;

    if (esq < h->tamanho && h->vet[esq] > h->vet[maior])
        maior = esq;

    if (dir < h->tamanho && h->vet[dir] > h->vet[maior])
        maior = dir;

    if (maior != i) {
        troca(&h->vet[i], &h->vet[maior]);
        heapify(h, maior); // continua descendo
    }
}

// BUILD HEAP
void buildHeap(Heap *h) {
    for (int i = h->tamanho / 2 - 1; i >= 0; i--) {
        heapify(h, i);
    }
}

//INSERÇÃO
void inserir(Heap *h, int valor) {
    if (h->tamanho == MAX) {
        printf("Heap cheio!\n");
        return;
    }

    int i = h->tamanho;
    h->vet[i] = valor;
    h->tamanho++;

    // sobe o elemento (heapify up)
    while (i != 0 && h->vet[(i - 1) / 2] < h->vet[i]) {
        troca(&h->vet[i], &h->vet[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

//REMOÇÃO (MAX)
int remover(Heap *h) {
    if (h->tamanho <= 0) {
        printf("Heap vazio!\n");
        return -1;
    }

    if (h->tamanho == 1) {
        h->tamanho--;
        return h->vet[0];
    }

    int raiz = h->vet[0];
    h->vet[0] = h->vet[h->tamanho - 1];
    h->tamanho--;

    heapify(h, 0);

    return raiz;
}

// ================= Função para imprimir o heap =================
void printHeap(Heap *h) {
    for (int i = 0; i < h->tamanho; i++) {
        printf("%d ", h->vet[i]);
    }
    printf("\n");
}

//
int main() {
    Heap h;
    h.tamanho = 0;

    /*// Inserindo valores    
    inserir(&h, 16);
    inserir(&h, 4);
    inserir(&h, 10);
    inserir(&h, 8);
    inserir(&h, 7);
    inserir(&h, 9);
    inserir(&h, 3);
    inserir(&h, 2);
    inserir(&h, 14);
    inserir(&h, 1);*/

    inserir(&h, 88);
    inserir(&h, 87);
    inserir(&h, 73);
    inserir(&h, 47);
    inserir(&h, 54);
    inserir(&h, 6);
    inserir(&h, 0);
    inserir(&h, 43);
    inserir(&h, 100);

    printf("Heap apos insercoes:\n");
    printHeap(&h);
    printf("\n");
    // Removendo elemento (raiz)
    int removido = remover(&h);
    printf("Elemento removido: %d\n", removido);
    printf("\n");
    printf("Heap apos remocao:\n");
    printHeap(&h);

    // Testando buildHeap com vetor desordenado
    Heap h2 = {.vet = {3, 5, 1, 10, 2, 7}, .tamanho = 6};

    printf("\nAntes do buildHeap:\n");
    printHeap(&h2);

    buildHeap(&h2);
    printf("\n");
    printf("Depois do buildHeap:\n");
    printHeap(&h2);

    return 0;
}