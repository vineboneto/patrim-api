# Adicionar Setor

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **POST** na rota **/api/sectors**
2. [ ] Valida se a requisição foi feita por um **admin**
3. [ ] Valida dados obrigatórios **name**
4. [ ] **Cria** um setor com os dados fornecidos
5. [ ] Retorna **204**, sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um admin
3. [ ] Retorna erro **400** se name não for fornecidos pelo client
4. [ ] Retorna erro **500** se der erro ao tentar criar o setor