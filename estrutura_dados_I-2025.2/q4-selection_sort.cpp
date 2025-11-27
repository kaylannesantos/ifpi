#include <iostream>
using namespace std;

int seleciona(int v[], int n) { // índice do máximo em v[0..n-1]
    int idx = 0;
    for (int i=1;i<n;i++)
        if (v[i] > v[idx]) idx = i;
    return idx;
}

void selectionSort_rec(int v[], int n) {
    if (n <= 1) return;
    int k = seleciona(v,n);
    // coloca o máximo em v[n-1]
    int tmp = v[k]; v[k] = v[n-1]; v[n-1] = tmp;
    selectionSort_rec(v, n-1);
}

int main() {
    int v[] = {29,10,14,37,13};
    int n = sizeof(v)/sizeof(v[0]);
    selectionSort_rec(v,n);
    for (int i=0;i<n;i++) cout<<v[i]<<" ";
    cout<<"\n";
}
