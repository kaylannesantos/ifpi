import * as fs from 'fs';

function getHtml(file: string): string{
    return fs.readFileSync(file, 'utf8');
}

//console.log(getHtml);
getHtml('blade_runner.html');
