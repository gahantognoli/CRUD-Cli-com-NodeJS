const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  id: 1,
  nome: 'Flash',
  poder: 'Speed',
};

const DEFAULT_ITEM_ATUALIZAR = {
  id: 2,
  nome: 'Lanterna Verde',
  poder: 'Energia do Anel'
}

describe('Suite de manipulação de heróis', () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it('deve pesquisar heróis usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [result] = await database.listar(expected.id);
    deepEqual(result, expected);
  });

  it('deve cadastrar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(atual, expected);
  });

  it('devo remover um herói por id', async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(resultado, expected);
  });

  it('deve atualizar um herói por id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }

    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
    deepEqual(resultado, expected);
  });
});
