import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class StatsScreen extends StatelessWidget {
  final int matchId;
  final String token;

  const StatsScreen({super.key, required this.matchId, required this.token});

  Future<List<dynamic>> fetchStats() async {
    final response = await http.get(
      Uri.parse('https://sua-api.com/stats/$matchId'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erro ao carregar as estatísticas');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Estatísticas da Partida')),
      body: FutureBuilder<List<dynamic>>(
        future: fetchStats(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erro: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final stats = snapshot.data!;
            return ListView(
              children: stats.map((playerStat) {
                return ListTile(
                  title: Text(playerStat['name']),
                  subtitle: Text(
                      'Pontos: ${playerStat['points']}, Assistências: ${playerStat['assists']}'),
                );
              }).toList(),
            );
          } else {
            return const Center(child: Text('Sem estatísticas disponíveis.'));
          }
        },
      ),
    );
  }
}
