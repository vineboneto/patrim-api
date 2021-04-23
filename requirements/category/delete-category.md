# Remover Categoria

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **DELETE** na rota **/api/categories/:id**
2. [x] Valida se a requisição foi feita por um **usuário**
3. [x] Valida dado parâmetro obrigatórios **id**
4. [x] Valida se o **id** é valido
5. [x] **REMOVE** um categoria
6. [x] Retorna **200**, com os dados removidos

> ## Exceções

1. [x] Retorna erro **404** se a API não existir
2. [x] Retorna erro **403** se não for um usuário
3. [x] Retorna erro **403** se o id não for valído
4. [x] Retorna erro **400** se id não for fornecidos pelo client
5. [x] Retorna erro **400** se o id não for um número
6. [x] Retorna erro **500** se der erro ao tentar remover o categoria