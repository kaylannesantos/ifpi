/* Crie um programa que receba uma URL e execute um método GET exibindo
como saída alguns elementos como: Status code, Encoding, O tamanho da
resposta, O corpo da resposta, dentre outros */

import axios, { AxiosResponse } from 'axios';

async function buscadorUrl(url: string): Promise<void>{
    try {
        let resposta: AxiosResponse = await axios.get(url, {responseType: 'arraybuffer'}); //solicitação get para a URL fornecida

        //logs de exibição sobre a URL fornecida
        console.log('Status code:', resposta.status);
        console.log('Encoding:', resposta.headers['Content-Length']);
        console.log('Tamanho da resposta:', resposta.headers['Content-Length']);
        console.log('Corpo da resposta:', resposta.data.toString('utf-8')); //convertendo para string

    } catch (error) {
        console.error('Erro ao buscar dados da URL: ', error.message);        
    }    
}

const url = 'https://www.w3schools.com';
buscadorUrl(url);