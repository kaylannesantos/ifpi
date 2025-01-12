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

      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _name,
              decoration: const InputDecoration(
                labelText: 'Username...',
                border: OutlineInputBorder(),
              ),
            ),

            TextField(
              controller: _password,
              decoration: const InputDecoration(
                labelText: 'Password...',
                border: OutlineInputBorder(),
              ),
            ),

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