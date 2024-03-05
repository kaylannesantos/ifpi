/*Crie uma aplicação que receba uma URL de uma página WEB como entrada e
execute uma chamada usando o método GET para a URL e efetue um "parse"
na página obtida e exibindo todos os links presentes na página: atributos href
contidos dentro de tags <a></a>
Ex de link: <a href="http://www.google.com">Página do Google</a>
Dica: use expressões regulares ou o equivalente ao beautiful soap */

import axios from "axios";
import * as cheerio from 'cheerio';

async function obterLinks(url:string): Promise<void>{
    try {
        let resposta = await axios.get(url);
        let loadingHtml = cheerio.load(resposta.data); // carregando o HTMl
        
        loadingHtml('a').each((index, element) => { // extraindo os links da URl
            const href = loadingHtml(element).attr('href');
            if (href) {
                console.log(href);
            }

        });
    } catch (error) {
        console.error('Erro ao buscar links da página: ', error.message);
    }
}

const url = 'https://www.devmedia.com.br';
obterLinks(url);