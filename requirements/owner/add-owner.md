# Adicionar Proprietário

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **POST** na rota **/api/owners**
2. [ ] Valida se a requisição foi feita por um **admin**
3. [ ] Valida dados obrigatórios **name**, **sectorId**
4. [ ] **Cria** um proprietário com os dados fornecidos
5. [ ] Retorna **204**, sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um admin
3. [ ] Retorna error **400** se o sectorId não for válido
4. [ ] Retorna erro **400** se name ou sectorId não forem fornecidos pelo client
5. [ ] Retorna erro **500** se der erro ao tentar criar o proprietário