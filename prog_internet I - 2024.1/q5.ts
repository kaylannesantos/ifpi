/*Crie uma aplicação que receba uma URL de uma página WEB como entrada e
uma palavra ou termo de pesquisa. Execute uma chamada usando o método
GET para a URL e efetue um "parse" na página obtida listando todas as
ocorrências da palavra na página. Para cada ocorrência, liste as 10 palavras
anteriores e as 10 posteriores, caso existam. */

import axios from "axios";
import * as cheerio from 'cheerio';

async function pesqPalavra(url:string, searchTerm:string): Promise<void> {
    try {
        let resposta = await axios.get(url);
        let loading = cheerio.load(resposta.data);

        let bodyText  = loading('body').text();
        let palavras = bodyText.split(/\s+/);

        let ocorrencias: string[] = [];
        for (let i = 0; i < palavras.length; i++) {
            if (palavras[i].toLowerCase() == searchTerm.toLowerCase()) {
                let iniciarIndex = Math.max(0, i - 10);
                let fimIndex = Math.min(palavras.length, i + 11);
                ocorrencias.push(palavras.slice(iniciarIndex, fimIndex).join(' '));
            }
        }

        if (ocorrencias.length > 0) {
            console.log(`Ocorrências da palavra: ${searchTerm}`);
            ocorrencias.forEach((ocorrencias, index) => {
                console.log(`${index + 1}.${ocorrencias}`);
            });
        } else {
            console.log(`A palavra "${searchTerm}" não foi encontrada na página.`);
        }
    } catch (error) {
        console.error('Erro ao buscar a página:',error.message);
    }
}

const url = 'https://www.w3schools.com/html/html_exercises.asp';
const searchTerm = 'html';
pesqPalavra(url,searchTerm);