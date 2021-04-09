# Patrim

[![Coverage Status](https://coveralls.io/repos/github/vineboneto/patrim-api/badge.svg?branch=master)](https://coveralls.io/github/vineboneto/patrim-api?branch=master) [![Build Status](https://travis-ci.org/vineboneto/patrim-api.svg?branch=master)](https://travis-ci.org/vineboneto/patrim-api) [![Known Vulnerabilities](https://snyk.io/test/github/vineboneto/patrim-api/badge.svg)](https://snyk.io/test/github/vineboneto/patrim-api)



Essa API está sendo desenvolvida como objeto de estudo e para utilização em uma aplicação de controle de patrimônio juntamente com [Ivo Melo](https://github.com/evil988)

Acesse o projeto [aqui](https://drive.google.com/file/d/1fjLYJtOZnry36GtrmEzdqkgve9VvPRpA/view?usp=sharing)

> ### API construidas

  1. [Criar Conta](./requirements/account/signup.md)
  2. [Realizar Login](./requirements/account/login.md)
  3. [Autenticar Rotas](./requirements/account/auth-middleware.md)
  4. [Criar Setores](./requirements/sector/add-sector.md)
  5. [Listar Setores](./requirements/sector/load-sectors.md)
  6. [Remover Setores](./requirements/sector/delete-sector.md)
  7. [Criar Categoria](./requirements/category/add-category.md)
  8. [Listar Categorias](./requirements/category/load-categories.md)

> ### Metodologia de Design

 - Clean Architecture
 - DDD
 - TDD
 - Conventional Commits
 - Continuous Integration

> ### Bibliotecas e ferramentas

 - Yarn
 - Typescript
 - Git
 - Jest
 - Postgres
 - Prisma
 - Travis CI
 - Faker
 - Coveralls
 - Husky
 - Lint Staged
 - Eslint
 - Standard Javascript Style
 - Rimraf

> ### Configuração

***
**Dependências**
 - Abra o arquivo na raíz em seu terminal. Execute:
  ```shell
  # Instala as dependências
  $ yarn
  ```
***
**Husky**
 - Suporte para ``pre-commit``, ``pre-push`` e ``commit-msg``
 - Abra o arquivo na raíz em seu terminal. Execute:
  ```shell
  # Cria uma pasta .config com as configurações do husky
  $ yarn husky
  ```
 ***
 **Prisma-Postgres**

 - Crie o arquivo .env na raíz do projeto com sua variável ``DATABASE_URL``. Consulte [aqui](https://www.prisma.io/docs/getting-started/quickstart-typescript) para saber mais.
  
 ***
  **Tests**
  ```shell
  # Executa todos os testes
  $ yarn test

  # Executa todos os testes unitários em modo observação
  $ yarn test:unit

  # Executa todos os testes integração em modo observação
  $ yarn test:integration

  # Exibe o coverage do projeto
  $ yarn test:ci

  # Utilizado juntamente com o husky no pre-commit
  $ yarn test:staged

  # Utilizado para executar o coverage projeto
  $ yarn test:coveralls
  ```