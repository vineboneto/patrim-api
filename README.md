# Patrim

[![Coverage Status](https://coveralls.io/repos/github/vineboneto/patrim-api/badge.svg?branch=master)](https://coveralls.io/github/vineboneto/patrim-api?branch=master) [![Build Status](https://travis-ci.org/vineboneto/patrim-api.svg?branch=master)](https://travis-ci.com/vineboneto/patrim-api) [![Known Vulnerabilities](https://snyk.io/test/github/vineboneto/patrim-api/badge.svg)](https://snyk.io/test/github/vineboneto/patrim-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/8fe302817f3841dcf505/maintainability)](https://codeclimate.com/github/vineboneto/patrim-api/maintainability)


Acesse o projeto [aqui](https://drive.google.com/file/d/1fjLYJtOZnry36GtrmEzdqkgve9VvPRpA/view?usp=sharing)

> ### API construidas

  1. [Criar Conta](./requirements/account/signup.md)
  2. [Realizar Login](./requirements/account/login.md)
  3. [Autenticar Rotas](./requirements/account/auth-middleware.md)
  4. [Criar Setor](./requirements/sector/add-sector.md)
  5. [Remover Setor](./requirements/sector/delete-sector.md)
  6. [Atualizar Setor](./requirements/sector/update-sector.md)
  7. [Listar Setores](./requirements/sector/load-sectors.md)
  8. [Criar Categoria](./requirements/category/add-category.md)
  9. [Remover Categoria](./requirements/category/delete-category.md)
  10. [Atualizar Categoria](./requirements/category/update-category.md)
  11. [Listar Categorias](./requirements/category/load-categories.md)
  12. [Criar Proprietários](./requirements/owner/add-owner.md)
  13. [Remove Proprietário](./requirements/owner/delete-owner.md)
  14. [Atualizar Proprietário](./requirements/owner/update-owner.md.md)
  15. [Lista Proprietário](./requirements/owner/load-owners.md)
  16. [Criar Patrimônio](./requirements/patrimony/add-patrimonies.md)
  17. [Remover Patrimônio](./requirements/patrimony/delete-patrimony.md)
  18. [Atualizar Patrimônio](./requirements/patrimony/update-patrimonies.md)
  19. [Listar Patrimônio](./requirements/patrimony/load-patrimonies.md)
  20. [Listar pelo Id](./requirements/patrimony/load-patrimony-by-id.md)
  21. [Listar pelo categoria](./requirements/patrimony/load-patrimonies-by-categories.md)
  22. [Listar pelo proprietários](./requirements/patrimony/load-patrimonies-by-owners.md)
  23. [Listar pelo setor](./requirements/patrimony/load-patrimonies-by-sectors.md)

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