# Patrimônio pelo Id

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **GET** na rota **/api/patrimonies/:patrimonyId**
2. [ ] Valida se a requisição foi feita por um **usuário**
3. [ ] Valida os parâmetros patrimonyId é valido
4. [ ] Retorna **204** se não tiver nenhum patrimônio
5. [ ] Retorna **200** com os dados dos patrimônio

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um usuário
3. [ ] Retorna erro **403** se parâmetro patrimonyId for inválido
4. [ ] Retorna erro **500** se der erro ao tentar listar o patrimônio