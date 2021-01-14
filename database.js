const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor(){
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    async escreverDadosArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    }

    async cadastrar(heroi){
        const dados = await this.obterDadosArquivo();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const novoHeroi = {id, ...heroi};
        const dadosFinal = [...dados, novoHeroi];
        const resultado = this.escreverDadosArquivo(dadosFinal);
        return resultado;
    }

    async atualizar(id, modificacoes){
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === id);

        if(indice === -1) throw new Error("O herói informado não existe");

        const atual = dados[indice];
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        dados.splice(indice, 1);

        return await this.escreverDadosArquivo([...dados, objetoAtualizar])
    }

    async listar(id){
        const dados = (await this.obterDadosArquivo())
            .filter(item => (id ? item.id === id : true));
        return dados;
    }

    async remover(id){
        if(!id) return await this.escreverDadosArquivo([]);
        
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if(indice === -1) throw new Error("O usuário informado não existe");
        dados.splice(indice, 1);
        return await this.escreverDadosArquivo(dados);
    }
}

module.exports = new Database();