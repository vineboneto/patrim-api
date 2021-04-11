# Adicionar Lugar

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **POST** na rota **/api/places**
2. [ ] Valida se a requisição foi feita por um **usuário**
3. [ ] Valida dados obrigatórios **name**
4. [ ] caso exista valida se **userId** é valido
5. [ ] **Cria** um lugar com os dados fornecidos
6. [ ] Retorna **204**, sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se o name já existir
3. [ ] Retorna erro **403** se o userId não existir
4. [ ] Retorna erro **403** se não for um usuário
5. [ ] Retorna erro **400** se name não for fornecidos pelo client
6. [ ] Retorna erro **400** se o userId ou id não for um número
7. [ ] Retorna erro **500** se der erro ao tentar criar o lugar