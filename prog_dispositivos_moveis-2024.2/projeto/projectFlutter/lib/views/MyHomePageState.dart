import 'package:flutter/material.dart';
import '../model/models/ItemModel.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> {
  // Lista de itens
  List<ItemModel> items = [
    ItemModel(nome: "Item I", check: true),
    ItemModel(nome: "Item II", check: false),
    ItemModel(nome: "Item III", check: true),
  ];

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
              'Lista de Itens:',
              style: TextStyle(fontSize: 20),
            ),

            // Testando o uso ListView para exibir os itens
            Expanded(
              child: ListView.builder(
                itemCount: items.length,
                itemBuilder: (context, index) {
                  ItemModel item = items[index];
                  return ListTile(
                    title: Text(item.nome ?? "No Name"),
                    trailing: Icon(
                      item.check == true ? Icons.check_circle : Icons.cancel,
                      color: item.check == true ? Colors.green : Colors.red,
                    ),
                  );
                },
              ),
            ),

          ],
        ),
      ),
    );
  }
}
