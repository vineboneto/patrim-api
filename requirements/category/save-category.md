# Atualizar Categoria

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **PUT** na rota **/api/categories/:id**
2. [x] Valida se a requisição foi feita por um **usuário**
3. [x] Valida dados obrigatórios **name** e **id**
4. [x] Valida se o **id** é valido
5. [x] Valida se a categoria existe
6. [x] **Atualiza** uma categoria com os dados fornecidos
7. [x] Retorna **204**, sem dados

> ## Exceções

1. [x] Retorna erro **404** se a API não existir
2. [x] Retorna erro **403** se não for um usuário
3. [x] Retorna erro **403** se o name já existir
4. [x] Retorna erro **403** se a categoria não existir
5. [x] Retorna erro **400** se name ou id não for fornecidos pelo client
6. [x] Retorna erro **400** se o id não for valído
7. [x] Retorna erro **500** se der erro ao tentar criar a categoria