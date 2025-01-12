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
            )
          ],
        ),
      ),
    );
  }
}