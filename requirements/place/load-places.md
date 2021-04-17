# Listar Localidade

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **GET** na rota **/api/places?take=#&skip=#**
2. [ ] Valida se a requisição foi feita por um **usuário**
3. [ ] Valida os parâmetros **page** e **limit**
4. [ ] Retorna **204** se não tiver nenhum localidades
5. [ ] Retorna **200** com os dados dos localidades

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um usuário
3. [ ] Retorna erro **500** se der erro ao tentar listar as categorias