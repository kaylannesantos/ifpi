/*Crie um programa em que permita baixar, via HTTP e usando o método GET,
um arquivo de imagem (escolha um tipo apenas - jpg ou gif...):
• Passe como parâmetro o "endereço WEB" completo até o arquivo;
• Receba o corpo a resposta em formato binário;
• Salve em disco a imagem. */

import axios, { AxiosResponse } from "axios";
import * as fs from 'fs';

async function downloadImagem(url:string, nomeArq: string) {
    try {
        let resposta: AxiosResponse = await axios.get(url, {responseType: 'arraybuffer'});

        if (resposta.data) { // verifica se a resposta contém dados
            fs.writeFileSync(nomeArq, resposta.data); //salva os dados
            console.log(`Imagem salva com sucesso como ${nomeArq}.`);
        } else {
            throw new Error('Resposta vazia recebida.');
        }
    } catch (error) {
        console.error('Error ao baixar a imagem: ', error.message);
    }   
}

//const url = 'https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg';
const url = 'https://www.sqlfromhell.com/wp-content/uploads/2018/06/except.png';
const nomeArq = 'img.png';
downloadImagem(url,nomeArq);



