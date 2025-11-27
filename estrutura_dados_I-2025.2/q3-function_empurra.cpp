#include <iostream>
using namespace std;

void troca(int &a, int &b) { int t=a; a=b; b=t; }

// empurra maior para a última posição do prefixo de tamanho n
void empurra(int v[], int n) {
    if (n <= 1) return;
    for (int i = 0; i < n-1; ++i) {
        if (v[i] > v[i+1]) troca(v[i], v[i+1]);
    }
}

void bubbleSort_rec(int v[], int n) {
    if (n <= 1) return;
    empurra(v, n);           // agora o maior está em v[n-1]
    bubbleSort_rec(v, n-1); // ordena os n-1 primeiros
}

int main() {
    int v[] = {5,2,9,1,6};
    int n = sizeof(v)/sizeof(v[0]);
    bubbleSort_rec(v,n);
    for (int i=0;i<n;i++) cout<<v[i]<<" ";
    cout<<"\n";
}
