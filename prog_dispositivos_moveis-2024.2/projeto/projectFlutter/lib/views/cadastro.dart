import 'package:flutter/material.dart';

class Cadastro extends StatefulWidget {
  @override
  State<Cadastro> createState() => _Cadastro();
}

class _Cadastro extends State<Cadastro>{
  final TextEditingController _name = TextEditingController();
  final TextEditingController _password = TextEditingController();
  final TextEditingController _email = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Cadastro'),
      ),

      body: Padding(
        padding: const EdgeInsets.all(16.0),

        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Cadastro',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 24),//espaçamento

            TextField(
              controller: _name,
              decoration: const InputDecoration(
                labelText: 'Username...',
                border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 5),//espaçamento

            TextField(
              controller: _password,
              decoration: const InputDecoration(
                labelText: 'Password...',
                border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 5),//espaçamento

            TextField(
              controller: _email,
              decoration: const InputDecoration(
                labelText: 'Email...',
                border: OutlineInputBorder(),
              ),
            )
          ],
        ),
      ),
    );
  }
}