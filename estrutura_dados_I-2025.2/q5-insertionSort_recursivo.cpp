#include <iostream>
using namespace std;

void insere(int v[], int n) {
    if (n <= 1) return;
    int chave = v[n-1];
    int j = n - 2;
    while (j >= 0 && v[j] > chave) {
        v[j+1] = v[j];
        j--;
    }
    v[j+1] = chave;
}

void insertionSort_rec(int v[], int n) {
    if (n <= 1) return;
    insertionSort_rec(v, n-1); // ordena primeiro n-1 elementos
    insere(v, n);              // insere o último no lugar correto
}

int main() {
    int v[] = {5,3,8,1,2};
    int n = sizeof(v)/sizeof(v[0]);
    insertionSort_rec(v,n);
    for (int i=0;i<n;i++) cout<<v[i]<<" ";
    cout<<"\n";
}
