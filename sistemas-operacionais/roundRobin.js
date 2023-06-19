class Tarefa {
    constructor(nome, ingresso, duracao) {
      this.nome = nome;
      this.ingresso = ingresso;
      this.duracao = duracao;
      this.tempoRestante = duracao;
      this.tempoVida = 0;
      this.tempoEspera = 0;
      this.tempoExecucao = 0;
    }
}


  
function roundRobin(tarefas, quantum, trocaContexto) {
    let tempoTotal = 0;
    let fila = [...tarefas];

    //* Ordena as tarefas pelo tempo de ingresso
    fila.sort((tarefaA, tarefaB) => {
        if (tarefaA.ingresso < tarefaB.ingresso) {
            return -1;
        } else if (tarefaA.ingresso > tarefaB.ingresso) {
            return 1;
        }
        return 0;
    });
  
    while (fila.length > 0) {
        const tarefaAtual = fila[0];

        if (tarefaAtual.tempoRestante > 0) {
            console.log(`******** TAREFA ${tarefaAtual.nome} - Duração: ${tarefaAtual.tempoRestante}u.t ********`);
            console.log(`Começa a executar em: ${tempoTotal}ut\n`);
            //console.log(`Executando a tarefa ${tarefas[indice]} por ${tempoExecucao} unidades de tempo.`);

            //* QUANTUM 
            for (let count = 0; count < quantum; count++) {
                tarefaAtual.tempoExecucao++;
                tarefaAtual.tempoRestante--;
                tempoTotal++;
                if (tarefaAtual.tempoRestante === 0) {
                    break;
                }
            }
            
            //* verifica se a tarefa ainda tem algo a executar
            if (tarefaAtual.tempoRestante === 0) {
                
                tarefaAtual.tempoVida = tempoTotal - tarefaAtual.ingresso; //*
                tarefaAtual.tempoEspera = tarefaAtual.tempoVida - tarefaAtual.tempoExecucao; //* 

                if (fila.length > 1) {
                    tempoTotal += trocaContexto;
                    console.log('Troca de Contexto!\n');
                }
                fila.shift();
            } else {
                if (fila.length > 1) {
                    tempoTotal += trocaContexto;
                    console.log('Troca de Contexto!\n');
                }
                fila.push(fila.shift());
                }
        } else {
            tempoTotal++;
        }
    }

    //? variaveis de tempo total
    let vidaTotal = 0;
    let esperaTotal = 0;
    let vidaMedia = 0;
    let esperaMedia = 0;


    //* CALCULO TEMPO VIDA - TEMPO ESPERA
    for (let i = 0; i < [...tarefas].length; i++) {
        esperaTotal += [...tarefas][i].tempoEspera ;
        vidaTotal += [...tarefas][i].tempoVida;
    }

    vidaMedia = vidaTotal / [...tarefas].length;
    esperaMedia = esperaTotal / [...tarefas].length;

    // LOG TEMPOS
    console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n');
    console.log(`Tempo Médio de Vida = ${vidaMedia}`);
    console.log(`Tempo Médio de Espera = ${esperaMedia}`);

    //console.log([...tarefas][3].nome, [...tarefas][3].tempoVida);
    //console.log([...tarefas].length);
}
  

//? TAREFAS
const t1 = new Tarefa('t1', 5, 30);
const t2 = new Tarefa('t2', 15, 10);
const t3 = new Tarefa('t3', 10, 40);
const t4 = new Tarefa('t4', 0, 20);
const t5 = new Tarefa('t5', 0, 10);


//? TC E QUANTUM
const quantum = 15;
const trocaContexto = 4;

//? EXECUTADOR
roundRobin([t1, t2, t3, t4, t5], quantum, trocaContexto);
