import 'package:flutter/material.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> {
  String result = '';
  final TextEditingController _gasolinaController = TextEditingController();
  final TextEditingController _alcoolController = TextEditingController();

  void calcularGasolina() {
    String mensagem = '';
    double valorGasolina = double.tryParse(_gasolinaController.text) ?? 0.0;
    double valorAlcool = double.tryParse(_alcoolController.text) ?? 0.0;

    double resultado = valorAlcool / valorGasolina * 100;

    if (resultado >= 70) {
      mensagem = 'Abasteça com Alcool';
    }else{
      mensagem = 'Abasteça com Gasolina';
    }

    // Atualiza o estado para que a interface seja reconstruída
    setState(() {
      result = mensagem;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),

      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            const Text(
              'Gasolina x Alcool',
              style: TextStyle(fontSize: 24),
            ),

            const SizedBox(height: 20),

            // Primeiro ícone com círculo
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 200, // Tamanho do círculo
                  height: 200, // Tamanho do círculo
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.green, // Cor do círculo
                  ),
                  child: const Icon(
                    Icons.local_gas_station_outlined,
                    size: 150,
                    color: Colors.white, // Cor do ícone
                  ),
                ),
              ],
            ),
            const SizedBox(height: 15),

            // Linha com três ícones, cada um com seu círculo
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 70,
                  height: 70,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.orange,
                  ),
                  child: const Icon(
                    Icons.local_gas_station_outlined,
                    size: 50,
                    color: Colors.white,
                  ),
                ),

                const SizedBox(width: 40),

                // Espaçamento entre os ícones
                Container(
                  width: 70,
                  height: 70,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.grey,
                  ),
                  child: const Icon(
                    Icons.local_gas_station_outlined,
                    size: 50,
                    color: Colors.white,
                  ),
                ),

                const SizedBox(width: 40),

                Container(
                  width: 70,
                  height: 70,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.blue,
                  ),
                  child: const Icon(
                    Icons.local_gas_station_outlined,
                    size: 50,
                    color: Colors.white,
                  ),
                ),
              ],
            ),

            TextField(
              controller: _gasolinaController,
              decoration: const InputDecoration(
                labelText: 'Valor da gasolina',
                //border: OutlineInputBorder()
              ),
            ),

            TextField(
              controller: _alcoolController,
              decoration: const InputDecoration(
              labelText: 'Valor do alcool',
              //border: OutlineInputBorder()
              ),
            ),

            ElevatedButton(
              onPressed: calcularGasolina, 
              child: const Text('Calcular')
            ),

            // Resultado
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Resultado: $result',
                  style: TextStyle(fontSize: 24),
                )
              ],
            ),

          ],
        ),
      ),
    );
  }
}
