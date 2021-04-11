# Atualizar Lugar

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **PUT** na rota **/api/places/:id**
2. [ ] Valida se a requisição foi feita por um **usuário**
3. [ ] Valida dados obrigatórios **name** e **id**
4. [ ] caso exista valida se **userId** é valido
5. [ ] Valida se o **id** é valido
6. [ ] Valida se o lugar já existe
7. [ ] **Atualiza** o lugar com os dados fornecidos
8. [ ] Retorna **204**, sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um usuário
3. [ ] Retorna erro **403** se a id do lugar não existir
4. [ ] Retorna erro **403** se o name já existir
5. [ ] Retorna erro **400** se name ou id não for fornecidos pelo client
6. [ ] Retorna erro **400** se o id ou userId não for um número
7. [ ] Retorna erro **500** se der erro ao tentar atualizar o setor