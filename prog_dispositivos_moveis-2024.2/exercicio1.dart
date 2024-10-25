import 'dart:io';

void main() {
    print('Seja bem-vindo ao sistema de eleições 2024.\nPor favor, digite sua idade: ');
    int idade = int.parse(stdin.readLineSync()!);

    print('Analfabeto?(sim/não)');
    String analfabeto = stdin.readLineSync()!;

    if (analfabeto == 'sim') {
      print('Você é analfabeto. Seu voto é facultativo.');
    }else if (idade < 16){
        print('Você é tem $idade anos. Não tem idade para votar.');
    }else if (idade >= 18 && idade < 70){
        print('Você tem $idade anos. Seu voto é obrigatório');
    }else if (idade >= 16 || idade < 18 || idade > 69){
        print('Você tem $idade anos. Seu voto é facultativo.');
    }
    print('Obrigada!');
}
