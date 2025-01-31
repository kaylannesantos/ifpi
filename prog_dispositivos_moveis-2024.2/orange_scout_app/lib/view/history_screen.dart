import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:orange_scout_app/view/stats_screen.dart';

class HistoryScreen extends StatelessWidget {
  final String token; // Token de autenticação do usuário

  const HistoryScreen({super.key, required this.token});

  Future<List<dynamic>> fetchMatches() async {
    final response = await http.get(
      Uri.parse('https://sua-api.com/match/user'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erro ao carregar as partidas');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Histórico de Partidas')),
      body: FutureBuilder<List<dynamic>>(
        future: fetchMatches(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erro: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final matches = snapshot.data!;
            return ListView.builder(
              itemCount: matches.length,
              itemBuilder: (context, index) {
                final match = matches[index];
                return ListTile(
                  leading: Image.network(match['team_logo_path']),
                  title: Text(
                      '${match['abbr_team']} - ${match['teamOneScore']} x ${match['teamTwoScore']}'),
                  subtitle: Text(match['date']),
                  trailing: IconButton(
                    icon: const Icon(Icons.bar_chart),
                    onPressed: () {
                      // Navegar para a tela Stats
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => StatsScreen(
                            matchId: match['id'],
                            token: token,
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            );
          } else {
            return const Center(child: Text('Nenhuma partida encontrada.'));
          }
        },
      ),
    );
  }
}
