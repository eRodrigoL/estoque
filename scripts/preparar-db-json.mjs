//            ┌── copyFileSync ➡️ função do Node usada para copiar arquivos de forma síncrona
//            │            ┌── existsSync ➡️ função do Node usada para verificar se um arquivo existe
import { copyFileSync, existsSync } from 'node:fs';

//      ┌── source ➡️ caminho do arquivo matriz/base
const source = 'mock/db.base.json';

//      ┌── target ➡️ caminho do arquivo que será criado ou sobrescrito
const target = 'mock/db.json';

/*
┌── if (...) ➡️ estrutura condicional
│  ┌── ! ➡️ negação lógica
│  │    ┌── existsSync(source) ➡️ verifica se o arquivo base existe */
if (!existsSync(source)) {
  //    ┌── console.error() ➡️ escreve mensagem de erro no terminal
  console.error(`Arquivo base não encontrado: ${source}`);

  // ┌── process.exit(1) ➡️ encerra o script com código de erro
  process.exit(1);
}

//    ┌── copyFileSync() ➡️ copia o conteúdo do arquivo base para o arquivo de destino
//    │        ┌── source ➡️ arquivo de origem
//    │        |       ┌── target ➡️ arquivo de destino
copyFileSync(source, target);

//    ┌── console.log() ➡️ escreve mensagem de sucesso no terminal
console.log(`Banco local recriado com sucesso: ${source} -> ${target}`);
