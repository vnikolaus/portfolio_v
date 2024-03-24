# API - Book Reservation

API responsável por realizar novas adições de livros em uma determinada biblioteca virtual, e também gerenciar suas reservas de uso.

### 📋 Dependências

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

## 💻 Endpoints

```
/add/book

/add/reservation

/reservations
```

Veja exemplos dos endpoints aqui: [ENDPOINTS](./imgs/)


## ⚙️ Testes Automatizados

```
✅ Adicionar livro
✅ Buscar livro
✅ Excluir livro
✅ Criar nova reserva
✅ Excluir reserva existente
✅ Buscar todas as reservas
✅ Gerar datas baseado na duração da reserva
```

### ⌨️ Testes E2E

```
Path: tests > e2e > API.spec.ts

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