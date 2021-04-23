# Adicionar Patrimônio

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **POST** na rota **/api/patrimonies**
2. [x] Valida se a requisição foi feita por um **user**
3. [x] Valida dados obrigatórios **number**, **categoryId**, **ownerId**, **description**, **brand**
4. [x] **Cria** um patrimônio com os dados fornecidos
5. [x] Retorna **204**, sem dados

> ## Exceções

1. [x] Retorna erro **404** se a API não existir
2. [x] Retorna erro **403** se não for um user
3. [x] Retorna erro **403** se categoryId ou ownerId forem inválidos
4. [x] Retorna erro **400** se number, categoryId, ownerId ou brand não forem fornecidos pelo client
5. [x] Retorna erro **500** se der erro ao tentar criar o patrimônio