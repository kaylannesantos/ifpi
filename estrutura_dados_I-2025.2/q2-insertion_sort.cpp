#include <stdio.h>
#include <string.h>

#define MAX_STR 100
#define MAX_N  100

void insertion_sort_strings(char v[][MAX_STR], int n) {
    char aux[MAX_STR];
    for (int i = 1; i < n; ++i) {
        // copia v[i] para aux
        strcpy(aux, v[i]);
        int j = i - 1;
        // desloca enquanto v[j] > aux (lexicograficamente)
        while (j >= 0 && strcmp(v[j], aux) > 0) {
            strcpy(v[j+1], v[j]);
            j--;
        }
        strcpy(v[j+1], aux);
    }
}

int main() {
    char v[5][MAX_STR] = {"banana", "abacaxi", "uva", "laranja", "maca"};
    insertion_sort_strings(v, 5);
    for (int i = 0; i < 5; ++i) puts(v[i]);
    return 0;
}
