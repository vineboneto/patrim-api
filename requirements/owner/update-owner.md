# Adicionar Proprietário

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **POST** na rota **/api/owners**
2. [x] Valida se a requisição foi feita por um **usuário**
3. [x] Valida dados obrigatórios **name**, **sectorId**
4. [x] **Cria** um proprietário com os dados fornecidos
5. [x] Retorna **200**, com o proprietário

> ## Exceções

1. [x] Retorna erro **404** se API não existir
2. [x] Retorna erro **403** se não for um usuário
3. [x] Retorna error **403** se o sectorId ou id não for válido
4. [x] retorna error **400** se o id na rota não for um número
5. [x] Retorna erro **400** se name ou sectorId não forem fornecidos pelo client
6. [x] Retorna erro **500** se der erro ao tentar criar o proprietário