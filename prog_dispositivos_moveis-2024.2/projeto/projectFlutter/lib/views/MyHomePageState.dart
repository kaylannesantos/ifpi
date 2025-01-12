import 'package:flutter/material.dart';
import './login.dart';
import './cadastro.dart';
import './list.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin{
  late TabController _tabController;

  @override
  void initState() {// para o uso do tabController
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        title: const Text('TabBar Widget'),
        bottom: TabBar(
          controller: _tabController,

          tabs: const <Widget>[
            Tab(
              icon: Icon(Icons.login),
              text: 'Login',
            ),
            Tab(
              icon: Icon(Icons.app_registration),
              text: 'Cadastro',
            ),
            Tab(
              icon: Icon(Icons.list),
              text: 'List',
            )
          ],

        ),
      ),

      body: TabBarView(
        controller: _tabController,
        children: <Widget>[
          Login(),
          Cadastro(),
          List()
        ],
      )
    );

  }
}
