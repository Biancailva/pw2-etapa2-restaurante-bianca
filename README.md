# API REST - Restaurante

Trabalho da Etapa II de Programação Web II (IFMA Campus Coelho Neto).

API desenvolvida com **Node.js, Express 5, ES Modules e arrays em memória**, sem autenticação, sem front-end e sem banco de dados externo.

## Como executar

Instale o Node.js, abra o terminal nesta pasta e execute:

```bash
npm install
npm start
```

A API ficará disponível em `http://localhost:3000`. Os dados são temporários: **ao reiniciar o servidor, os arrays voltam a ficar vazios**.

## Rotas de categorias

| Método | Rota | Ação |
|---|---|---|
| GET | `/categorias` | Listar todas |
| GET | `/categorias/:id` | Buscar pelo ID |
| POST | `/categorias` | Cadastrar |
| PUT | `/categorias/:id` | Atualizar |
| DELETE | `/categorias/:id` | Excluir se não houver pratos vinculados |
| GET | `/categorias/:id/pratos` | Listar os pratos da categoria |

## Rotas de pratos

| Método | Rota | Ação |
|---|---|---|
| GET | `/pratos` | Listar e filtrar |
| GET | `/pratos/:id` | Buscar pelo ID |
| POST | `/pratos` | Cadastrar |
| PUT | `/pratos/:id` | Atualizar |
| DELETE | `/pratos/:id` | Excluir |

Filtros opcionais em `GET /pratos`: `categoria_id`, `nome` (busca parcial, sem diferenciar maiúsculas) e `precoMax`.

Exemplo: `GET /pratos?categoria_id=1&precoMax=50`.

## Exemplos de requisições JSON

Primeiro cadastre uma categoria:

**POST `/categorias`**
```json
{ "nome": "Bebidas", "descricao": "Sucos e refrigerantes" }
```

Depois cadastre um prato referenciando o ID retornado:

**POST `/pratos`**
```json
{ "nome": "Suco de laranja", "descricao": "Natural", "preco": 9.5, "categoria_id": 1 }
```

Para editar, envie todos os campos obrigatórios no PUT. Exemplo: `PUT /pratos/1` com o mesmo formato JSON do POST.

## Validações e códigos HTTP

- `200`: consulta, atualização ou exclusão bem-sucedida.
- `201`: recurso cadastrado.
- `400`: campos inválidos, ID inválido, categoria inexistente ou tentativa de excluir categoria com pratos.
- `404`: recurso ou rota inexistente.
- `500`: erro inesperado no servidor.

## Estrutura

- `index.js`: configuração do Express e registro das rotas.
- `routes/`: endpoints de categorias e pratos.
- `controllers/`: lógica das requisições e respostas.
- `models/`: arrays em memória e funções para consultar/alterar dados.
- `helpers/validacao.js`: validação de IDs e campos.

## Entrega

Publique no GitHub como `pw2-etapa2-restaurante-bianca`. Não envie a pasta `node_modules`. Confirme que `npm install` e `npm start` funcionam.
