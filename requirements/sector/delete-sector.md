# Remover Setor

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **DELETE** na rota **/api/sectors/:id**
2. [ ] Valida se a requisição foi feita por um **usuário**
3. [ ] Valida dado parâmetro obrigatórios **id**
4. [ ] **REMOVE** um setor
5. [ ] Retorna **200**, sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um usuário
3. [ ] Retorna erro **400** se id não for fornecidos pelo client
4. [ ] Retorna erro **500** se der erro ao tentar remover o setor