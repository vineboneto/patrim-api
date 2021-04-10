# Atualizar Categoria

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **PUT** na rota **/api/categories/:id**
2. [ ] Valida se a requisição foi feita por um **usuário**
3. [ ] Valida dados obrigatórios **name** e **id**
4. [ ] Valida se o **id** é valido
5. [ ] Valida se a categoria existe
6. [ ] **Atualiza** uma categoria com os dados fornecidos
7. [ ] Retorna **204**, sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um usuário
3. [ ] Retorna erro **403** se o name já existir
4. [ ] Retorna erro **400** se name ou id não for fornecidos pelo client
5. [ ] Retorna erro **400** se o id não for valído
6. [ ] Retorna erro **500** se der erro ao tentar criar a categoria