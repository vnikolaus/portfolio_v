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

GET:
```
/book/:id

/reservations
```

POST:
```
/add/book

/add/reservation
```

DELETE:
```
/book/:id

/reservation/:id
```

Veja alguns exemplos dos endpoints aqui: [ENDPOINTS](./imgs/)


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


## 🛠️ Construído com

* [NodeJS](https://nodejs.org/en)
* [TypeScript](https://www.typescriptlang.org/)
* [ExpressJS](https://expressjs.com/pt-br/)
* [PostgreSQL](https://www.postgresql.org/)
* [Prisma](https://www.prisma.io/)
* [Vitest](https://vitest.dev/)

## 📌 Versão

V1.0.0

## ✒️ Autores

* **Desenvolvedor** - *Trabalho & Documentação* - [Victor Nikolaus](https://github.com/vnikolaus)