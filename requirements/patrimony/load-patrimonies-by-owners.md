# Listar Patrimônios pelos Proprietários

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **GET** na rota **/api/owners/:id/patrimonies?take=#&skip=#**
2. [x] Valida se a requisição foi feita por um **usuário**
3. [x] Valida se o id é valido
4. [x] Retorna **204** se não tiver nenhum patrimônio
5. [x] Retorna **200** com os dados dos patrimônios

> ## Exceções

1. [x] Retorna erro **404** se a API não existir
2. [x] Retorna erro **403** se o id não for válido
3. [x] Retorna erro **403** se não for um usuário
4. [x] Retorna erro **500** se der erro ao tentar listar os patrimônios