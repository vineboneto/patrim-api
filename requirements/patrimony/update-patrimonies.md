# Atualizar Patrimônio

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **PUT** na rota **/api/patrimonies/:id**
2. [ ] Valida se a requisição foi feita por um **user**
3. [ ] Valida o parâmetro **id** 
4. [ ] Valida dados obrigatórios **number**, **categoryId**, **ownerId**, **brand**
5. [ ] **Atualiza** um patrimônio com os dados fornecidos
6. [ ] Retorna **200** com os dados atualizados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um user
3. [ ] Retorna erro **403** se o id passado na URL for inválido
4. [ ] Retorna erro **403** se o number ou ip já estiver em uso
5. [ ] Retorna erro **400** se o number, categoryId, ownerId ou brand  não forem fornecidos pelo client
6. [ ] Retorna erro **500** se der erro ao tentar atualizar o patrimônio