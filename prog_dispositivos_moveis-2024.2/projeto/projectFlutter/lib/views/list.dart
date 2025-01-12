import 'package:flutter/material.dart';

class List extends StatefulWidget {
  @override
  State<List> createState() => _List();
}

class _List extends State<List>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('List'),
      ),

      body: const Center(
        child: Text('Listagem')
      )
    );
  }
}