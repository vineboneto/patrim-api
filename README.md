# Patrim

Essa API está sendo desenvolvida como objeto de estudo e para utilização em uma aplicação de controle de patrimônio juntamente com [Ivo Melo](https://github.com/evil988)

> ### API construidas

  1. [Criar Setores (Em desenvolvimento)](./requirements/add-sector.md)

> ### Metodologia de Design

 - Clean Architecture
 - DDD
 - TDD
 - Conventional Commits
 - Continuous Integration

> ### Bibliotecas e ferramentas

 - yarn
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
 - Abra o arquivo na raíz em seu terminal. Execute
  ```shell
  # Instala as dependências
  $ yarn
  ```
**Husky**
 - Suporta para ``pre-commit``, ``pre-push`` e ``commit-msg``
 - Abra o arquivo na raíz em seu terminal. Execute:
  ```shell
  # Cria uma pasta .config com as configurações do husky
  $ yarn husky
  ```
 ***
 **Prisma-Postgres**

 - Crie o arquivo .env na raíz do projeto com sua variável ``DATABASE_URL``. Consulte [aqui](https://www.prisma.io/docs/getting-started/quickstart-typescript) para saber mais.
 - Execute no terminal na raiz do projeto
  ```shell
  # gerar o banco de dados
  $ yarn prisma:migrate
  ```
 ***
  **Tests**
  ```shell
  # Executa todos os tests
  $ yarn test

  # Executa todos os tests em modo observação
  $ yarn test:watch

  # Exibe o coverage do projeto
  $ yarn test:ci

  # Utilizado juntamente com o husky no pre-commit
  $ yarn test:staged

  # Utilizado para executar o coverage projeto
  $ yarn test:coveralls
  ```