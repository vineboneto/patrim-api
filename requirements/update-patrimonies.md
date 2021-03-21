# Atualizar Patrimônio

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **PUT** na rota **/api/patrimonies/:patrimonyId**
2. [ ] Valida se a requisição foi feita por um **admin**
3. [ ] Valida o parâmetro **patrimonyId** 
4. [ ] Valida dados obrigatórios **number**, **categoryId**, **ownerId**, **observation**, **ips**, **brand**
5. [ ] **Atualiza** um patrimônio com os dados fornecidos
6. [ ] Retorna **204** sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um admin
3. [ ] Retorna erro **403** se o patrimonyId passado na URL for inválido
4. [ ] Retorna erro **403** se o number ou ip já estiver em uso
5. [ ] Retorna erro **400** se o number, categoryId, ownerId, observation, brand ou ips não forem fornecidos pelo client
6. [ ] Retorna erro **500** se der erro ao tentar atualizar o patrimônio