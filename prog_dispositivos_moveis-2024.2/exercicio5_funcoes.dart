import 'dart:io';

void main() {
    print('SEJA BEM VINDO AO SISTEMA DE CONVERSÃO DE TEMPERATURA!\nPor favor, digite a opção para qual deseja converter:\n1-Celsius\n2-Fahrenheit');  
    int opcao = int.parse(stdin.readLineSync()!);
  

    switch (opcao) {
      case 1:
        print('Digite o grau que deseja converter:');
        int grau = int.parse(stdin.readLineSync()!);
        converterCelsius(grau);
        break;
      case 2:
        print('Digite o grau que deseja converter:');
        int grau = int.parse(stdin.readLineSync()!);
        converterFahrenheit(grau);
        break;
      default:
        print('Valor inválido. Tente novamente.');
    }
}

void converterCelsius( int grau){
  double result = (grau * 1.8) + 32;
  int newResult = result.truncate(); //pega somente a parte inteira do valor
  print('Em Celsius será: $newResult°');
}

void converterFahrenheit( int grau){
  double result = (grau - 32) / 1.8;
  int newResult = (result.abs()).truncate();//pega somente a parte inteira do valor e converte para positivo
  print('Em Fahrenheit será: $newResult°');
}