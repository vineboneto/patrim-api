# Troca de Proprietários

> ## Caso de sucesso

1. [ ] Recebe uma requisição do tipo **PUT** na rota **/api/patrimonies/:patrimonyId/swap**
2. [ ] Valida se a requisição foi feita por um **usuário**
3. [ ] Valida o parâmetro **patrimonyId** 
4. [ ] Valida dados obrigatórios **newOwner**, **oldOwner**
5. [ ] **Atualiza** o proprietário do patrimônio com os dados fornecidos
6. [ ] Retorna **204** sem dados

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um usuário
3. [ ] Retorna erro **403** se o patrimonyId passado na URL for inválido
4. [ ] Retorna erro **400** se o newOwner ou oldOwner não forem fornecidos pelo client
5. [ ] Retorna erro **403** se o newOwner ou oldOwner forem inválidos
6. [ ] Retorna erro **500** se der erro ao tentar atualizar o proprietário do patrimônio