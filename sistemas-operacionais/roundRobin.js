function roundRobin(matriz, trocaContexto, quantum) {
    // variaveis
    const numTarefas = matriz[0].length;
    const tarefas = ["t1", "t2", "t3", "t4"];
    const ingresso = matriz[0];
    const duracao = matriz[1];
    const tempoEspera = Array(numTarefas).fill(0);
    const tempoVida = Array(numTarefas).fill(0);
  
    let tempoAtual = Math.min(...ingresso);
    let tarefasRestantes = numTarefas;
    let indice = ingresso.indexOf(tempoAtual);
  
    while (tarefasRestantes > 0) {
      if (duracao[indice] > 0) {
        if (duracao[indice] <= quantum) {
          const tempoExecucao = duracao[indice];
          tempoAtual += tempoExecucao;
          duracao[indice] = 0;
          tarefasRestantes--;
  
          tempoVida[indice] = tempoAtual - ingresso[indice];
          tempoEspera[indice] = tempoVida[indice] - matriz[1][indice];
  
          console.log(`Executando a tarefa ${tarefas[indice]} por ${tempoExecucao} unidades de tempo.`);
        } else {
          tempoAtual += quantum;
          duracao[indice] -= quantum;
  
          console.log(`Executando a tarefa ${tarefas[indice]} por ${quantum} unidades de tempo.`);
        }
      }
  
      let proximoIndice = -1;
      for (let i = 0; i < numTarefas; i++) {
        const proximo = (indice + i + 1) % numTarefas;
        if (duracao[proximo] > 0) {
          proximoIndice = proximo; // se a tarefa não for totalemente executada
          break;
        }
      }
  
      if (proximoIndice === -1) {
        tempoAtual++;
      } else if (ingresso[proximoIndice] <= tempoAtual + trocaContexto) { // se o tempo de inggresso for menor ou igual ao tempo atual mais o tempo de troca
        tempoAtual += trocaContexto;
      } else {
        tempoAtual = ingresso[proximoIndice];
      }
  
      indice = proximoIndice;
    }
  
    const tempoTotalExecucao = tempoAtual - Math.min(...ingresso);
    const tempoMedioVida = tempoVida.reduce((acc, val) => acc + val, 0);
    const tempoMedioEspera = tempoEspera.reduce((acc, val) => acc + val, 0) / numTarefas;
    
    console.log(`Tempo total de execução: ${tempoTotalExecucao} unidades de tempo.`);
    console.log(`Tempo médio de vida de todas as tarefas: ${tempoMedioVida} unidades de tempo.`);
    console.log(`Tempo médio de espera de todas as tarefas: ${tempoMedioEspera} unidades de tempo.`);
  
    return {
      tempoVida,
      tempoEspera,
      tempoMedioVida,
      tempoMedioEspera,
      tempoTotalExecucao
    };
  }
  
  const matriz = [
    [5, 15, 10, 0], // Ingresso
    [30, 10, 40, 20] // Duração
  ];
  
  // tc = 4u.t, quantum = 15u.t
  const resultado = roundRobin(matriz, 4, 15);
  