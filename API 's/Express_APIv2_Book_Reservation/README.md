# API - Book Reservation

API responsável por realizar novas reservas de uso para livros virtuais.

### 📋 Pré-requisitos

```
typescript
tsx
zod
prisma 
@prisma/client
express
date-fns
vitest
axios
docker

```

### 🔧 Instalação

```
Inicie um novo projeto NodeJS executando o comando: "npm init -y"

Realize a instalação das dependencias utilizando: "npm ci"
```

Após isso:

```
Altere o objeto {datasource db} dentro do arquivo "schema.prisma" com os dados de conexão do seu banco de dados.
```

E então:

```
Crie as migrations do Prisma executando o comando "npx prisma migrate dev"
```


## ⚙️ Executando os testes

```
Adicione o seguinte script dentro de seu arquivo package.json: "test": "vitest"

execute o seguinte comando: "npm t" no terminal
```

### ⌨️ Testes E2E

```
tests > e2e > API.spec.ts

Altere a variável "e2e_disabled" para false, e habilitará os testes E2E.
```

## 🛠️ Construído com

* [NodeJS](https://nodejs.org/en)
* [TypeScript](https://www.typescriptlang.org/)
* [ExpressJS](https://expressjs.com/pt-br/)
* [PostgreSQL](https://www.postgresql.org/)
* [Prisma](https://www.prisma.io/)

## 📌 Versão

V1.0.0

## ✒️ Autores

* **Desenvolvedor** - *Trabalho & Documentação* - [Victor Nikolaus](https://github.com/vnikolaus)