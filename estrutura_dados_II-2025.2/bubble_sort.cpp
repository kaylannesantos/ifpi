#include <iostream>
#include <vector>
using namespace std;

void troca(double &a, double &b) { double t = a; a = b; b = t; }

void bubble_sort(vector<double> &v) {
    int n = (int)v.size();
    for (int pass = 0; pass < n-1; ++pass) {
        bool trocou = false;
        for (int i = 0; i < n-1-pass; ++i) {
            if (v[i] > v[i+1]) {
                troca(v[i], v[i+1]);
                trocou = true;
            }
        }
        if (!trocou) break;
    }
}

int main() {
    vector<double> v = {3.14, 2.71, 0.577, 1.41, 2.0};
    bubble_sort(v);
    for (double x : v) cout << x << " ";
    cout << endl;
    return 0;
}
