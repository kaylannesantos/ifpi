import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  @override
  State<Login> createState() => _Login();
}

class _Login extends State<Login>{
  final TextEditingController _name = TextEditingController();
  final TextEditingController _password = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Login'),
      ),

      body: Padding(
        padding: const EdgeInsets.all(16.0),//
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Login',
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
            )
          ],
        ),
      ),
    );
  }
}