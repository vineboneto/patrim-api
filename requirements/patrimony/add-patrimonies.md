# Adicionar Patrimônio

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **POST** na rota **/api/patrimonies**
2. [ ] Valida se a requisição foi feita por um **admin**
3. [ ] Valida dados obrigatórios **number**, **categoryId**, **ownerId**, **observation**, **ips**, **brand**
4. [ ] **Cria** um patrimônio com os dados fornecidos
5. [ ] Retorna **204**, sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um admin
4. [ ] Retorna erro **403** se o number ou ip já estiver em uso
5. [ ] Retorna erro **400** se number, categoryId, ownerId, observation, ips, brand não forem fornecidos pelo client
6. [ ] Retorna erro **500** se der erro ao tentar criar o patrimônio